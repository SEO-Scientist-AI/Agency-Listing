import { NextResponse } from "next/server";
import config from "./config";
import { createClient } from "@supabase/supabase-js";

let clerkMiddleware: (arg0: (auth: any, req: any) => any) => { (arg0: any): any; new(): any; }, createRouteMatcher;

if (config.auth.enabled) {
  try {
    ({ clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server"));
  } catch (error) {
    console.warn("Clerk modules not available. Auth will be disabled.");
    config.auth.enabled = false;
  }
}

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Check if user is super admin
async function isSuperAdmin(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data?.role === 'super_admin';
  } catch (error) {
    console.error('Error checking super admin status:', error);
    return false;
  }
}

const isProtectedRoute = config.auth.enabled
  ? createRouteMatcher(["/dashboard(.*)"])
  : () => false;

const isAdminOnlyRoute = (req: Request) => {
  return req.url.includes('/dashboard/get-listed');
};

// Updated search bot detection function with more comprehensive list
function isSearchBot(userAgent: string) {
  const searchBots = [
    'Googlebot',
    'Bingbot',
    'Slurp',           // Yahoo
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'facebookexternalhit',
    'Applebot',
    'Twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'Discordbot',
    'Pinterestbot'
  ];
  
  // Case-insensitive check for any of the bot names
  return searchBots.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
}

export default function middleware(req: any) {
  const userAgent = req.headers.get('user-agent') || '';
  const url = new URL(req.url);
  const path = url.pathname;

  // Allow search engine bots to access public routes only
  if (isSearchBot(userAgent)) {
    // List of public paths that bots can access
    const publicPaths = [
      '/',
      '/agency',
      '/agency/list',
      '/sitemap.xml',
      '/robots.txt',
      '/static'
    ];

    // Check if the current path starts with any of the public paths
    const isPublicPath = publicPaths.some(publicPath => 
      path === publicPath || path.startsWith(`${publicPath}/`)
    );

    if (isPublicPath) {
      return NextResponse.next();
    }

    // Block bots from accessing non-public routes
    return NextResponse.next({
      headers: {
        'X-Robots-Tag': 'noindex, nofollow'
      }
    });
  }

  if (config.auth.enabled) {
    return clerkMiddleware(async (auth, req) => {
      const resolvedAuth = await auth();

      if (!resolvedAuth.userId && isProtectedRoute(req)) {
        return resolvedAuth.redirectToSignIn();
      }

      // Check for admin-only routes
      if (isAdminOnlyRoute(req)) {
        const isAdmin = await isSuperAdmin(resolvedAuth.userId!);
        if (!isAdmin) {
          // Redirect non-admin users to dashboard
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      }

      return NextResponse.next();
    })(req);
  } else {
    return NextResponse.next();
  }
}

export const middlewareConfig = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
import { NextResponse } from "next/server";
import config from "./config";
import type { NextRequest } from 'next/server'

let clerkMiddleware: (arg0: (auth: any, req: any) => any) => { (arg0: any): any; new(): any; }, createRouteMatcher;

if (config.auth.enabled) {
  try {
    ({ clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server"));
  } catch (error) {
    console.warn("Clerk modules not available. Auth will be disabled.");
    config.auth.enabled = false;
  }
}

const isProtectedRoute = config.auth.enabled
  ? createRouteMatcher(["/dashboard(.*)"])
  : () => false;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  
  // Handle /agency route
  if (pathname === '/agency') {
    const location = searchParams.get('location');
    
    // Only redirect to city-specific route if it's a single location AND no other params
    if (location && !location.includes(' ') && searchParams.size === 1) {
      const newUrl = new URL(`/agency/list/${location}`, request.url);
      return NextResponse.redirect(newUrl);
    }
  }
  
  // Handle /agency/list/[city] routes
  if (pathname.startsWith('/agency/list/')) {
    const city = pathname.split('/').pop()!;
    
    // If there are any query parameters, redirect to main agency page
    if (searchParams.size > 0) {
      const newUrl = new URL('/agency', request.url);
      
      // Add the city as a location parameter
      newUrl.searchParams.set('location', city);
      
      // Copy all existing query parameters
      searchParams.forEach((value, key) => {
        if (key !== 'location') {
          newUrl.searchParams.set(key, value);
        }
      });
      
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
}

export const middlewareConfig = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
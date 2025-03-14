import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import FloatingButtons from "@/components/floating-buttons";

export const metadata: Metadata = {
    metadataBase: new URL("https://agencyspot.seoscientist.ai/"),
    title: {
        default: "The #1 Platform to Find & Review SEO & Marketing Agencies - AgencySpot",
        template: `%s `,
    },
    description:
        "Find and compare top-rated SEO and marketing agencies on AgencySpot. Read reviews, check ratings, and hire the best agency for your business needs today!",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        description:
            "Find a perfect digital marketing partner for your next project: agencies, freelancers, and many more. Get several proposals right in your inbox in 2 days.",
        images: ["/opengraph.png"],
        url: "https://agencyspot.seoscientist.ai/",
    },
    twitter: {
        card: "summary_large_image",
        title: "SEO Scientist Agency Spot",
        description:
            "Find a perfect digital marketing partner for your next project: agencies, freelancers, and many more. Get several proposals right in your inbox in 2 days.",
        siteId: "",
        creator: "@udaydev",
        creatorId: "",
        images: ["/opengraph.png"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthWrapper>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <link
                        rel="icon"
                        type="image/svg+xml"
                        href="favicon.ico"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="favicon.ico"
                    />
                    <link
                        rel="apple-touch-icon"
                        href="favicon.ico"
                    />
                    <link 
                        rel="manifest" 
                        href="/site.webmanifest" 
                    />
                    <link
                        rel="preload"
                        href="/images/dashboard.png"
                        as="image"
                    />
                    <link
                        rel="preload"
                        href="/images/dashboard.png"
                        as="image"
                    />
                </head>
                <body className={GeistSans.className}>
                    <Provider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}

                            <Toaster />
                            <FloatingButtons />
                        </ThemeProvider>
                    </Provider>
                    <Analytics />
                </body>
            </html>
        </AuthWrapper>
    );
}

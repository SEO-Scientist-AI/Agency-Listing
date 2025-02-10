import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://agencyspot.seoscientist.ai/"),
    title: {
        default: "SEO Scientist Agency Spot",
        template: `%s | Connecting You Effortlessly`,
    },
    description:
        "Find a perfect digital marketing partner for your next project: agencies, freelancers, and many more. Get several proposals right in your inbox in 2 days.",
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
                    <link rel="preload" href="/images/dashbor.png" as="image" />
                    <link rel="preload" href="/images/dashbor.png" as="image" />
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
                        </ThemeProvider>
                    </Provider>
                    <Analytics />
                </body>
            </html>
        </AuthWrapper>
    );
}

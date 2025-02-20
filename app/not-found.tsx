import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full dark:opacity-20 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-3xl" />
      </div>

      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 relative">
        {/* Main content */}
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-8xl font-bold tracking-tighter text-primary animate-pulse">
              404
            </h1>
            <h2 className="text-4xl font-bold tracking-tight mt-4">
              Page Not Found
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-md">
            Oops! It seems you've ventured into uncharted territory. The page you're looking for has gone on vacation.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/">
              <Button size="lg" className="gap-2 group min-w-[200px]">
                <Home className="w-4 h-4" />
                Back to Home
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Social links */}
          <div className="mt-12 space-y-4">
            <h3 className="text-lg font-medium text-muted-foreground">
              Connect With Us
            </h3>
            <div className="flex gap-6">
              <Link
                href="https://www.facebook.com/seoscientistagency/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg text-[#1877F2] hover:text-[#1877F2]/80 transition-all hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com/iamseoscientist"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg text-[#1DA1F2] hover:text-[#1DA1F2]/80 transition-all hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.instagram.com/seoscientistuae/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg text-[#E4405F] hover:text-[#E4405F]/80 transition-all hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/seoscientistusa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg text-[#0A66C2] hover:text-[#0A66C2]/80 transition-all hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
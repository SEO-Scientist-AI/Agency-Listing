"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScheduleDemo() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/seo-scientist/30min";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to scheduling page...</h1>
        <p className="text-muted-foreground">Please wait while we redirect you to our scheduling system.</p>
      </div>
    </div>
  );
} 
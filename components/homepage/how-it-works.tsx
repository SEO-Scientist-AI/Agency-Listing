"use client";

import { GridPatternCard, GridPatternCardBody } from "@/components/ui/card-with-grid-ellipsis-pattern";
import { cn } from "@/lib/utils";
import { ClipboardList, MessageSquare, UserCheck } from "lucide-react";

const steps = [
  {
    title: "Define Your Needs",
    description:
      "Tell us about your needs, so we can find the right partner for the job. The most suitable agencies will get your brief.",
    icon: ClipboardList,
  },
  {
    title: "Receive Agency Proposals",
    description:
      "The most suitable agencies will get your brief. The agencies will message you on the Agency Partners platform within 2 days and suggest how they can help.",
    icon: MessageSquare,
  },
  {
    title: "Find the Right Partners",
    description:
      "Importantly, you are under no obligation to hire any of the agencies presented to you. You have the freedom to explore your options and choose the best fit.",
    icon: UserCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:w-[75%] px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our simple process helps you find the perfect agency partner for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full">
          {steps.map((step, index) => (
            <GridPatternCard 
              key={index}
              className="h-full"
              gradientClassName="from-background/95 via-background/70 to-background/30"
            >
              <GridPatternCardBody>
                <div className="mb-4">
                  <step.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-wrap text-xs text-foreground/60">{step.description}</p>
              </GridPatternCardBody>
            </GridPatternCard>
          ))}
        </div>
      </div>
    </section>
  );
}

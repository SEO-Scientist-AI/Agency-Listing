import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface AgencySidebarProps {
  companies: Array<{ id: number; name: string; logo: string }>;
  testimonials: Array<{ quote: string; author: string; company: string }>;
  stats: Array<{ value: string; label: string }>;
}

export function AgencySidebar({ companies, testimonials, stats }: AgencySidebarProps) {
  return (
    <Card className="lg:sticky lg:top-4">
      <CardHeader>
        <CardTitle className="text-xl">
          Trusted by Industry Leaders
        </CardTitle>
        <CardDescription>
          Join thousands of agencies growing their business
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Logos */}
        <div className="grid grid-cols-3 gap-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group relative flex items-center justify-center p-2 rounded-lg border hover:border-primary transition-all"
            >
              <Image
                src={company.logo}
                alt={company.name}
                height={80}
                width={80}
                className="opacity-75 group-hover:opacity-100 transition-opacity rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-medium text-center px-2">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="relative bg-muted p-4 rounded-lg border-l-4 border-primary"
            >
              <p className="text-sm italic text-muted-foreground">
                "{testimonial.quote}"
              </p>
              <footer className="mt-2 text-sm font-medium">
                - {testimonial.author}, <span className="text-primary">{testimonial.company}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-lg bg-primary/5 p-4 text-center hover:bg-primary/10 transition-colors">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 
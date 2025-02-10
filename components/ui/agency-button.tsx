import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AgencyButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group cursor-pointer rounded-xl bg-transparent p-1 transition-all duration-500">
      <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#ff642d] px-4 py-2 text-sm font-medium text-white">
        {children}
        <ArrowRight className="transition-all group-hover:translate-x-2" strokeWidth={1.5} size={21} />
        <div
          className={cn(
            "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]",
          )}
        />
      </div>
    </button>
  );
}
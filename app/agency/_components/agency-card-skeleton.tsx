import { Skeleton } from "@/components/ui/skeleton";

export function AgencyCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 animate-in fade-in-50 duration-500">
      <div className="flex gap-6">
        <Skeleton className="h-[120px] w-[120px] rounded-lg" />
        <div className="flex-1 space-y-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          <Skeleton className="h-16 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              {[1, 2, 3].map((bubble) => (
                <Skeleton key={bubble} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client"

export function AgencyCardSkeleton() {
    return (
        <div className="rounded-lg border p-4 space-y-4 animate-pulse">
            <div className="flex items-center space-x-4">
                {/* Logo placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                <div className="space-y-2 flex-1">
                    {/* Name placeholder */}
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    {/* Location placeholder */}
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
            </div>
            {/* Tagline placeholder */}
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            {/* Description placeholder */}
            <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-11/12" />
                <div className="h-3 bg-gray-200 rounded w-4/5" />
            </div>
            {/* Services placeholder */}
            <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-20 bg-gray-200 rounded-full" />
                ))}
            </div>
            {/* Footer placeholder */}
            <div className="flex justify-between items-center pt-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-8 w-24 bg-gray-200 rounded" />
            </div>
        </div>
    )
}

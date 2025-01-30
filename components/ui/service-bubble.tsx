'use client'

import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from 'next/navigation'

const colorClasses = [
    "border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300",
    "border-green-300 dark:border-green-700 text-green-700 dark:text-green-300",
    "border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300",
    "border-red-300 dark:border-red-700 text-red-700 dark:text-red-300",
    "border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300",
]

const hoverClasses = [
    "hover:bg-blue-50/50 dark:hover:bg-blue-900/10",
    "hover:bg-green-50/50 dark:hover:bg-green-900/10",
    "hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10",
    "hover:bg-red-50/50 dark:hover:bg-red-900/10",
    "hover:bg-purple-50/50 dark:hover:bg-purple-900/10",
]

interface ServiceBubbleProps {
    service: string
    className?: string
    onServiceClick?: (service: string) => void
}

export function ServiceBubble({ service, className, onServiceClick }: ServiceBubbleProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const colorIndex = Math.abs(service.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colorClasses.length
    
    const handleClick = () => {
        if (onServiceClick) {
            onServiceClick(service)
        } else {
            // Create a new URLSearchParams object from the current search params
            const params = new URLSearchParams(searchParams.toString())
            
            // Check if this service is already in the filters
            const services = params.getAll('service')
            if (!services.includes(service)) {
                // Add the new service to existing services
                params.append('service', service)
            }
            
            // Construct the new URL with all parameters
            const queryString = params.toString()
            const currentPath = window.location.pathname
            const newPath = currentPath.startsWith('/find-agencies') ? currentPath : '/find-agencies'
            router.push(`${newPath}${queryString ? `?${queryString}` : ''}`)
        }
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                "px-3 py-1 rounded-full border text-sm font-medium transition-colors",
                colorClasses[colorIndex],
                hoverClasses[colorIndex],
                className
            )}
        >
            {service}
        </button>
    )
}

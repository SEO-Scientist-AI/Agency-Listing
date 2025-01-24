"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"

export function LocomotiveScrollProvider({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Dynamic import of locomotive-scroll
        const loadLocomotiveScroll = async () => {
            const locomotiveModule = await import('locomotive-scroll')
            const LocomotiveScroll = locomotiveModule.default

            // Import the CSS
            require('locomotive-scroll/dist/locomotive-scroll.css')

            const scroll = new LocomotiveScroll({
                el: containerRef.current!,
                smooth: true,
                multiplier: 0.8,
                class: "is-revealed",
                reloadOnContextChange: true,
                touchMultiplier: 2,
            })

            return () => {
                scroll.destroy()
            }
        }

        loadLocomotiveScroll()
    }, [])

    return (
        <div data-scroll-container ref={containerRef}>
            {children}
        </div>
    )
}

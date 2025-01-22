import { cn } from '@/lib/utils'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'

interface GridPatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  gradientClassName?: string
}

export function GridPatternCard({ 
  children, 
  className,
  patternClassName,
  gradientClassName
}: GridPatternCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    };

    document.querySelectorAll('.hover-card').forEach(card => {
      card.addEventListener('mousemove', handleMouseMove as EventListener);
    });

    return () => {
      document.querySelectorAll('.hover-card').forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove as EventListener);
      });
    };
  }, [isHovered]);

  return (
    <motion.div
      className={cn(
        "border w-full rounded-md overflow-hidden relative hover-card group",
        "bg-background",
        "border-border",
        "p-3",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-all duration-800 z-0"
          style={{
            background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(255,68,5,0.15), transparent 40%)`,
            transitionDelay: '0.8s'
          }}
        />
      )}
      <div className={cn(
        "size-full bg-repeat bg-[length:30px_30px] relative z-10",
        "bg-grid-pattern-light dark:bg-grid-pattern group-hover:opacity-75 transition-all duration-800",
        patternClassName
      )}>
        <div className={cn(
          "size-full bg-gradient-to-tr relative z-0",
          "from-background/90 via-background/40 to-background/10",
          gradientClassName
        )}>
          <div className={cn(
            "size-full relative z-10"
          )}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function GridPatternCardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("text-left p-4 md:p-6 relative z-10", className)} 
      {...props} 
    />
  )
}

"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative inline-flex cursor-pointer items-center">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors hover:bg-muted/80"
      >
        <span className="sr-only">Toggle theme</span>
        <span
          className={`${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-background transition-transform`}
        />
        <Sun className="absolute left-1 h-4 w-4 text-yellow-500 opacity-0 transition-opacity dark:opacity-100" />
        <Moon className="absolute right-1 h-4 w-4 text-slate-700 opacity-100 transition-opacity dark:opacity-0" />
      </button>
    </div>
  )
} 
"use client"

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={cn(
      "rounded-full transition-all duration-300 hover:scale-105",
      isDark
        ? "bg-stone-900/60 border border-stone-600 hover:bg-stone-900/80"
        : "bg-white/60 border border-stone-300 hover:bg-white/80",
      className
    )}>
      <button
        className={cn(
          "relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 m-2",
          isDark
            ? "bg-stone-700 focus:ring-stone-500"
            : "bg-stone-300 focus:ring-stone-400"
        )}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
      <div
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center",
          isDark
            ? "translate-x-6 bg-stone-900"
            : "translate-x-0 bg-white"
        )}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-stone-300" strokeWidth={2} />
        ) : (
          <Sun className="w-3 h-3 text-stone-600" strokeWidth={2} />
        )}
      </div>
      </button>
    </div>
  )
}
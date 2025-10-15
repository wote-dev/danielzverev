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
        ? "bg-black/40 embossed-subtle-dark hover:bg-black/60"
        : "bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60",
      className
    )}>
      <button
        className={cn(
          "relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 m-2",
          isDark
            ? "bg-neutral-800/60 embossed-subtle-dark focus:ring-neutral-500"
            : "bg-stone-200/60 embossed-subtle-light focus:ring-stone-400"
        )}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
      <div
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center",
          isDark
            ? "translate-x-6 bg-black/80 embossed-subtle-dark"
            : "translate-x-0 bg-white/80 embossed-subtle-light"
        )}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-neutral-300" strokeWidth={2} />
        ) : (
          <Sun className="w-3 h-3 text-stone-600" strokeWidth={2} />
        )}
      </div>
      </button>
    </div>
  )
}
"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

export function ModeTogglesm() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div onClick={toggleTheme} className="border-none outline-none bg-none">
      {theme === "dark" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-transform rotate-0 scale-100" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-transform rotate-90 scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}

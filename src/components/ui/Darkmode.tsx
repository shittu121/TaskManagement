"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="lg:mt-5 lg:w-16 lg:h-14 rounded-2xl lg:mx-5">
      {theme === "dark" ? (
        <SunIcon className="h-[1rem] lg:h-[3rem] w-[1rem] lg:w-[3rem] transition-transform rotate-0 scale-100" />
      ) : (
        <MoonIcon className="h-[1rem] lg:h-[3rem] w-[1rem] lg:w-[3rem] transition-transform rotate-90 scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

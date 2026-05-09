"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RiSunLine, RiMoonLine, RiComputerLine } from "@remixicon/react"

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <RiSunLine className="size-4" />
      </Button>
    )
  }

  const themes = [
    { value: "light", icon: RiSunLine, label: "Light" },
    { value: "dark", icon: RiMoonLine, label: "Dark" },
    { value: "system", icon: RiComputerLine, label: "System" },
  ]

  const currentIndex = themes.findIndex((t) => t.value === resolvedTheme)
  const nextIndex = (currentIndex + 1) % themes.length
  const nextTheme = themes[nextIndex]

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9"
      onClick={() => setTheme(nextTheme.value)}
      title={`Zmien na ${nextTheme.label}`}
    >
      {resolvedTheme === "dark" ? (
        <RiMoonLine className="size-4" />
      ) : resolvedTheme === "light" ? (
        <RiSunLine className="size-4" />
      ) : (
        <RiComputerLine className="size-4" />
      )}
    </Button>
  )
}
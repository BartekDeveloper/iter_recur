"use client"

import { RiBookLine, RiCodeLine } from "@remixicon/react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

interface HeaderProps {
  currentPath: string
}

export function Header({ currentPath }: HeaderProps) {
  return (
    <>
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="none md:block text-xl font-bold text-foreground font-heading">
            Iteracja vs Rekurencja
          </h1>
          <div className="flex items-center gap-3">
            <nav className="flex gap-1">
              <a
                href="/iter_recur/"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === "/iter_recur/" || currentPath === "/iter_recur"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <RiBookLine className="size-4" />
                Teoria
              </a>
              <a
                href="/iter_recur/exercises"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === "/iter_recur/exercises"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <RiCodeLine className="size-4" />
                Ćwiczenia
              </a>
            </nav>
            <div className="w-px h-6 bg-border mx-2" />
            <AnimatedThemeToggler />
          </div>
        </div>
      </div>
    </header>
    <div>
      <button className="fixed right-1 bottom-2 text-lg bg-emerald-400 dark:bg-emerald-800 flex text-center items-center content-center align-middle border-emerald-100 text-emerald-100 dark:text-emerald-400 dark:border-emerald-700 border-4 border-solid rounded-full w-12 h-12 p-4 mr-1 mb-2 hover:translate-y-0.5 hover:bg-emerald-300 hover:dark:bg-emerald-900" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>&uarr;</button>
    </div>
    </>
  )
}

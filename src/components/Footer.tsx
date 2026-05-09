import { RiGithubFill, RiMailSendLine } from "@remixicon/react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Iteracja vs Rekurencja - Material edukacyjny
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <RiGithubFill className="size-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <RiMailSendLine className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
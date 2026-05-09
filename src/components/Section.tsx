import type { ReactNode } from "react"

interface SectionProps {
  id?: string
  title: string
  titleColor?: string
  children: ReactNode
}

export function Section({ id, title, titleColor = "text-primary", children }: SectionProps) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className={`text-3xl font-bold ${titleColor} mb-6 pb-4 border-b-2 border-border/60`}>
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  )
}

interface InfoBoxProps {
  children: ReactNode
  className?: string
  borderColor?: string
}

export function InfoBox({ children, className = "", borderColor = "border-border" }: InfoBoxProps) {
  return (
    <div className={`bg-card/80 rounded-lg p-5 border-l-4 ${borderColor} shadow-sm ${className}`}>
      {children}
    </div>
  )
}

interface CodeExampleProps {
  title: string
  description?: string
  code: string
  language?: string
}

export function CodeExample({ title, description, code, language = "java" }: CodeExampleProps) {
  return (
    <div className="space-y-3">
      {title && <h3 className="text-xl font-semibold text-foreground">{title}</h3>}
      {description && <p className="text-muted-foreground">{description}</p>}
      <pre className="bg-muted rounded-lg p-4 border border-border overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  )
}
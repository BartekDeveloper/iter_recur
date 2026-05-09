import type { ReactNode } from "react"

interface SectionProps {
  id?: string
  title: string
  titleColor?: string
  children: ReactNode
}

export function Section({ id, title, titleColor = "text-primary", children }: SectionProps) {
  return (
    <section id={id} className="mb-12">
      <h2 className={`text-3xl font-bold ${titleColor} mb-6`}>{title}</h2>
      {children}
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
    <div className={`bg-card rounded-xl p-6 border ${borderColor} ${className}`}>
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
    <div className="space-y-2">
      {title && <h3 className="text-xl font-semibold text-foreground">{title}</h3>}
      {description && <p className="text-muted-foreground">{description}</p>}
      <pre className="bg-muted rounded-lg p-4 border border-border overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  )
}
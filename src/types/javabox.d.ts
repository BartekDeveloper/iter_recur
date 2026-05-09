declare global {
  interface Window {
    JBOX_ready?: boolean
    JBOX_run?: (code: string) => void
    JBOX_output?: string
    createModule?: (config?: unknown) => Promise<unknown>
  }
}

export {}
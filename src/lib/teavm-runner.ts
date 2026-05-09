export interface CompilationResult {
  success: boolean
  output: string
  errors: CompilationError[]
  wasmModule: WebAssembly.Instance | null
}

export interface CompilationError {
  line: number
  column: number
  message: string
  source: string
}

export interface TeaVMCompiler {
  addSourceFile(path: string, content: string): void
  clearSourceFiles(): void
  setSdk(content: ArrayBuffer): void
  onDiagnostic(listener: (diagnostic: Diagnostic) => void): void
  compile(): boolean
  getOutputFile(name: string): Int8Array | null
  generateWebAssembly(options: GenerateOptions): boolean
  getWebAssemblyOutputFile(path: string): Int8Array | null
}

interface Diagnostic {
  line: number
  column: number
  message: string
  source: string
}

interface GenerateOptions {
  outputName: string
  mainClass: string
}

export class TeaVMJavaRunner {
  private compiler: TeaVMCompiler | null = null
  private sdkBuffer: ArrayBuffer | null = null
  private loaded = false

  async init(): Promise<void> {
    if (this.loaded) return

    try {
      const { load } = await import("/compiler.wasm-runtime.js")
      const teavm = await load("/compiler.wasm")
      this.compiler = teavm.exports as unknown as TeaVMCompiler

      const response = await fetch("/compile-classlib-teavm.bin")
      this.sdkBuffer = await response.arrayBuffer()

      if (this.compiler && this.sdkBuffer) {
        this.compiler.setSdk(this.sdkBuffer)
        this.loaded = true
      }
    } catch (error) {
      console.error("Failed to initialize TeaVM:", error)
      throw error
    }
  }

  isReady(): boolean {
    return this.loaded && this.compiler !== null
  }

  async compileAndRun(
    javaCode: string,
    mainClass: string,
    methodName: string,
    input: number | number[]
  ): Promise<CompilationResult> {
    if (!this.compiler || !this.loaded) {
      await this.init()
    }

    if (!this.compiler) {
      return {
        success: false,
        output: "",
        errors: [{ line: 0, column: 0, message: "Compiler not initialized", source: "system" }],
        wasmModule: null,
      }
    }

    this.compiler.clearSourceFiles()
    this.compiler.addSourceFile("Exercise.java", javaCode)

    const errors: CompilationError[] = []

    this.compiler.onDiagnostic((diagnostic: Diagnostic) => {
      errors.push({
        line: diagnostic.line,
        column: diagnostic.column,
        message: diagnostic.message,
        source: diagnostic.source,
      })
    })

    const compileSuccess = this.compiler.compile()

    if (!compileSuccess || errors.length > 0) {
      return {
        success: false,
        output: "",
        errors: errors.length > 0 ? errors : [{ line: 0, column: 0, message: "Compilation failed", source: "compiler" }],
        wasmModule: null,
      }
    }

    const generateSuccess = this.compiler.generateWebAssembly({
      outputName: "exercise",
      mainClass: mainClass,
    })

    if (!generateSuccess) {
      return {
        success: false,
        output: "",
        errors: [{ line: 0, column: 0, message: "WASM generation failed", source: "generator" }],
        wasmModule: null,
      }
    }

    try {
      const wasmBytes = this.compiler.getWebAssemblyOutputFile("exercise.wasm")
      if (!wasmBytes) {
        return {
          success: false,
          output: "",
          errors: [{ line: 0, column: 0, message: "No WASM output generated", source: "generator" }],
          wasmModule: null,
        }
      }

      const wasmModule = await WebAssembly.instantiate(wasmBytes, {
        env: {
          print: (value: number) => {
            console.log(String(value))
          },
          printStr: (ptr: number) => {
            const memory = (wasmModule.instance.exports as any).memory
            const str = readString(memory, ptr)
            console.log(str)
          },
        },
      })

      const result = this.runWasmMethod(wasmModule, methodName, input)

      return {
        success: true,
        output: String(result),
        errors: [],
        wasmModule: wasmModule.instance,
      }
    } catch (error) {
      return {
        success: false,
        output: "",
        errors: [{ line: 0, column: 0, message: `Execution error: ${error}`, source: "runtime" }],
        wasmModule: null,
      }
    }
  }

  private runWasmMethod(wasmModule: WebAssembly.Instance, methodName: string, input: number | number[]): number {
    const exports = wasmModule.exports as any

    if (exports[methodName]) {
      if (typeof input === "number") {
        return exports[methodName](input)
      } else if (Array.isArray(input)) {
        return exports[methodName](input[0], input.length)
      }
    }

    if (exports.main) {
      const inputStr = typeof input === "number" 
        ? String(input) 
        : input.join(",")
      exports.main(inputStr)
    }

    return 0
  }
}

function readString(memory: WebAssembly.Memory, ptr: number): string {
  const bytes = new Uint8Array(memory.buffer)
  let end = ptr
  while (bytes[end] !== 0) {
    end++
  }
  const decoder = new TextDecoder("utf-8")
  return decoder.decode(bytes.slice(ptr, end))
}

let teaVMInstance: TeaVMJavaRunner | null = null

export async function getTeaVM(): Promise<TeaVMJavaRunner> {
  if (!teaVMInstance) {
    teaVMInstance = new TeaVMJavaRunner()
    await teaVMInstance.init()
  }
  return teaVMInstance
}
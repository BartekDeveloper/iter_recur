"use client"

import { useState, useEffect, Suspense, lazy, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  RiFileListLine,
  RiPlayLine,
  RiCheckLine,
  RiCloseLine,
  RiArrowRightSLine,
  RiErrorWarningLine,
  RiCodeLine,
  RiLoader4Line,
} from "@remixicon/react"

const Editor = lazy(() =>
  import("@monaco-editor/react").then((mod) => ({ default: mod.default }))
)

type InputValue = number | number[]

interface Exercise {
  id: number
  title: string
  description: string
  input: InputValue
  expectedOutput: string
  starterCode: string
  methodName: string
  methodSignature: string
  returnType: "String" | "long" | "int" | "int[]"
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: "Zadanie 1: Odliczanie",
    description:
      "Napisz metode countdown(int n), ktora zwroci string z liczbami od n do 1 oddzielonymi nowa linia.",
    input: 5,
    expectedOutput: "5\n4\n3\n2\n1",
    starterCode: `public class Exercise {
    public static String countdown(int n) {
        // Twoja implementacja
        // Zwroc string z liczbami oddzielonymi nowa linia
        return "";
    }
}`,
    methodName: "countdown",
    methodSignature: "int n",
    returnType: "String",
  },
  {
    id: 2,
    title: "Zadanie 2: Silnia",
    description:
      "Napisz metode factorial(int n), ktora obliczy silnie z liczby n (n!). Dla n=5 wynik to 120.",
    input: 5,
    expectedOutput: "120",
    starterCode: `public class Exercise {
    public static long factorial(int n) {
        // Twoja implementacja
        // Zwroc wynik silni
        return 0;
    }
}`,
    methodName: "factorial",
    methodSignature: "int n",
    returnType: "long",
  },
  {
    id: 3,
    title: "Zadanie 3: Suma tablicy",
    description:
      "Napisz metode sumArray(int[] arr), ktora zwroci sume wszystkich elementow tablicy.",
    input: [1, 2, 3, 4, 5],
    expectedOutput: "15",
    starterCode: `public class Exercise {
    public static int sumArray(int[] arr) {
        // Twoja implementacja
        // Zwroc sume elementow tablicy
        return 0;
    }
}`,
    methodName: "sumArray",
    methodSignature: "int[] arr",
    returnType: "int",
  },
  {
    id: 4,
    title: "Zadanie 4: Fibonacci (iteracyjnie)",
    description:
      "Napisz metode fibonacci(int n), ktora zwroci n-ta liczbe ciagu Fibonacciego (podejscie iteracyjne).",
    input: 10,
    expectedOutput: "55",
    starterCode: `public class Exercise {
    public static long fibonacci(int n) {
        // Twoja implementacja (iteracyjnie)
        // Zwroc n-ta liczbe Fibonacciego
        return 0;
    }
}`,
    methodName: "fibonacci",
    methodSignature: "int n",
    returnType: "long",
  },
  {
    id: 5,
    title: "Zadanie 5: Odwroc tablice",
    description:
      "Napisz metode reverseArray(int[] arr), ktora zwroci odwrocona tablice jako string oddzielony przecinkami.",
    input: [1, 2, 3, 4, 5],
    expectedOutput: "5,4,3,2,1",
    starterCode: `public class Exercise {
    public static String reverseArray(int[] arr) {
        // Twoja implementacja
        // Zwroc odwrocona tablice jako string oddzielony przecinkami
        return "";
    }
}`,
    methodName: "reverseArray",
    methodSignature: "int[] arr",
    returnType: "String",
  },
]

function EditorSkeleton() {
  return (
    <div className="h-[320px] flex items-center justify-center bg-muted">
      <Spinner size="lg" />
    </div>
  )
}

interface CodeStorage {
  [exerciseId: number]: string
}

function loadCodeFromStorage(exerciseId: number): string {
  if (typeof window === "undefined") return ""
  const stored = localStorage.getItem("cheerpj_code")
  if (stored) {
    try {
      const codeStore: CodeStorage = JSON.parse(stored)
      if (codeStore[exerciseId]) return codeStore[exerciseId]
    } catch {
      // ignore
    }
  }
  const ex = exercises.find((e) => e.id === exerciseId)
  return ex?.starterCode || ""
}

function saveCodeToStorage(exerciseId: number, newCode: string): void {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem("cheerpj_code")
  let codeStore: CodeStorage = {}
  if (stored) {
    try {
      codeStore = JSON.parse(stored)
    } catch {
      codeStore = {}
    }
  }
  codeStore[exerciseId] = newCode
  localStorage.setItem("cheerpj_code", JSON.stringify(codeStore))
}

function formatJavaInput(input: InputValue): string {
  if (Array.isArray(input)) {
    return `new int[]{${input.join(", ")}}`
  }
  return String(input)
}

class JavaMethodRunner {
  private output: string[] = []

  run(code: string, methodName: string, input: InputValue): { result: string; error: string | null } {
    try {
      const jsCode = this.transpileJavaToJS(code, methodName)
      if (!jsCode) {
        return { result: "", error: `Nie mozna znalezc metody: ${methodName}` }
      }

      this.output = []
      
      const customConsole = {
        log: (...args: unknown[]) => {
          this.output.push(args.map(String).join(" "))
        },
        error: (...args: unknown[]) => {
          this.output.push("BLAD: " + args.map(String).join(" "))
        },
      }

      const fn = new Function("console", "n", "arr", jsCode)
      const result = fn(
        customConsole,
        typeof input === "number" ? input : null,
        Array.isArray(input) ? input : null
      )

      const outputStr = this.output.length > 0 ? this.output.join("\n") : String(result ?? "")
      
      return { result: outputStr, error: null }
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e)
      return { result: "", error: err }
    }
  }

  private transpileJavaToJS(code: string, methodName: string): string | null {
    const methodRegex = new RegExp(
      `public\\s+static\\s+(\\w+)\\s+${methodName}\\s*\\(([^)]*)\\)\\s*\\{([\\s\\S]*?)\\n\\s*\\}`,
      "m"
    )
    const match = code.match(methodRegex)

    if (!match) return null

    let body = match[3]
    const returnType = match[1]

    body = this.convertForLoops(body)
    body = this.convertWhileLoops(body)
    body = this.convertIfStatements(body)
    body = this.convertReturnStatements(body, returnType)
    body = this.convertVariableDeclarations(body)
    body = this.convertArrayAccess(body)
    body = this.convertMethodCalls(body)
    body = this.wrapSystemOut(body)

    return `return (function() { ${body} })()`
  }

  private wrapSystemOut(body: string): string {
    body = body.replace(/System\.out\.println\(([^)]+)\);/g, "console.log($1);")
    body = body.replace(/System\.out\.print\(([^)]+)\);/g, "console.log($1);")
    body = body.replace(/System\.err\.println\(([^)]+)\);/g, "console.error($1);")
    return body
  }

  private convertForLoops(body: string): string {
    const forRegex = /for\s*\(\s*(?:int\s+)?(\w+)\s*=\s*(\d+)\s*;\s*\1\s*(<|<=|>|>=)\s*(\d+)\s*;\s*\1\+\+\s*\)/g
    return body.replace(
      forRegex,
      (_, varName, start, cmp, end) => {
        const jsCmp = cmp === "<" ? "<" : cmp === "<=" ? "<=" : cmp === ">" ? ">" : ">="
        return `for (let ${varName} = ${start}; ${varName}${jsCmp}${end}; ${varName}++)`
      }
    )
  }

  private convertWhileLoops(body: string): string {
    return body.replace(/while\s*\(([^)]+)\)\s*\{/g, "while ($1) {")
  }

  private convertIfStatements(body: string): string {
    return body.replace(/if\s*\(([^)]+)\)\s*\{/g, "if ($1) {")
  }

  private convertReturnStatements(body: string, returnType: string): string {
    body = body.replace(/return\s+([^;]+);/g, (_, expr) => {
      expr = expr.trim()
      if (/^\d+$/.test(expr) || /^\d+\.\d+$/.test(expr)) {
        return `return ${expr};`
      }
      if (expr === "true" || expr === "false") {
        return `return ${expr};`
      }
      if (returnType === "String" && !expr.startsWith("\"") && !expr.startsWith("String")) {
        return `return String(${expr});`
      }
      return `return ${expr};`
    })
    return body
  }

  private convertVariableDeclarations(body: string): string {
    body = body.replace(/\bint\s+(\w+)\s*=\s*([^;]+);/g, "let $1 = $2;")
    body = body.replace(/\blong\s+(\w+)\s*=\s*([^;]+);/g, "let $1 = Number($2);")
    body = body.replace(/\bString\s+(\w+)\s*=\s*([^;]+);/g, "let $1 = $2;")
    body = body.replace(/\bint\[\]\s+(\w+)\s*=\s*new\s+int\[\]\s*\{([^}]+)\}/g, "let $1 = [$2];")
    return body
  }

  private convertArrayAccess(body: string): string {
    body = body.replace(/(\w+)\[(\w+)\]/g, "$1[$2]")
    body = body.replace(/arr\.length/g, "arr.length")
    return body
  }

  private convertMethodCalls(body: string): string {
    body = body.replace(/\bMath\.abs\(([^)]+)\)/g, "Math.abs($1)")
    body = body.replace(/\bString\.valueOf\(([^)]+)\)/g, "String($1)")
    return body
  }
}

export function ExerciseRunner() {
  const [selectedExercise, setSelectedExercise] = useState<number>(1)
  const [output, setOutput] = useState<string>("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [compilerReady, setCompilerReady] = useState(false)
  const [compilerError, setCompilerError] = useState<string | null>(null)
  const [code, setCode] = useState(() => loadCodeFromStorage(1))

  const exercise = exercises.find((e) => e.id === selectedExercise)!

  useEffect(() => {
    setCompilerReady(true)
  }, [])

  useEffect(() => {
    setCode(loadCodeFromStorage(selectedExercise))
    setOutput("")
    setIsCorrect(null)
  }, [selectedExercise])

  const handleCodeChange = useCallback((value: string | undefined) => {
    const newCode = value || ""
    setCode(newCode)
    saveCodeToStorage(selectedExercise, newCode)
  }, [selectedExercise])

  const runCode = async () => {
    setIsRunning(true)
    setOutput("")
    setIsCorrect(null)
    setCompilerError(null)

    try {
      const runner = new JavaMethodRunner()
      const { result, error } = runner.run(code, exercise.methodName, exercise.input)
      
      if (error) {
        setCompilerError(error)
        setOutput(result)
        setIsCorrect(false)
      } else {
        setOutput(result)
        
        const normalizedOutput = result.trim()
        const normalizedExpected = exercise.expectedOutput.trim()
        const isMatch = normalizedOutput === normalizedExpected
        setIsCorrect(isMatch)
      }
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e)
      setCompilerError(err)
      setIsCorrect(false)
    }

    setIsRunning(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!compilerReady && (
        <div className="flex items-center gap-2 p-4 mb-4 rounded-lg bg-muted text-muted-foreground">
          <Spinner size="sm" />
          <span>Inicjalizacja kompilatora...</span>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-lg font-heading text-foreground">
                <RiFileListLine className="size-5 text-primary" />
                Lista zadan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-1">
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExercise(ex.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-2 ${
                    selectedExercise === ex.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      selectedExercise === ex.id
                        ? "bg-primary-foreground text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {ex.id}
                  </span>
                  <span className="text-sm truncate">{ex.title}</span>
                  {selectedExercise === ex.id && (
                    <RiArrowRightSLine className="size-4 ml-auto" />
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-heading text-primary">
                {exercise.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {exercise.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-muted rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1">
                  Dane wejsciowe (Java):
                </div>
                <code className="text-sm font-mono text-emerald-400">
                  {formatJavaInput(exercise.input)}
                </code>
              </div>

              <div className="bg-muted rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1">
                  Oczekiwany wynik:
                </div>
                <code className="text-sm font-mono text-violet-400">
                  {exercise.expectedOutput}
                </code>
              </div>
            </CardContent>
          </Card>

          {compilerError && (
            <Alert variant="destructive" className="border-destructive">
              <RiErrorWarningLine className="size-4" />
              <AlertTitle>Blad wykonania</AlertTitle>
              <AlertDescription>
                <pre className="mt-2 whitespace-pre-wrap text-sm font-mono text-destructive">
                  {compilerError}
                </pre>
              </AlertDescription>
            </Alert>
          )}

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  <RiCodeLine className="size-4 inline mr-1" />
                  Java
                </span>
                <Badge variant="outline" className="text-xs border-border">
                  TeaVM
                </Badge>
              </div>
              <Button
                onClick={runCode}
                disabled={isRunning}
                size="sm"
                className="gap-2"
              >
                {isRunning ? (
                  <>
                    <RiLoader4Line className="size-4 animate-spin" />
                    Uruchamianie...
                  </>
                ) : (
                  <>
                    <RiPlayLine className="size-4" />
                    Uruchom
                  </>
                )}
              </Button>
            </CardHeader>
            <Suspense fallback={<EditorSkeleton />}>
              <Editor
                height="320px"
                language="java"
                theme="vs-dark"
                value={code}
                onChange={handleCodeChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  renderLineHighlight: "line",
                  tabSize: 2,
                }}
              />
            </Suspense>
          </Card>

          {output && (
            <Card
              className={`bg-card border-border ${
                isCorrect ? "border-green-500/50" : "border-destructive/50"
              }`}
            >
              <CardHeader className="border-b border-border py-3">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <RiCheckLine className="size-5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">
                        Poprawnie!
                      </span>
                    </>
                  ) : (
                    <>
                      <RiCloseLine className="size-5 text-destructive" />
                      <span className="text-destructive font-medium">
                        Niepoprawny wynik
                      </span>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-xs text-muted-foreground mb-2">
                  Wyjscie programu:
                </div>
                <ScrollArea className="h-[120px] rounded-lg bg-muted border border-border p-4">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                    {output || "(brak wyjscia)"}
                  </pre>
                </ScrollArea>
                {!isCorrect && output && (
                  <div className="mt-3 text-sm text-muted-foreground">
                    Oczekiwano:{" "}
                    <code className="text-purple-500">
                      {exercise.expectedOutput}
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
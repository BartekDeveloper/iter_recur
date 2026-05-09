"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  RiFileListLine,
  RiArrowRightSLine,
} from "@remixicon/react"

type InputValue = number | number[]

interface Exercise {
  id: number
  title: string
  description: string
  input: InputValue
  expectedOutput: string
  methodName: string
  methodSignature: string
  returnType: "String" | "long" | "int" | "int[]"
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: "Zadanie 1: Odliczanie",
    description: `Napisz metodę countdown(int n), która przyjmuje liczbę całkowitą n i zwraca string zawierający wszystkie liczby od n do 1, każda w nowej linii.

Wymagania:
- Metoda przyjmuje jeden parametr typu int o nazwie n
- Metoda zwraca String
- Liczby muszą być wypisane w porządku malejącym (n, n-1, ..., 1)
- Każda liczba powinna być w osobnej linii
- Nie dodawaj pustej linii na początku ani na końcu

Przykład:
dla n = 5:
5
4
3
2
1`,
    input: 5,
    expectedOutput: "5\n4\n3\n2\n1",
    methodName: "countdown",
    methodSignature: "int n",
    returnType: "String",
  },
  {
    id: 2,
    title: "Zadanie 2: Silnia",
    description: `Napisz metodę factorial(int n), która oblicza silnię z liczby n (n!).

Wymagania:
- Metoda przyjmuje jeden parametr typu int o nazwie n
- Metoda zwraca long (silnia może być bardzo duża)
- Silnia to iloczyn wszystkich liczb od 1 do n
- Dla n = 0 i n = 1 zwróć 1 (0! = 1, 1! = 1)
- Użyj pętli for lub while do obliczeń

Wzór: n! = 1 * 2 * 3 * ... * n

Przykład:
dla n = 5: 5! = 1 * 2 * 3 * 4 * 5 = 120`,
    input: 5,
    expectedOutput: "120",
    methodName: "factorial",
    methodSignature: "int n",
    returnType: "long",
  },
  {
    id: 3,
    title: "Zadanie 3: Suma tablicy",
    description: `Napisz metodę sumArray(int[] arr), która oblicza sumę wszystkich elementów w tablicy.

Wymagania:
- Metoda przyjmuje jeden parametr typu int[] o nazwie arr
- Metoda zwraca int
- Zwraca sumę wszystkich elementów tablicy
- Jeśli tablica jest pusta lub null, zwróć 0
- Użyj pętli for-each lub zwykłej pętli for

Przykład:
dla arr = {1, 2, 3, 4, 5}: 1 + 2 + 3 + 4 + 5 = 15`,
    input: [1, 2, 3, 4, 5],
    expectedOutput: "15",
    methodName: "sumArray",
    methodSignature: "int[] arr",
    returnType: "int",
  },
  {
    id: 4,
    title: "Zadanie 4: Fibonacci (iteracyjnie)",
    description: `Napisz metodę fibonacci(int n), która zwraca n-tą liczbę ciągu Fibonacciego używając podejścia iteracyjnego.

Wymagania:
- Metoda przyjmuje jeden parametr typu int o nazwie n
- Metoda zwraca long
- Ciąg Fibonacciego: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)
- Dla n = 0 zwróć 0, dla n = 1 zwróć 1
- Użyj pętli for z dwiema zmiennymi do przechowywania poprzednich wartości
- NIE UŻYWAJ rekurencji - to zadanie o iteracji!

Przykład:
dla n = 10: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 -> wynik to 55`,
    input: 10,
    expectedOutput: "55",
    methodName: "fibonacci",
    methodSignature: "int n",
    returnType: "long",
  },
  {
    id: 5,
    title: "Zadanie 5: Odwroc tablice",
    description: `Napisz metodę reverseArray(int[] arr), która odwraca kolejności elementów w tablicy i zwraca je jako string.

Wymagania:
- Metoda przyjmuje jeden parametr typu int[] o nazwie arr
- Metoda zwraca String
- Elementy powinny być oddzielone przecinkami BEZ spacji
- Ostatni element NIE powinien mieć przecinka po sobie
- Tablica powinna być odwrócona (pierwszy element staje się ostatnim)
- Nie używaj Collections.reverse() - samodzielnie odwróć tablice

Przykład:
dla arr = {1, 2, 3, 4, 5}: wynik to "5,4,3,2,1"`,
    input: [1, 2, 3, 4, 5],
    expectedOutput: "5,4,3,2,1",
    methodName: "reverseArray",
    methodSignature: "int[] arr",
    returnType: "String",
  },
]

function formatJavaInput(input: InputValue): string {
  if (Array.isArray(input)) {
    return `new int[]{${input.join(", ")}}`
  }
  return String(input)
}

export function ExerciseRunner() {
  const [selectedExercise, setSelectedExercise] = useState<number>(1)
  const exercise = exercises.find((e) => e.id === selectedExercise)!

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-xl font-heading text-foreground">
                <RiFileListLine className="size-6 text-primary" />
                Lista zadan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExercise(ex.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${
                    selectedExercise === ex.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span
                    className={`size-8 rounded-full flex items-center justify-center text-base font-bold ${
                      selectedExercise === ex.id
                        ? "bg-primary-foreground text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {ex.id}
                  </span>
                  <span className="text-base truncate">{ex.title}</span>
                  {selectedExercise === ex.id && (
                    <RiArrowRightSLine className="size-5 ml-auto" />
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-2xl font-heading text-primary">
                {exercise.title}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                {exercise.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="bg-muted rounded-lg p-4 border border-border">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Dane wejsciowe (Java):
                </div>
                <code className="text-lg font-mono text-emerald-400">
                  {formatJavaInput(exercise.input)}
                </code>
              </div>

              <div className="bg-muted rounded-lg p-4 border border-border">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Oczekiwany wynik:
                </div>
                <code className="text-lg font-mono text-violet-400 whitespace-pre-wrap">
                  {exercise.expectedOutput.replace(/\n/g, ' ')}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
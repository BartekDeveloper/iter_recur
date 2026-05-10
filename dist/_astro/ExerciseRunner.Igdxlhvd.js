import{j as e}from"./jsx-runtime.u17CrQMm.js";import{r as m}from"./index.youP9M1B.js";import{c as n,t as p,r as u}from"./index.CLXO57IU.js";function d({className:a,size:t="default",...i}){return e.jsx("div",{"data-slot":"card","data-size":t,className:n("group/card flex flex-col gap-4 overflow-hidden rounded-none bg-card py-4 text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",a),...i})}function o({className:a,...t}){return e.jsx("div",{"data-slot":"card-header",className:n("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-none px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",a),...t})}function s({className:a,...t}){return e.jsx("div",{"data-slot":"card-title",className:n("font-heading text-sm font-medium group-data-[size=sm]/card:text-sm",a),...t})}function x({className:a,...t}){return e.jsx("div",{"data-slot":"card-description",className:n("text-xs/relaxed text-muted-foreground",a),...t})}function c({className:a,...t}){return e.jsx("div",{"data-slot":"card-content",className:n("px-4 group-data-[size=sm]/card:px-3",a),...t})}const l=[{id:1,title:"Zadanie 1: Odliczanie",description:`Napisz metodę countdown(int n), która przyjmuje liczbę całkowitą n i zwraca string zawierający wszystkie liczby od n do 1, każda w nowej linii.

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
1`,input:5,expectedOutput:`5
4
3
2
1`,methodName:"countdown",methodSignature:"int n",returnType:"String"},{id:2,title:"Zadanie 2: Silnia",description:`Napisz metodę factorial(int n), która oblicza silnię z liczby n (n!).

Wymagania:
- Metoda przyjmuje jeden parametr typu int o nazwie n
- Metoda zwraca long (silnia może być bardzo duża)
- Silnia to iloczyn wszystkich liczb od 1 do n
- Dla n = 0 i n = 1 zwróć 1 (0! = 1, 1! = 1)
- Użyj pętli for lub while do obliczeń

Wzór: n! = 1 * 2 * 3 * ... * n

Przykład:
dla n = 5: 5! = 1 * 2 * 3 * 4 * 5 = 120`,input:5,expectedOutput:"120",methodName:"factorial",methodSignature:"int n",returnType:"long"},{id:3,title:"Zadanie 3: Suma tablicy",description:`Napisz metodę sumArray(int[] arr), która oblicza sumę wszystkich elementów w tablicy.

Wymagania:
- Metoda przyjmuje jeden parametr typu int[] o nazwie arr
- Metoda zwraca int
- Zwraca sumę wszystkich elementów tablicy
- Jeśli tablica jest pusta lub null, zwróć 0
- Użyj pętli for-each lub zwykłej pętli for

Przykład:
dla arr = {1, 2, 3, 4, 5}: 1 + 2 + 3 + 4 + 5 = 15`,input:[1,2,3,4,5],expectedOutput:"15",methodName:"sumArray",methodSignature:"int[] arr",returnType:"int"},{id:4,title:"Zadanie 4: Fibonacci (iteracyjnie)",description:`Napisz metodę fibonacci(int n), która zwraca n-tą liczbę ciągu Fibonacciego używając podejścia iteracyjnego.

Wymagania:
- Metoda przyjmuje jeden parametr typu int o nazwie n
- Metoda zwraca long
- Ciąg Fibonacciego: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)
- Dla n = 0 zwróć 0, dla n = 1 zwróć 1
- Użyj pętli for z dwiema zmiennymi do przechowywania poprzednich wartości
- NIE UŻYWAJ rekurencji - to zadanie o iteracji!

Przykład:
dla n = 10: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 -> wynik to 55`,input:10,expectedOutput:"55",methodName:"fibonacci",methodSignature:"int n",returnType:"long"},{id:5,title:"Zadanie 5: Odwroc tablice",description:`Napisz metodę reverseArray(int[] arr), która odwraca kolejności elementów w tablicy i zwraca je jako string.

Wymagania:
- Metoda przyjmuje jeden parametr typu int[] o nazwie arr
- Metoda zwraca String
- Elementy powinny być oddzielone przecinkami BEZ spacji
- Ostatni element NIE powinien mieć przecinka po sobie
- Tablica powinna być odwrócona (pierwszy element staje się ostatnim)
- Nie używaj Collections.reverse() - samodzielnie odwróć tablice

Przykład:
dla arr = {1, 2, 3, 4, 5}: wynik to "5,4,3,2,1"`,input:[1,2,3,4,5],expectedOutput:"5,4,3,2,1",methodName:"reverseArray",methodSignature:"int[] arr",returnType:"String"}];function b(a){return Array.isArray(a)?`new int[]{${a.join(", ")}}`:String(a)}function j(){const[a,t]=m.useState(1),i=l.find(r=>r.id===a);return e.jsx("div",{className:"max-w-7xl mx-auto px-4 py-8",children:e.jsxs("div",{className:"grid lg:grid-cols-4 gap-6",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsxs(d,{className:"bg-card border-border",children:[e.jsx(o,{className:"border-b border-border",children:e.jsxs(s,{className:"flex items-center gap-2 text-xl font-heading text-foreground",children:[e.jsx(p,{className:"size-6 text-primary"}),"Lista zadan"]})}),e.jsx(c,{className:"p-3 space-y-2",children:l.map(r=>e.jsxs("button",{onClick:()=>t(r.id),className:`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${a===r.id?"bg-primary text-primary-foreground border-primary":"bg-background border-border hover:bg-muted hover:text-foreground"}`,children:[e.jsx("span",{className:`size-8 rounded-full flex items-center justify-center text-base font-bold ${a===r.id?"bg-primary-foreground text-primary":"bg-muted text-muted-foreground"}`,children:r.id}),e.jsx("span",{className:"text-base truncate",children:r.title}),a===r.id&&e.jsx(u,{className:"size-5 ml-auto"})]},r.id))})]})}),e.jsx("div",{className:"lg:col-span-3 space-y-6",children:e.jsxs(d,{className:"bg-card border-border",children:[e.jsxs(o,{className:"border-b border-border pb-4",children:[e.jsx(s,{className:"text-2xl font-heading text-primary",children:i.title}),e.jsx(x,{className:"text-base text-muted-foreground whitespace-pre-line leading-relaxed",children:i.description})]}),e.jsxs(c,{className:"space-y-4 pt-4",children:[e.jsxs("div",{className:"bg-muted rounded-lg p-4 border border-border",children:[e.jsx("div",{className:"text-sm font-medium text-muted-foreground mb-2",children:"Dane wejsciowe (Java):"}),e.jsx("code",{className:"text-lg font-mono text-emerald-400",children:b(i.input)})]}),e.jsxs("div",{className:"bg-muted rounded-lg p-4 border border-border",children:[e.jsx("div",{className:"text-sm font-medium text-muted-foreground mb-2",children:"Oczekiwany wynik:"}),e.jsx("code",{className:"text-lg font-mono text-violet-400 whitespace-pre-wrap",children:i.expectedOutput.replace(/\n/g," ")})]})]})]})})]})})}export{j as ExerciseRunner};

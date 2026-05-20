export const odliczanieIteracyjne = `
public class Main {
  public static void main(String[] args) {
    odliczanieIteracyjne(5);
  }

  public static void odliczanieIteracyjne(int n) {
    while (n > 0) {
      System.out.println(n);
      n--;
    }
  }
}`

export const odliczanieRekurencyjne = `
public class Main {
  public static void main(String[] args) {
    odliczanieRekurencyjne(5);
  }

  public static void odliczanieRekurencyjne(int n) {
    if (n <= 0) return;
    System.out.println(n);
    odliczanieRekurencyjne(n - 1);
  }
}`

export const silniaIteracyjna = `
public class Main {
  public static long silniaIteracyjna(int n) {
    long wynik = 1;
    for (int i = 1; i <= n; i++) {
      wynik *= i;
    }
    return wynik;
  }
}`

export const silniaRekurencyjna = `
public class Main {
  public static long silniaRekurencyjna(int n) {
    if (n <= 1) return 1;
    return n * silniaRekurencyjna(n - 1);
  }
}`

export const simpleForLoop = `
for (int i = 0; i < 1000; i++) {
  // szybkie powtarzanie
}`

export const zlaRekurencja = `
public static void zlaRekurencja() {
  zlaRekurencja();
}`

export const fibonacci = `
public static long fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`

export const fibonacciMemo = `
static long[] pamiec = new long[1000];

public static long fibonacciMemo(int n) {
  if (n <= 1) return n;
  if (pamiec[n] != 0) return pamiec[n];
  pamiec[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
  return pamiec[n];
}`

export const ifBaseCase = `if (n <= 0) return;`

export const bezpiecznaRekurencja = `
static final int LIMIT_GLEBOKOSCI = 10000;

public static void bezpiecznaRekurencja(int n, int depth) {
  if (depth > LIMIT_GLEBOKOSCI) return;
  if (n <= 0) return;
  bezpiecznaRekurencja(n - 1, depth + 1);
}`

export const rekurencjaZeSledzeniem = `
static int aktualnaGlebokosc = 0;
static int maksZarejestrowanaGlebokosc = 0;

public static void rekurencjaZeSledzeniem(int n) {
  aktualnaGlebokosc++;
  maksZarejestrowanaGlebokosc = Math.max(maksZarejestrowanaGlebokosc, aktualnaGlebokosc);
  if (n <= 0) { aktualnaGlebokosc--; return; }
  rekurencjaZeSledzeniem(n - 1);
  aktualnaGlebokosc--;
}`

export const silniaOgonowa = `
public static long silniaOgonowa(int n, long ak) {
  if (n <= 1) return ak;
  return silniaOgonowa(n - 1, ak * n);
}`

export const przegladKatalogu = `
public static void przegladKatalogu(File dir, int indent) {
  if (!dir.isDirectory()) return;
  File[] files = dir.listFiles();
  if (files == null) return;
  for (File file : files) {
    for (int i = 0; i < indent; i++) System.out.print("  ");
    if (file.isDirectory()) {
      System.out.println("[DIR] " + file.getName());
      przegladKatalogu(file, indent + 1);
    } else {
      System.out.println("[FILE] " + file.getName());
    }
  }
}`

export const wyszukiwanieBinarne = `
public static int wyszukiwanieBinarne(int[] tab, int cel, int lewy, int prawy) {
  if (lewy > prawy) return -1;
  int srodek = lewy + (prawy - lewy) / 2;
  if (tab[srodek] == cel) return srodek;
  if (tab[srodek] < cel) return wyszukiwanieBinarne(tab, cel, srodek + 1, prawy);
  return wyszukiwanieBinarne(tab, cel, lewy, srodek - 1);
}`

export const drukujDrzewo = `
public static void drukujDrzewo(TreeNode wezel, int glebokosc) {
  if (wezel == null) return;
  for (int i = 0; i < glebokosc; i++) System.out.print("  ");
  System.out.println(wezel.name);
  if (wezel.children != null) {
    for (TreeNode child : wezel.children) {
      drukujDrzewo(child, glebokosc + 1);
    }
  }
}`

export const permutacje = `
public static void permutacje(String napis, String wynik) {
  if (napis.length() == 0) {
    System.out.println(wynik);
    return;
  }
  for (int i = 0; i < napis.length(); i++) {
    String newStr = napis.substring(0, i) + napis.substring(i + 1);
    permutacje(newStr, wynik + napis.charAt(i));
  }
}`

export const factorialShort = `
public static long factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`
 
export const fibonacciIter = `
public void fibonacciIter(int n) {
    long n1 = 1, n2 = 1;

    for(long i = 0; i < n; i++) {
        long newN = n1+n2;
        System.out.println(newN);

        n1 = n2;
        n2 = newN;
    }
}`;

export const fibonacciRecur = `
public int fibonacci(int n)  {
    if(n == 0) {
      return 0;
    } else if(n == 1) {
      return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}`;
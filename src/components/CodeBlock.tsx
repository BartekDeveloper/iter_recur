import { useEffect, useState, useSyncExternalStore } from "react";
import { codeToHtml } from "shiki";

type Theme = "light" | "dark";

function getSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  if (document.documentElement.classList.contains("dark")) return "dark";
  const stored = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
  if (stored === "dark") return "dark";
  return "light";
}

function subscribe(notify: () => void) {
  if (typeof window === "undefined") return () => {};

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && (m as any).attributeName === "class") {
        notify();
        break;
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  // Listen for localStorage changes (from other windows) and a custom event for same-window updates
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key === "theme") notify();
  };
  const onCustom = () => notify();
  window.addEventListener("storage", onStorage);
  window.addEventListener("theme-change", onCustom);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("theme-change", onCustom);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// Call this when your site toggles theme (e.g. adds/removes `dark` class)
export function notifyThemeChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("theme-change"));
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

interface Props {
  code: string;
  lang?: string;
}

export default function CodeBlock({ code, lang = "java" }: Props) {
  const theme = useTheme();
  const themeName = theme === "dark" ? "github-dark" : "github-light";
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const out = await codeToHtml(code, { lang, theme: themeName });
        if (!cancelled) setHtml(out);
      } catch (e) {
        if (!cancelled) setHtml(`<pre class=\"shiki\"><code>${escapeHtml(code)}</code></pre>`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, lang, themeName]);

  return (
    <div className="bg-card *:bg-transparent! rounded-lg p-4 border border-border overflow-x-auto my-6" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

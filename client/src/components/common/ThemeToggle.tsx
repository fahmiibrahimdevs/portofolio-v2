import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export type ThemeMode = "light" | "dark";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("fahmi_portfolio_theme") as ThemeMode | null;
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // default to dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    }
    localStorage.setItem("fahmi_portfolio_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-300 border bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 shadow-sm ${className}`}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme Mode"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {theme === "dark" ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-amber-400" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-90 scale-100 text-amber-500" />
        )}
      </div>
      <span className="hidden sm:inline-block text-xs font-semibold tracking-wide">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}

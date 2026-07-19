"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  dark: boolean;
  setDark: (v: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDarkState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme-dark");
    if (stored !== null) setDarkState(stored === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("theme-dark", String(dark));
  }, [dark, mounted]);

  const setDark = (v: boolean) => setDarkState(v);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

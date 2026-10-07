"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (en, bn) => en,
  isBn: false,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLang = localStorage.getItem("aic_lang");
        if (savedLang === "bn" || savedLang === "en") {
          return savedLang;
        }
      } catch {
        // Fallback if localStorage is inaccessible
      }
    }
    return "en";
  });

  // Keep document html lang in sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang) => {
    if (lang !== "en" && lang !== "bn") return;
    setLanguageState(lang);
    try {
      localStorage.setItem("aic_lang", lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    } catch {
      // Ignore fallback
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "bn" : "en";
    setLanguage(nextLang);
  };

  const t = (enText, bnText) => {
    return language === "bn" ? bnText : enText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isBn: language === "bn",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

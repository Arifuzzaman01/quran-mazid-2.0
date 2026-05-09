"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SettingsType = {
  arabicFont: string;
  arabicSize: number;
  translationSize: number;
  theme: string; // নতুন থিম প্রপার্টি
  setSettings: (key: string, value: any) => void;
};

const SettingsContext = createContext<SettingsType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setAllSettings] = useState({
    arabicFont: "font-me-quran",
    arabicSize: 32,
    translationSize: 16,
    theme: "dark", // ডিফল্ট থিম
  });

  useEffect(() => {
    const saved = localStorage.getItem("quranSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAllSettings(parsed);
    
      document.documentElement.className = parsed.theme || "dark";
    }
  }, []);

  const setSettings = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setAllSettings(newSettings);
    localStorage.setItem("quranSettings", JSON.stringify(newSettings));
    
   
    if (key === "theme") {
      document.documentElement.className = value;
    }
  };

  return (
    <SettingsContext.Provider value={{ ...settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext)!;
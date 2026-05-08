"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SettingsType = {
  arabicFont: string;
  arabicSize: number;
  translationSize: number;
  setSettings: (key: string, value: any) => void;
};

const SettingsContext = createContext<SettingsType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setAllSettings] = useState({
    arabicFont: "font-me-quran",
    arabicSize: 32,
    translationSize: 16,
  });

  useEffect(() => {
    const saved = localStorage.getItem("quranSettings");
    if (saved) setAllSettings(JSON.parse(saved));
  }, []);

  const setSettings = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setAllSettings(newSettings);
    localStorage.setItem("quranSettings", JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ ...settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext)!;
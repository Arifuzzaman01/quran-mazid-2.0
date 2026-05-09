"use client";
import React from "react";
import { useSettings } from "@/context/SettingsContext"; // আপনার ফাইল পাথ অনুযায়ী চেঞ্জ করুন
import { X, Type, Languages, SpellCheck } from "lucide-react";

const ARABIC_FONTS = [
  { id: "font-me-quran", name: "Me Quran" },
  { id: "font-amiri", name: "Amiri" },
  { id: "font-indopak", name: "IndoPak" },
];

export default function SettingsSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { arabicFont, arabicSize, translationSize, setSettings } = useSettings();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[150] lg:hidden" 
          onClick={onClose}
        />
      )}

      <div className={`fixed right-0 top-0 h-full w-3/4 sm:w-[320px] bg-[#121212] border-l border-[#1f1f1f] z-[200] transform transition-transform duration-300 ease-in-out shadow-2xl ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f1f1f]">
          <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <SpellCheck size={20} className="text-emerald-500" />
            Settings
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)] custom-sidebar-scrollbar">
          
          {/* 1. Arabic Font Family */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider flex items-center gap-2">
              <Languages size={14} /> Arabic Font Style
            </label>
            <div className="grid grid-cols-1 gap-2">
              {ARABIC_FONTS.map((font) => (
                <button
                  key={font.id}
                  onClick={() => setSettings("arabicFont", font.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    arabicFont === font.id
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 font-bold"
                      : "bg-[#1a1a1a] border-transparent text-gray-400 hover:border-gray-700"
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Arabic Text Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider flex items-center gap-2">
                <Type size={14} /> Arabic Font Size
              </label>
              <span className="text-emerald-500 text-xs font-bold">{arabicSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={arabicSize}
              onChange={(e) => setSettings("arabicSize", parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* 3. Translation Text Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider flex items-center gap-2">
                <Type size={14} /> Translation Size
              </label>
              <span className="text-emerald-500 text-xs font-bold">{translationSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="30"
              value={translationSize}
              onChange={(e) => setSettings("translationSize", parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Preview Box */}
          <div className="mt-10 p-5 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] space-y-3 text-center">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-2">Live Preview</p>
            <p className={`${arabicFont} text-white`} style={{ fontSize: `${arabicSize}px` }}>
              بِسْمِ اللَّهِ
            </p>
            <p className="text-gray-400" style={{ fontSize: `${translationSize}px` }}>
              In the name of Allah
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
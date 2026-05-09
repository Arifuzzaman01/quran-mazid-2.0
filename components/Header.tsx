"use client";
import { Heart, Menu, Moon, SearchIcon, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import Search from "./Search";
import SettingsSidebar from "./SettingsSidebar";

import { useSettings } from "@/context/SettingsContext";

const Header = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);
  const THEMES = [
    { id: "dark", name: "Dark", color: "bg-black" },
    { id: "light", name: "Light", color: "bg-white" },
    { id: "sepia", name: "Sepia", color: "bg-[#f4ecd8]" },
  ];
  const { theme, setSettings } = useSettings();

  return (
    <div className="sticky top-0 flex items-center justify-between px-4 py-0 bg-[var(--bg-main)] border-b border-[#1f1f1f] w-full z-50">
      <button
        onClick={onOpenMenu}
        className="lg:hidden p-2 text-primary hover:bg-primary/10 rounded-lg"
      >
        <Menu size={24} />
      </button>
      <div className="space-y-1">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-400 tracking-tight"
        >
          Quran <span className="hidden sm:inline">Mazid</span>
        </Link>
        <p className="text-[11px] text-primary font-medium hidden md:block">
          Read, Study, and Learn The Quran
        </p>
      </div>

      <div className="flex items-center justify-end gap-0.5 sm:gap-2 flex-1">
        {openSearch && (
          <>
          <div className="absolute  -right-1/5 top-full mt-2 w-full sm:w-auto  rounded-2xl shadow-2xl z-[100] sm:hidden">
            <Search />
          </div>
          <div className="hidden sm:inline">
            <Search />
          </div>
          </>
        )}

        <button
          onClick={() => setOpenSearch(!openSearch)}
          className="text-green-700 hover:text-primary p-3 my-2 hover:bg-primary/10 rounded-full transition-all duration-300"
        >
          <SearchIcon size={18} />
        </button>
        {/* Theme Selector Tooltip */}
        <div className="relative group">
          {/* Theme Button */}
          <button className="text-green-700 hover:text-primary p-3 my-2 hover:bg-primary/10 rounded-full transition-all duration-300 flex items-center justify-center">
            <Moon size={18} />
          </button>

          {/* Tooltip Wrapper (Selector Area) */}
          <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-[#121212] border border-[#1f1f1f] rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Appearance
                </label>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full capitalize">
                  {theme}
                </span>
              </div>

              <div className=" ">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSettings("theme", t.id)}
                    className={`flex justify-around w-full items-center gap-2 p-2 rounded-xl border transition-all duration-200 ${
                      theme === t.id
                        ? "border-emerald-500 bg-emerald-500/10 scale-95"
                        : "border-transparent bg-[#1a1a1a] hover:border-gray-700"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border border-gray-700 ${t.color}`}
                    />
                    <span className="text-[9px] font-medium">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Triangle Arrow pointer to button */}
            <div className="absolute -top-1 right-5 w-3 h-3 bg-[#121212] border-t border-l border-[#1f1f1f] rotate-45"></div>
          </div>
        </div>

        {/* Settings Trigger Button */}
        <button
          onClick={() => setOpenSetting(true)}
          className="text-green-700 hover:text-gray-300 p-3 my-2 hover:bg-white/5 rounded-full transition-all duration-300"
        >
          <Settings size={18} />
        </button>

        <button className="text-white bg-green-700 hover:bg-green-800 px-4 py-1.5 rounded-full ml-4 flex items-center gap-1 transition-colors">
          Support <span className="hidden sm:block">Us </span>
          <span className="relative">
            <Heart size={20} className="text-green-300/40 fill-green-300/40" />
            <Heart
              size={15}
              className="absolute bottom-0 right-0 text-green-500 fill-gray-100"
            />
          </span>
        </button>
      </div>

      {/* Settings Drawer Integration */}
      <SettingsSidebar
        isOpen={openSetting}
        onClose={() => setOpenSetting(false)}
      />
      <div>
        {/* {openMenu && (
          <SurahSidebar isOpen={openMenu} onClose={() => setOpenMenu(false)} />
        )} */}
      </div>
    </div>
  );
};

export default Header;

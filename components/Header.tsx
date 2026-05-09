"use client";
import { Heart, Moon, SearchIcon, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import Search from "./Search";
import SettingsSidebar from "./SettingsSidebar";

const Header = () => {
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);

  return (
    <div className="sticky top-0 flex items-center justify-between px-4 py-0 bg-[#0a0a0a] border-b border-[#1f1f1f] w-full z-50">
      <div className="space-y-1">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-400 tracking-tight"
        >
          Quran Mazid
        </Link>
        <p className="text-[11px] text-gray-500 font-medium">
          Read, Study, and Learn The Quran
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 flex-1">
        {openSearch && <Search />}
        
        <button
          onClick={() => setOpenSearch(!openSearch)}
          className="text-green-700 hover:text-gray-300 p-3 my-2 hover:bg-white/5 rounded-full transition-all duration-300"
        >
          <SearchIcon size={18} />
        </button>

        <button className="text-green-700 hover:text-gray-300 p-3 my-2 hover:bg-white/5 rounded-full transition-all duration-300">
          <Moon size={18} />
        </button>

        {/* Settings Trigger Button */}
        <button
          onClick={() => setOpenSetting(true)}
          className="text-green-700 hover:text-gray-300 p-3 my-2 hover:bg-white/5 rounded-full transition-all duration-300"
        >
          <Settings size={18} />
        </button>

        <button className="text-white bg-green-700 hover:bg-green-800 px-4 py-1.5 rounded-full ml-4 flex items-center gap-1 transition-colors">
          Support Us{" "}
          <span className="relative">
            <Heart
              size={20}
              className="text-green-300/40 fill-green-300/40"
            />
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
    </div>
  );
};

export default Header;
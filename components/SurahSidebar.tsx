"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useParams } from "next/navigation";

interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
}

export default function SurahSidebar({ surahs, onClose, isOpen }: { surahs: Surah[]; onClose: () => void; isOpen: boolean }) {
  const { id: activeId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(surahs);
  const [active, setActive] = useState("surah");

  // সার্চ কুয়েরি চেঞ্জ হলে লিস্ট ফিল্টার করার লজিক
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query === "") {
      setFilteredSurahs(surahs);
    } else {
      const filtered = surahs.filter(
        (surah) =>
          surah.transliteration.toLowerCase().includes(query) ||
          surah.translation.toLowerCase().includes(query) ||
          surah.id.toString() === query,
      );
      setFilteredSurahs(filtered);
    }
  }, [searchQuery, surahs]);

  return ( 
    <> {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden" 
          onClick={onClose}
        />
      )}
    <div className={`fixed lg:static top-0 left-0 h-screen bg-[var(--sidebar-bg)] border-r border-[#1f1f1f] z-50
        transition-transform duration-300 ease-in-out flex flex-col
        w-[310px] 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
        lg:flex
      `}>
        <div className="lg:hidden absolute right-4 top-5">
           <button onClick={onClose} className="p-2 text-gray-400"><X size={20}/></button>
        </div>
      {/* --- Header Section --- */}
      <div className="p-5 space-y-6">
        {/* --- Tab Switcher --- */}
        <div className="flex bg-[var(--card-bg)] px-2 py-1.5 rounded-full">
          <button
            onClick={() => setActive("surah")}
            className={`flex-1 py-2 text-xs font-bold rounded-full ${active === "surah" ? "bg-[var(--sidebar-bg)] text-primary" : "text-primary/50  "} transition-all duration-300 ease-in-out`}
          >
            Surah
          </button>
          <button
            onClick={() => setActive("juz")}
            className={`flex-1 py-2 text-xs font-bold rounded-full ${active === "juz" ? "bg-[var(--sidebar-bg)] text-primary" : "text-primary/50"} transition-all duration-300 ease-in-out`}
          >
            Juz
          </button>
          <button
            onClick={() => setActive("page")}
            className={`flex-1 py-2 text-xs font-bold rounded-full ${active === "page" ? "bg-[var(--sidebar-bg)] text-primary" : "text-primary/50"} transition-all duration-300 ease-in-out`}
          >
            Page
          </button>
        </div>

        {/* --- Search Box --- */}
        <div className="relative group">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              searchQuery ? "text-primary" : "text-primary/70"
            }`}
            size={18}
          />
          <input
            type="text"
            placeholder="Search Surah"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--sidebar-bg)] border border-primary rounded-2xl pl-12 pr-10 py-3 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-gray-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* --- Surah List Section --- */}
      {active === "surah" && (
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 custom-scrollbar">
          {filteredSurahs.length > 0 ? (
            filteredSurahs.map((surah) => {
              const isActive = activeId === surah.id.toString();

              return (
                <Link
                  key={surah.id}
                  href={`/surah/${surah.id}`}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group ${
                    isActive
                      ? "bg-[var(--sidebar-bg)] border-emerald-900/40"
                      : "bg-[var(--card-bg)] border-transparent hover:border-primary/20"
                  }`}
                >
                  {/* Diamond Index Shape */}
                  <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
                    <div
                      className={`absolute rotate-45 w-8 h-8 rounded-lg transition-colors duration-300 ${
                        isActive
                          ? "bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "bg-[#3a3535] group-hover:bg-[#2a2a2a]"
                      }`}
                    />
                    <span
                      className={`relative text-xs font-bold ${isActive ? "text-primary/50" : "text-white/70"}`}
                    >
                      {surah.id}
                    </span>
                  </div>

                  {/* Surah Name Info */}
                  <div className="flex-1">
                    <p
                      className={`text-[15px] font-bold ${isActive ? "text-primary" : "text-primary/10"}`}
                    >
                      {surah.transliteration}
                    </p>
                    <p className="text-[12px] text-primary/50 font-medium">
                      {surah.translation}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-sm">No Surah found</p>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}

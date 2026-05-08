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

export default function SurahSidebar({ surahs }: { surahs: Surah[] }) {
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
    <div className="w-[310px] h-screen bg-[var(--sidebar-bg)] flex flex-col border-r border-[#1f1f1f] hidden lg:flex">
      {/* --- Header Section --- */}
      <div className="p-5 space-y-6">
        {/* --- Tab Switcher --- */}
        <div className="flex bg-[#0a0a0a] px-2 py-1.5 rounded-full">
          <button
            onClick={() => setActive("surah")}
            className={`flex-1 py-2 text-xs font-bold rounded-full ${active === "surah" ? "bg-[var(--card-bg)] text-white" : "text-gray-500 hover:text-gray-300 "} transition-all duration-300 ease-in-out`}
          >
            Surah
          </button>
          <button
            onClick={() => setActive("juz")}
            className={`flex-1 py-2 text-xs font-bold rounded-full ${active === "juz" ? "bg-[var(--card-bg)] text-white" : "text-gray-500 hover:text-gray-300"} transition-all duration-300 ease-in-out`}
          >
            Juz
          </button>
          <button
            onClick={() => setActive("page")}
            className={`flex-1 py-2 text-xs font-bold rounded-full ${active === "page" ? "bg-[var(--card-bg)] text-white" : "text-gray-500 hover:text-gray-300"} transition-all duration-300 ease-in-out`}
          >
            Page
          </button>
        </div>

        {/* --- Search Box --- */}
        <div className="relative group">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              searchQuery ? "text-emerald-500" : "text-gray-600"
            }`}
            size={18}
          />
          <input
            type="text"
            placeholder="Search Surah"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl pl-12 pr-10 py-3 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-gray-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
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
                      ? "bg-[var(--card-active-bg)] border-emerald-900/40"
                      : "bg-[var(--card-bg)] border-transparent hover:border-[#333]"
                  }`}
                >
                  {/* Diamond Index Shape */}
                  <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
                    <div
                      className={`absolute rotate-45 w-8 h-8 rounded-lg transition-colors duration-300 ${
                        isActive
                          ? "bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "bg-[#242424] group-hover:bg-[#2a2a2a]"
                      }`}
                    />
                    <span
                      className={`relative text-xs font-bold ${isActive ? "text-white" : "text-gray-400"}`}
                    >
                      {surah.id}
                    </span>
                  </div>

                  {/* Surah Name Info */}
                  <div className="flex-1">
                    <p
                      className={`text-[15px] font-bold ${isActive ? "text-gray-100" : "text-gray-300"}`}
                    >
                      {surah.transliteration}
                    </p>
                    <p className="text-[12px] text-gray-500 font-medium">
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
  );
}

"use client";
import { SearchIcon, Loader2, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchProps {
  onLocalFilter?: (query: string) => void; 
}

const Search = ({ onLocalFilter }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        try {
         
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${query}`);
          const data = await res.json();
          setResults(data.results || []);
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [query]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onLocalFilter) onLocalFilter(val); 
  };

  return (
    <div className="relative w-fit ">
      <div className="relative group">
        <SearchIcon 
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            loading ? "text-emerald-500 animate-spin" : "text-gray-600 group-focus-within:text-emerald-500"
          }`} 
          size={18} 
        />
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Surah or Ayah (Translation)..."
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl pl-12 pr-10 py-3 text-sm text-gray-300 focus:outline-none focus:border-emerald-900/50 focus:ring-1 focus:ring-emerald-500/10 transition-all placeholder:text-gray-700"
        />

        {query && (
          <button 
            onClick={() => { setQuery(""); if(onLocalFilter) onLocalFilter(""); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* --- Global Ayah Search Results Dropdown --- */}
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#121212] border border-[#2a2a2a] rounded-xl shadow-2xl z-[100] max-h-[400px] overflow-y-auto custom-sidebar-scrollbar">
          <p className="p-3 text-[10px] uppercase font-bold text-gray-600 border-b border-[#1a1a1a]">
            Ayah Results ({results.length})
          </p>
          {results.map((item: any, index) => (
            <button
              key={index}
              onClick={() => {
                router.push(`/surah/${item.surahId}#verse-${item.verseId}`);
                setResults([]);
                setQuery("");
              }}
              className="w-full p-4 text-left hover:bg-[#1a1a1a] border-b border-[#1a1a1a] last:border-0 transition-colors group"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-emerald-500">{item.surahName} {item.surahId}:{item.verseId}</span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-200">
                {item.translation}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
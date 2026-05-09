"use client";
import { SearchIcon, X } from 'lucide-react';
import React from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const SurahSearchbar = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val); 
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative group">
      <SearchIcon 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" 
        size={18} 
      />
      
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Surah..."
        className="w-full bg-[var(--sidebar-bg)] border border-[#2a2a2a] rounded-2xl pl-12 pr-10 py-3 text-sm text-gray-300 focus:outline-none focus:border-emerald-900/50 focus:ring-1 focus:ring-emerald-500/10 transition-all placeholder:text-gray-700"
      />

      {query && (
        <button 
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SurahSearchbar;
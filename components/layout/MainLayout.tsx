"use client";
import React, { useState } from "react";
import SurahSidebar from "../SurahSidebar";
import Header from "../Header";


export default function MainLayout({ 
  children, 
  surahs 
}: { 
  children: React.ReactNode; 
  surahs: any[] 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header>
        {/* হেডার থেকে মেনু ওপেন করার ফাংশন পাঠানো */}
        <Header onOpenMenu={() => setIsMenuOpen(true)} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* সাইডবার রেসপনসিভ লজিকসহ */}
        <SurahSidebar 
          surahs={surahs} 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />

        <main className="flex-1 overflow-y-auto relative bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
}
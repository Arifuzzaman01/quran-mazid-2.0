"use client";
import { Play, Pause, BookOpen, Bookmark, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Tooltip-এর স্টাইল

// Type defining for Verse structure
interface Verse {
  id: number;
  text: string;
  translation: string;
}

export default function VerseCard({
  verse,
  surahId,
}: {
  verse: Verse;
  surahId: string;
}) {
  const { arabicFont, arabicSize, translationSize } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      const paddedSurah = String(surahId).padStart(3, "0");
      const paddedVerse = String(verse.id).padStart(3, "0");
      const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${paddedSurah}${paddedVerse}.mp3`;

      if (!audioRef.current || audioRef.current.src !== audioUrl) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <div
      id={`verse-${verse.id}`}
      className="bg-[var(--card-bg)] p-3 border-b border-primary/20 transition-colors group"
    >
      <div className="flex gap-6 items-start">
        {/* --- Left Icon Sidebar Section (Reference Clone) --- */}
        <div className="flex flex-col items-center gap-3 w-10 shrink-0 pt-1">
          {/* 1. Surah:Verse ID */}
          <span className="text-sm font-medium text-primary mb-1">
            {surahId}:{verse.id}
          </span>

          {/* 2. Audio Button */}
          <button
            onClick={toggleAudio}
            data-tooltip-id={`tooltip-${verse.id}`}
            data-tooltip-content={isPlaying ? "Pause Recitation" : "Play Audio"}
            className="p-2 text-primary hover:text-[var(--sidebar-bg)] hover:bg-gray-800 rounded-lg transition-all"
          >
            {isPlaying ? (
              <Pause size={19} className="text-emerald-500" />
            ) : (
              <Play size={19} />
            )}
          </button>

          {/* 3. Read Button */}
          <button
            data-tooltip-id={`tooltip-${verse.id}`}
            data-tooltip-content="Read Tafsir"
            className="p-2 text-primary hover:text-[var(--sidebar-bg)] hover:bg-gray-800 rounded-lg transition-all"
          >
            <BookOpen size={19} />
          </button>

          {/* 4. Bookmark Button */}
          <button
            data-tooltip-id={`tooltip-${verse.id}`}
            data-tooltip-content="Add to Bookmark"
            className="p-2 text-primary hover:text-[var(--sidebar-bg)] hover:bg-gray-800 rounded-lg transition-all"
          >
            <Bookmark size={19} />
          </button>

          {/* 5. More Button */}
          <button
            data-tooltip-id={`tooltip-${verse.id}`}
            data-tooltip-content="Copy or Share"
            className="p-2 text-primary hover:text-[var(--sidebar-bg)] hover:bg-gray-800 rounded-lg transition-all"
          >
            <MoreHorizontal size={19} />
          </button>
        </div>

        {/* --- Right Content Section --- */}
        <div className="flex-1 space-y-7">
          {/* Arabic Text (Uthmani Font Style from image) */}
          <div className="flex justify-end items-center">
            {/* আয়াত শেষে গোল নম্বরটি আনার জন্য verse.id ব্যবহার করা হয়েছে */}
            <p
              className={`text-right leading-[2.6] text-primary ${arabicFont}`}
              style={{
                fontSize: `${arabicSize}px`,
                direction: "rtl",
                fontFamily: `${arabicFont},`,
              }}
            >
              {verse.text}
              <span className="font-arabic_numerals text-primary mx-2">
                &#xFD3F;
                {verse.id
                  .toString()
                  .split("")
                  .map((d) => String.fromCharCode(d.charCodeAt(0) + 1728))
                  .join("")}
                &#xFD3E;
              </span>
            </p>
          </div>

          {/* Translation Section (Clone pattern) */}
          <div className="space-y-3">
            {/* Translation Source Name */}
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
              Saheeh International
            </p>
            {/* Translation Text (Style matched to image) */}
            <p
              className="text-primary  font-light leading-relaxed max-w-3xl"
              style={{ fontSize: `${translationSize}px` }}
            >
              {verse.translation}
            </p>
          </div>
        </div>
      </div>

      <Tooltip
        id={`tooltip-${verse.id}`}
        place="right"
        className="text-xs bg-gray-900 !px-3 !py-1.5 !rounded-md shadow-2xl z-[9999]"
        style={{ color: "white" }}
      />
    </div>
  );
}

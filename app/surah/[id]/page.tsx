import SurahSidebar from "@/components/SurahSidebar";
import VerseCard from "@/components/VerseCard";

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: (i + 1).toString() }));
}

export default async function SurahDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const surahId = id || "1"
  // console.log("Fetching data for Surah ID:", surahId);
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surah/${surahId}`,{
    next: { revalidate: 3600 } 
  });
  const surah = await res.json();
  // console.log("Fetched Surah Data:", process.env.NEXT_PUBLIC_API_URL, surah);

  return (
    <div className="flex h-full  bg-[var(--bg-main)]">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto py-10 ">
          <div className="text-center  pb-10 border-b border-gray-800">
            <h1 className="text-5xl font-arabic text-emerald-500 mb-4">
              {surah.name}
            </h1>
            <p className="text-xl text-primary">
              {surah.transliteration} - {surah.translation}
            </p>
          </div>

          <div className="border-b border-[#2c2a2a]">
            {surah.verses.map((v: any) => (
              <VerseCard key={v.id} verse={v} surahId={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

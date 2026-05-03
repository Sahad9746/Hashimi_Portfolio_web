import { client } from "@/sanity/lib/client";
import { getProjectsQuery, getGlobalConfigQuery } from "@/sanity/lib/queries";
import WorkArchiveGrid from "@/components/WorkArchiveGrid";
import Link from "next/link";

export const revalidate = 60;

export default async function WorkPage() {
  const [projects, globalConfig] = await Promise.all([
    client.fetch(getProjectsQuery),
    client.fetch(getGlobalConfigQuery),
  ]);

  const fallbackProjects = [
    {
      _id: "demo-1",
      title: "Neon Nights",
      category: "Automotive",
      orientation: "horizontal" as const,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
      thumbnail: null,
    },
    {
      _id: "demo-2",
      title: "Urban Flow",
      category: "Lifestyle",
      orientation: "vertical" as const,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://images.unsplash.com/photo-1511405946472-a37e3b5ccd47?auto=format&fit=crop&q=80&w=800",
      thumbnail: null,
    },
    {
      _id: "demo-3",
      title: "Taste of Luxury",
      category: "Food & Bev",
      orientation: "horizontal" as const,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
      thumbnail: null,
    },
    {
      _id: "demo-4",
      title: "Cinematic Frames",
      category: "Documentary",
      orientation: "vertical" as const,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
      thumbnail: null,
    }
  ];

  // Deep clone to ensure we have plain objects and no hidden prototypes
  const displayProjects = JSON.parse(JSON.stringify(projects?.length > 0 ? projects : fallbackProjects));

  return (
    <main className="bg-[#0a0a0a] min-h-screen pt-32 pb-24">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Navigation / Breadcrumb */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="font-antonio font-light text-[0.9rem] uppercase tracking-[0.4em] text-[#AEA28F]/40 hover:text-[#AEA28F] transition-colors flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
              <path d="M19 12H5m7 7l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-20 md:mb-28">
          <span className="font-antonio font-light text-[1.2rem] uppercase tracking-[0.4em] text-[#7d0c1a] block mb-6">
            Showcase
          </span>
          <h1 className="text-5xl md:text-8xl font-sans font-bold text-white tracking-tighter leading-[0.9] uppercase mb-10">
            Selected<br />
            <span className="text-[#AEA28F]">Visual Works.</span>
          </h1>
          <div className="h-px w-24 bg-[#7d0c1a] mb-8" />
          <p className="text-xl md:text-2xl text-[#AEA28F]/60 max-w-2xl font-light leading-relaxed">
            A comprehensive archive of cinematic storytelling, commercial narratives, and visual explorations crafted over the last six years.
          </p>
        </div>

        {/* The Projects Grid */}
        <WorkArchiveGrid projects={displayProjects} />
      </div>
    </main>
  );
}

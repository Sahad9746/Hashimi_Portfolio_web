"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

interface Reel {
  title: string;
  category?: string;
  videoUrl?: string;
  videoFileUrl?: string;
  thumbnail?: any;
  orientation?: "horizontal" | "vertical";
}

const ReelCard = ({
  title,
  category = "Showcase",
  videoUrl,
  poster,
  orientation = "horizontal",
}: {
  title: string;
  category?: string;
  videoUrl?: string;
  poster?: string;
  orientation?: "horizontal" | "vertical";
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const [isReady, setIsReady] = useState(false);

  const isVertical = orientation === "vertical";

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex-shrink-0 group cursor-none overflow-hidden border-r border-white/10 last:border-r-0 bg-[#111] transition-all duration-500",
        isVertical
          ? "w-[320px] md:w-[400px] aspect-[9/16]"
          : "w-[450px] md:w-[700px] aspect-[16/9]",
      )}
    >
      {/* Fallback Image */}
      {poster && (
        <Image
          src={poster}
          alt={title}
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
        />
      )}

      {/* Video Background */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          autoPlay={false}
          onCanPlay={() => setIsReady(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
            isReady ? "opacity-100" : "opacity-0", 
          )}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#7d0c1a] flex items-center justify-center">
            <Play className="w-3 h-3 text-white fill-white" />
          </div>
          <p className="text-xs uppercase tracking-widest text-[#AEA28F]">{category}</p>
        </div>
        <h3
          className={cn(
            "font-sans font-bold text-white capitalize tracking-tighter leading-none",
            isVertical ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl",
          )}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default function ReelCollection({ projects: sanityProjects }: { projects?: Reel[] }) {
  const horizontalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Fallback data if Sanity is empty
  const projects = sanityProjects?.length ? sanityProjects : [
    {
      title: "Neon Nights",
      category: "Automotive",
      orientation: "horizontal" as const,
      videoUrl: "/assets/linde-event-day01.mp4",
      poster: "/assets/dp1.jpg",
    },
    {
      title: "Urban Flow",
      category: "Lifestyle",
      orientation: "vertical" as const,
      videoUrl: "/assets/linde-event-day01.mp4",
      poster: "/assets/dp2.jpg",
    },
    {
      title: "Taste of Luxury",
      category: "Food & Bev",
      orientation: "horizontal" as const,
      videoUrl: "/assets/linde-event-day01.mp4",
      poster: "/assets/dp3.jpg",
    },
  ];

  return (
    <section
      ref={horizontalRef}
      className="relative h-[120vh] bg-[#111] z-20"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col pt-32">
        <div className="px-6 md:px-12 mb-12">
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#AEA28F] mb-4">REEL COLLECTION</h2>
          <p className="text-[#AEA28F]/60 max-w-md uppercase tracking-widest text-sm">
            A curated selection of our finest frames and cinematic narratives.
          </p>
        </div>

        <motion.div
          style={{ x }}
          className="flex pl-6 md:pl-12 gap-0 w-max items-center h-[65vh]"
        >
          {projects.map((project, idx) => (
            <ReelCard 
              key={idx} 
              title={project.title}
              category={project.category}
              videoUrl={project.videoFileUrl || project.videoUrl}
              poster={project.thumbnail ? urlFor(project.thumbnail).url() : undefined}
              orientation={idx % 2 === 0 ? "horizontal" : "vertical"}
            />
          ))}
          
          {/* View Archive Link */}
          <div className="flex-shrink-0 w-[350px] md:w-[600px] h-full flex flex-col items-center justify-center border-l border-white/10 px-12 text-center group">
             <div className="w-24 h-24 rounded-full border border-[#AEA28F]/30 flex items-center justify-center group-hover:bg-[#AEA28F] group-hover:text-black transition-all duration-500 mb-6">
                <Play className="w-10 h-10 ml-1" />
             </div>
             <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">View Full Archive</h3>
             <p className="text-[#AEA28F]/50 text-sm uppercase tracking-widest">Explore all work</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

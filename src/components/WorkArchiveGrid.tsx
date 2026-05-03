"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface Project {
  _id: string;
  title: string;
  category?: string;
  videoUrl?: string;
  videoFileUrl?: string;
  thumbnail: any;
  poster?: string;
  orientation?: "horizontal" | "vertical";
}

export default function WorkArchiveGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-32">
        {projects.map((project, index) => {
          const isVertical = project.orientation === "vertical";

          return (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid group relative w-full cursor-pointer rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-500"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector("video");
                if (video) video.play();
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector("video");
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
            >
              <div className="relative w-full overflow-hidden bg-neutral-950">
                {(project.thumbnail || project.poster) && (
                  <Image
                    src={project.thumbnail ? urlFor(project.thumbnail).url() : project.poster!}
                    alt={project.title || "Project Image"}
                    width={800}
                    height={isVertical ? 1422 : 450}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    unoptimized={!!project.poster}
                  />
                )}

                {/* Video Preview on Hover */}
                {(project.videoFileUrl || project.videoUrl) && (
                  <video
                    src={project.videoFileUrl || project.videoUrl}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Content Overlay - Styled exactly like Admanics */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 rounded-full backdrop-blur-sm">
                    {project.category || "Project"}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white capitalize leading-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 font-medium">
                  {project.category || "Visual Content"}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Video Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] backdrop-blur-2xl bg-black/90 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <button
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-[#7d0c1a] text-white transition-all duration-300 z-50 group"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                }}
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div 
                className={cn(
                  "relative bg-black shadow-2xl rounded-sm overflow-hidden border border-white/10",
                  selectedProject.orientation === "vertical"
                    ? "h-full max-h-[85vh] aspect-[9/16]"
                    : "w-full max-w-6xl aspect-video"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={selectedProject.videoFileUrl || selectedProject.videoUrl}
                  poster={selectedProject.thumbnail ? urlFor(selectedProject.thumbnail).url() : selectedProject.poster}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
                
                {/* Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent pointer-events-none">
                   <h2 className="text-2xl font-sans font-bold text-white uppercase tracking-tighter">
                     {selectedProject.title}
                   </h2>
                   <p className="text-sm font-antonio font-light text-[#AEA28F]/60 uppercase tracking-widest mt-1">
                     {selectedProject.category}
                   </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

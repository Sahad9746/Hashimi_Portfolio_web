"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  category?: string;
  thumbnail?: any;
  slug?: { current: string };
  orientation?: "horizontal" | "vertical";
}

export default function WorkGrid({ projects }: { projects?: Project[] }) {
  const containerRef = useRef(null);

  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full bg-[#111] py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-antonio font-light text-[1.2rem] uppercase tracking-[0.4em] text-[#AEA28F]/50 block mb-4">
              All Work
            </span>
            <h2 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tighter leading-none">
              SELECTED<br />PROJECTS
            </h2>
          </div>
          <p className="text-[#AEA28F]/60 max-w-sm uppercase tracking-widest text-xs leading-relaxed">
            A comprehensive showcase of cinematic excellence, brand storytelling, and commercial visual narratives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden bg-[#1a1a1a] cursor-pointer",
                idx % 3 === 0 ? "md:col-span-1" : "md:col-span-1"
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {project.thumbnail && (
                  <Image
                    src={urlFor(project.thumbnail).url()}
                    alt={project.title || 'Project thumbnail'}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="pt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight uppercase group-hover:text-[#7d0c1a] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm font-antonio font-light text-[#AEA28F]/60 uppercase tracking-widest mt-2">
                    {project.category || "Film & Production"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

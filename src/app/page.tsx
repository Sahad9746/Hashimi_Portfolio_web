"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import AboutReveal from "@/components/AboutReveal";
import TextFillReveal from "@/components/TextFillReveal";
import ExperienceReveal from "@/components/ExperienceReveal";
import ProjectReveal from "@/components/ProjectReveal";


export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Background Switching Logic
      // When we hit the Experience section, fade from BG1 to BG2
      gsap.to("#bg-hero", {
        scrollTrigger: {
          trigger: "#experience-trigger",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0,
      });

      gsap.to("#bg-experience", {
        scrollTrigger: {
          trigger: "#experience-trigger",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 1,
      });

      // Line separators animation
      gsap.utils.toArray<HTMLElement>(".separator").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.inOut",
        });
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={container} className="w-full bg-[#111] overflow-x-hidden">

      {/* FIXED BACKGROUND STACK */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Background 1: Hero */}
        <div id="bg-hero" className="absolute inset-0 transition-opacity">
          <Image
            src="/assets/dp1.jpg"
            alt="Hero Background"
            fill
            className="object-cover grayscale opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-[#111]/40 mix-blend-multiply" />
        </div>

        {/* Background 2: Experience */}
        <div id="bg-experience" className="absolute inset-0 opacity-0 transition-opacity">
          <Image
            src="/assets/dp2.jpg"
            alt="Experience Background"
            fill
            className="object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-[#111]/40 mix-blend-multiply" />
        </div>
      </div>

      {/* CONTENT LAYERS */}

      {/* Layer 1: Hero Content (Transparent Background) */}
      <div className="relative w-full h-screen z-10 flex flex-col justify-center items-center">
        <MaskContainer
          size={40}
          revealSize={450}
          revealText={
            <div className="flex flex-col items-center justify-center h-full">
              <span className="font-sans text-[1.2rem] uppercase tracking-[0.4em] font-medium text-[#AEA28F] mb-[30px]" style={{ fontVariant: "small-caps" }}>
                HASHMI
              </span>
              <h1 className="text-center font-sans font-bold leading-[0.90] tracking-normal uppercase text-[9.05rem] text-[#AEA28F]">
                MAKING<br />
                <span className="text-[#7d0c1a]">GOOD</span><br />
                <span className="text-[#7d0c1a]">SHIT</span><br />
                SINCE<br />
                2022
              </h1>
              <span className="font-sans text-[0.9rem] uppercase tracking-[0.2em] font-medium text-[#AEA28F]/60 mt-12">
                CINEMATOGRAPHER | EDITOR
              </span>
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="font-sans text-[1.2rem] uppercase tracking-[0.4em] font-medium text-[#AEA28F] mb-[30px]" style={{ fontVariant: "small-caps" }}>
              HASHMI
            </span>
            <h1 className="text-center font-sans font-bold leading-[0.90] tracking-normal uppercase text-[9.05rem] text-black">
              HIDING<br />
              <span className="text-black">BAD</span><br />
              <span className="text-black">SHIT</span><br />
              SINCE<br />
              2022
            </h1>
            <span className="font-sans text-[0.9rem] uppercase tracking-[0.2em] font-medium text-black/60 mt-12">
              CINEMATOGRAPHER | EDITOR
            </span>
          </div>
        </MaskContainer>
      </div>

      {/* Layer 2: Solid Middle Section (Covers Hero BG, revealed Experience BG) */}
      <div className="relative z-20 bg-[#111] w-full pt-20">
        <AboutReveal />

        {/* What I Do Section */}
        <section className="my-16 md:my-24 overflow-hidden w-full">
          <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8 lg:px-16">
            <span className="font-sans text-[1.2rem] uppercase tracking-[0.4em] font-medium text-[#AEA28F]/50 block mb-8">
              What I do
            </span>
          </div>
          <div className="flex flex-col w-full">
            {[
              { title: "CINEMATOGRAPHY", alt: "I SHOOT UNPLANNED CHAOS LIKE IT'S PLANNED AND FIX IT MID-ROLL." },
              { title: "EDITING", alt: "IF 'FIX IT IN POST' WERE A PERSON, THAT WOULD BE ME" },
              { title: "MOTION", alt: "USE FANCY MOTION THAT MAKES MY DESIGN MORE INTERESTING THAT IT ACTUALLY IS" },
            ].map((item, i) => (
              <div key={i} className="relative border-t border-[#AEA28F]/10 w-full last:border-b overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-[#7d0c1a] transition-all duration-500 delay-100 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center pointer-events-none ${
                    hoveredServiceIndex === i ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`}
                />

                <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8 lg:px-16 flex items-center justify-between py-2 md:py-4 relative z-10">
                  <div 
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHoveredServiceIndex(i)}
                    onMouseLeave={() => setHoveredServiceIndex(null)}
                  >
                    <TextFillReveal
                      start="top 90%"
                      end="top 50%"
                      stagger={0.03}
                      darkColor="#333"
                      forceColor={hoveredServiceIndex === i ? "black" : undefined}
                    >
                      <h2 
                        className={`font-sans font-bold leading-[0.85] tracking-tighter uppercase transition-colors duration-300 delay-100 ${
                          hoveredServiceIndex === i ? "text-black" : "text-[#AEA28F]"
                        }`} 
                        style={{ fontSize: "clamp(2rem, 6vw, 6.5rem)" }}
                      >
                        {item.title}
                      </h2>
                    </TextFillReveal>
                  </div>

                  <span 
                    className={`font-sans text-[0.8rem] uppercase tracking-wider max-w-[300px] text-right hidden md:block transition-all duration-300 delay-100 pointer-events-none select-none ${
                      hoveredServiceIndex === i ? "opacity-100 !text-black" : "opacity-0 text-[#AEA28F]/60"
                    }`}
                  >
                    {item.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Transparent bottom edge to reveal next background */}
        <div className="h-[20vh] bg-transparent" />
      </div>

      {/* Layer 3: Experience Content (Transparent Background, reveals BG 2) */}
      <div id="experience-trigger" className="relative z-10 w-full min-h-screen">
        <ExperienceReveal />
      </div>

      {/* NEW LAYER: Project Section */}
      <ProjectReveal />

      {/* Layer 4: Solid Bottom Section (Covers Experience BG) */}
      <div className="relative z-20 bg-[#111] w-full pt-32 pb-48">






        {/* Connect Section (Footer) */}

        <section className="mt-48 pt-16 border-t border-[#AEA28F]/30 separator flex flex-col md:flex-row justify-between items-start gap-16 pb-16 max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16 w-full">
          <div>
            <h2 className="font-sans text-xs md:text-sm uppercase tracking-widest font-medium text-[#AEA28F]/60 mb-16">Connect</h2>
            <h2 className="font-serif text-6xl md:text-8xl tracking-tighter uppercase leading-none hover:text-[#7d0c1a] transition-colors cursor-pointer">
              HELLO@HASHIMI.STUDIO
            </h2>
            <p className="mt-8 font-sans text-sm uppercase tracking-widest opacity-50">+84 366 138 837</p>
          </div>
          <div className="flex flex-col gap-4 font-sans text-xs md:text-sm uppercase tracking-widest">
            {["Dribbble", "YouTube", "LinkedIn", "Instagram"].map((social) => (
              <a key={social} href="#" className="hover:text-[#7d0c1a] transition-colors flex justify-between gap-8 border-b border-[#AEA28F]/20 pb-4">
                <span>{social}</span>
                <span className="opacity-50">Follow me</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

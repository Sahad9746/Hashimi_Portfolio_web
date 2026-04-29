"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  { title: "3D", desc: "Immersive spatial experiences" },
  { title: "Visual", desc: "Brutalist pixel-perfect aesthetics" },
  { title: "Motion", desc: "Breathing life into interfaces" },
  { title: "Product", desc: "Elegant solutions for complex problems" },
  { title: "Tutorial", desc: "Sharing knowledge & digital guides" },
];

export default function InteractiveTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  
  // Physics refs
  const tl = useRef<gsap.core.Tween | null>(null);
  const timeScale = useRef(1);
  const targetTimeScale = useRef(1);
  const previousMouseX = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Desktop Infinite Ticker
    if (trackRef.current) {
      tl.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
    }

    // GSAP Ticker for smooth velocity interpolation
    const update = () => {
      timeScale.current += (targetTimeScale.current - timeScale.current) * 0.1;
      if (tl.current) {
        tl.current.timeScale(timeScale.current);
      }
    };
    gsap.ticker.add(update);

    // Mobile Fade-in on scroll
    if (mobileContainerRef.current) {
      const items = gsap.utils.toArray<HTMLElement>(".mobile-skill-item");
      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }

    return () => {
      gsap.ticker.remove(update);
      if (tl.current) tl.current.kill();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (previousMouseX.current !== null) {
      const deltaX = e.clientX - previousMouseX.current;
      // Map cursor movement to timeline speed (- direction for inverse scrolling)
      const mappedScale = Math.max(-8, Math.min(8, deltaX * -0.15));
      targetTimeScale.current = mappedScale;
    }
    previousMouseX.current = e.clientX;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      targetTimeScale.current = 0; // stop when mouse stops moving
      previousMouseX.current = null;
    }, 100);
  };

  const onMouseEnter = () => {
    targetTimeScale.current = 0; // Pause immediately on hover
  };

  const onMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    previousMouseX.current = null;
    targetTimeScale.current = 1; // Resume normal forward motion
  };

  // Duplicate items twice to ensure seamless infinite looping
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section className="w-full border-y border-[#AEA28F] overflow-hidden bg-[#AEA28F] text-black py-16 md:py-24 my-24">
      
      {/* Mobile: Vertical Stacked List */}
      <div className="md:hidden flex flex-col px-4 gap-12" ref={mobileContainerRef}>
        {skills.map((skill, i) => (
          <div key={i} className="mobile-skill-item flex flex-col border-b border-black/20 pb-8">
            <h2 className="font-serif text-5xl tracking-tighter uppercase mb-4">{skill.title}</h2>
            <p className="font-sans text-sm tracking-widest uppercase opacity-80">{skill.desc}</p>
          </div>
        ))}
      </div>

      {/* Desktop: Horizontal Interactive Ticker */}
      <div 
        className="hidden md:block cursor-ew-resize relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        <div 
          ref={trackRef} 
          className="flex w-max items-start"
        >
          {duplicatedSkills.map((skill, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex items-start px-12 group"
            >
              <div className="flex flex-col mr-16">
                <h2 className="font-serif text-8xl xl:text-9xl tracking-tighter uppercase leading-none transition-colors duration-500 group-hover:text-black/50">
                  {skill.title}
                </h2>
                <p className="mt-6 font-sans text-sm tracking-widest uppercase opacity-80">
                  {skill.desc}
                </p>
              </div>
              {/* Separator */}
              {i !== duplicatedSkills.length - 1 && (
                <div className="h-32 w-[1px] bg-black/30 my-auto ml-auto"></div>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

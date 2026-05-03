"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextFillReveal from "./TextFillReveal";

export default function AboutReveal({ globalConfig }: { globalConfig?: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const xRayRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isWithinSection, setIsWithinSection] = useState(false);

  const rawText = globalConfig?.aboutText || "I'M A CREATIVE WHO THRIVES IN THE *CHAOS* OF PRODUCTION. WHETHER IT'S CAPTURING RAW EMOTION THROUGH A LENS OR STITCHING SCENES TOGETHER IN POST, I DON'T JUST TELL STORIES—I *ENGINEER* THEM.";
  
  // Parse text to identify red words based on asterisks
  const parts = rawText.split('*');

  const revealSize = 450;
  const idleSize = 40;
  const maskSize = isHovered ? revealSize : idleSize;

  // Track mouse using CSS variables
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!xRayRef.current) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xRayRef.current.style.setProperty("--mouse-x", `${x}px`);
      xRayRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // The sweeping text fill effect is now handled completely by the imported <TextFillReveal> component.
  // We only track the mouse here for the x-ray mask effect.

  const altText =
    "I\u2019m a mass-produced designer with zero focus on producing mediocre & forgettable digital disasters.";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#111]"
      onMouseEnter={() => setIsWithinSection(true)}
      onMouseLeave={() => setIsWithinSection(false)}
    >
      {/* Normal Text Layer — Trigger hover here with 5px padding */}
      <div
        ref={textWrapperRef}
        className="relative max-w-[1300px] w-full px-4 md:px-8 lg:px-16"
        style={{ padding: "5px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor-hide="true"
      >
        <span className="font-sans text-[1.2rem] uppercase tracking-[0.4em] font-medium text-[#AEA28F]/50 block mb-6">
          About Me
        </span>
        <TextFillReveal>
          <p
            className="font-sans font-bold leading-[1.05] tracking-tight text-[#AEA28F]"
            style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
          >
            I&apos;m a{" "}
            <span className="text-[#7d0c1a]">selectively skilled</span>{" "}
            product designer with strong focus on producing high quality &amp;
            impactful digital experience.
          </p>
        </TextFillReveal>
      </div>

      {/* X-ray mask layer — CSS variables handle the perfectly centered expansion */}
      <div
        ref={xRayRef}
        className="absolute inset-0 flex items-center justify-center bg-[#7d0c1a] [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [-webkit-mask-image:url(/mask.svg)] [-webkit-mask-repeat:no-repeat]"
        style={{
          visibility: isWithinSection ? "visible" : "hidden",
          opacity: isWithinSection ? 1 : 0,
          WebkitMaskSize: `${maskSize}px`,
          maskSize: `${maskSize}px`,
          WebkitMaskPosition: "calc(var(--mouse-x, -9999px) - var(--mask-size, 0px) / 2) calc(var(--mouse-y, -9999px) - var(--mask-size, 0px) / 2)",
          maskPosition: "calc(var(--mouse-x, -9999px) - var(--mask-size, 0px) / 2) calc(var(--mouse-y, -9999px) - var(--mask-size, 0px) / 2)",
          "--mask-size": `${maskSize}px`,
          transition: "mask-size 0.3s ease-out, -webkit-mask-size 0.3s ease-out, opacity 0.3s ease-out",
          pointerEvents: "none",
        } as any}
      >
        {/* Identical layout structure so alternate text aligns perfectly */}
        <div className="relative max-w-[1300px] w-full px-4 md:px-8 lg:px-16" style={{ padding: "5px" }}>
          <span className="font-sans text-[1.2rem] uppercase tracking-[0.4em] font-medium block mb-6 opacity-0">
            About Me
          </span>
          {/* Ensure the wrapper structure and font sizes match the primary text exactly */}
          <div className="w-full">
            <p 
              className="font-sans font-bold leading-[1.05] tracking-tight text-black"
              style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
            >
              {altText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

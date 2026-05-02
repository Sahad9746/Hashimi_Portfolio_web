"use client";

import { useEffect, useRef, useState } from "react";
import TextFillReveal from "./TextFillReveal";

export default function ExperienceReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const xRayRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isWithinSection, setIsWithinSection] = useState(false);

  const revealSize = 450;
  const idleSize = 40;
  const maskSize = isHovered ? revealSize : idleSize;

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

  const altText =
    "I've spent a minute or two playing with rectangles and convincing people that pixels actually matter.";

  return (
    <div
      ref={sectionRef}
      id="experience-reveal"
      className="relative w-full h-[150vh] flex items-center justify-center pointer-events-none"
      onMouseEnter={() => setIsWithinSection(true)}
      onMouseLeave={() => setIsWithinSection(false)}
    >
      {/* Normal Text Layer — Trigger hover here with 5px padding */}
      <div
        className="relative z-10 max-w-[1300px] w-full px-4 md:px-8 lg:px-16 pointer-events-auto"
        style={{ padding: "5px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor-hide="true"
      >
        <span className="font-sans text-[1.2rem] uppercase tracking-[0.4em] font-medium text-[#AEA28F]/50 block mb-6">
          Experience
        </span>
        <TextFillReveal>
          <p
            className="font-sans font-bold leading-[1.05] tracking-tight text-[#AEA28F]"
            style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
          >
            Over <span className="text-[#7d0c1a]">a decade</span> of experience in interactive design and working with some of the most talented people in the business
          </p>
        </TextFillReveal>
      </div>

      {/* X-ray mask layer */}
      <div
        ref={xRayRef}
        className="absolute inset-0 z-20 flex items-center justify-center bg-[#7d0c1a] [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [-webkit-mask-image:url(/mask.svg)] [-webkit-mask-repeat:no-repeat]"
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
        <div className="relative max-w-[1300px] w-full px-4 md:px-8 lg:px-16">
          <span className="font-sans text-[1.2rem] uppercase tracking-[0.4em] font-medium block mb-6 opacity-0">
            Experience
          </span>
          <p className="text-[2.5rem] md:text-[5rem] lg:text-[6rem] font-sans font-bold leading-[1.05] tracking-tight text-black">
            {altText}
          </p>
        </div>
      </div>
    </div>
  );
}

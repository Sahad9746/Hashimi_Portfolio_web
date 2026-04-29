"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { motion } from "motion/react";

export default function AboutReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const xRayRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const revealSize = 450;
  const maskSize = isHovered ? revealSize : 0;

  // Track mouse using CSS variables to prevent React re-renders and fix the mask center logic
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!xRayRef.current) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Inject mouse coordinates directly into the x-ray container
      xRayRef.current.style.setProperty("--mouse-x", `${x}px`);
      xRayRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll-triggered character-by-character color reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current || !sectionRef.current) return;

    // Split into characters
    const split = new SplitType(textRef.current, {
      types: "chars",
    });

    const chars = split.chars;
    if (!chars) return;

    const ctx = gsap.context(() => {
      // Set all characters to dark grey initially
      chars.forEach((char) => {
        const originalColor = window.getComputedStyle(char).color;
        char.dataset.originalColor = originalColor;
        gsap.set(char, { color: "#333" });
      });

      // Snap to original color letter-by-letter as you scroll
      gsap.to(chars, {
        color: (i: number, target: HTMLElement) => target.dataset.originalColor || "#AEA28F",
        ease: "steps(1)", // Instant snap per character
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Starts lighting up as the section enters
          end: "center center", // Finishes EXACTLY when the text is in the center of the window
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  const altText =
    "I\u2019m a mass-produced designer with zero focus on producing mediocre & forgettable digital disasters.";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#111]"
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
        <span className="font-sans text-xs uppercase tracking-[0.4em] font-medium text-[#AEA28F]/50 block mb-6">
          About Me
        </span>
        <p
          ref={textRef}
          className="text-[2.5rem] md:text-[5rem] lg:text-[6rem] font-sans font-bold leading-[1.05] tracking-tight text-[#AEA28F]"
        >
          I&apos;m a{" "}
          <span className="text-[#E8572A]">selectively skilled</span>{" "}
          product designer with strong focus on producing high quality &amp;
          impactful digital experience.
        </p>
      </div>

      {/* X-ray mask layer — CSS variables handle the perfectly centered expansion */}
      <motion.div
        ref={xRayRef}
        className="absolute inset-0 flex items-center justify-center bg-[#7d0c1a] [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [-webkit-mask-image:url(/mask.svg)] [-webkit-mask-repeat:no-repeat]"
        initial={{ "--mask-size": "0px" } as any}
        animate={{ "--mask-size": `${maskSize}px` } as any}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          WebkitMaskSize: "var(--mask-size)",
          maskSize: "var(--mask-size)",
          // calc() ensures the top-left offset is always dynamically half the current size
          WebkitMaskPosition: "calc(var(--mouse-x, 0px) - var(--mask-size) / 2) calc(var(--mouse-y, 0px) - var(--mask-size) / 2)",
          maskPosition: "calc(var(--mouse-x, 0px) - var(--mask-size) / 2) calc(var(--mouse-y, 0px) - var(--mask-size) / 2)",
          pointerEvents: "none",
        } as any}
      >
        {/* Identical layout structure so alternate text aligns perfectly */}
        <div className="relative max-w-[1300px] w-full px-4 md:px-8 lg:px-16" style={{ padding: "5px" }}>
          <span className="font-sans text-xs uppercase tracking-[0.4em] font-medium block mb-6 opacity-0">
            About Me
          </span>
          <p className="text-[2.5rem] md:text-[5rem] lg:text-[6rem] font-sans font-bold leading-[1.05] tracking-tight text-black">
            {altText}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

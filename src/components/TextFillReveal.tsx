"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

interface TextFillRevealProps {
  children: React.ReactNode;
  className?: string;
  start?: string;
  end?: string;
  darkColor?: string;
  stagger?: number;
  forceColor?: string;
}

export default function TextFillReveal({ 
  children, 
  className,
  start = "top 80%",
  end = "center 40%",
  darkColor = "#333",
  stagger = 0.1,
  forceColor
}: TextFillRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !textRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    let split: SplitType | null = null;
    try {
      // Split text into individual characters while preserving nested DOM structures
      split = new SplitType(textRef.current, {
        types: "chars",
      });
    } catch (e) {
      console.error("SplitType failed:", e);
      return;
    }

    const chars = split.chars;
    if (!chars || chars.length === 0) return;

    const ctx = gsap.context(() => {
      // Set up the sweeping fill effect for each character
      chars.forEach((char) => {
        // Capture original color (works for multi-colored text!)
        const originalColor = window.getComputedStyle(char).color;
        
        char.style.setProperty("--char-color", originalColor);
        char.style.setProperty("--fill", "0%");
        
        // Use a CSS variable for the reveal color so it can be updated on hover from outside
        char.style.backgroundImage = forceColor ? "none" : `linear-gradient(to right, var(--text-fill-color, var(--char-color)) var(--fill), var(--text-reveal-dark, ${darkColor}) var(--fill))`;
        char.style.webkitBackgroundClip = forceColor ? "none" : "text";
        char.style.backgroundClip = forceColor ? "none" : "text";
        char.style.color = forceColor || "transparent";

        // Add a tiny bit of padding bottom to ensure descenders aren't clipped
        char.style.paddingBottom = "0.1em";
      });

      // Animate the --fill percentage
      gsap.to(chars, {
        "--fill": "100%",
        ease: "none", 
        stagger: stagger, 
        duration: stagger,
        scrollTrigger: {
          trigger: textRef.current,
          start: start, 
          end: end,
          scrub: 1,
        },
      });
    }, textRef);

    return () => {
      ctx.revert();
      if (split) split.revert();
    };
  }, [isMounted, start, end, darkColor, stagger, forceColor]);

  return (
    <div ref={textRef} className={cn("", className)}>
      {children}
    </div>
  );
}

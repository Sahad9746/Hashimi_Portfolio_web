"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Re-enable scrolling after exit
        document.body.style.overflow = "";
        // Hide the element completely from DOM layout
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    });

    // Counter animation
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: "power4.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          const formatted = Math.floor(counter.value).toString().padStart(2, "0");
          counterRef.current.textContent = `${formatted}%`;
        }
      },
    })
    // Slide up exit animation
    .to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "power3.inOut",
      },
      "+=0.2" // slight pause at 100% before wiping
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111] text-[#AEA28F]"
    >
      <div className="flex flex-col items-center mt-[-10vh]">
        <span className="mb-4 text-xs font-sans tracking-[0.4em] uppercase text-[#AEA28F]/60">
          Start
        </span>
        <span
          ref={counterRef}
          className="text-[80px] font-serif font-bold leading-none tracking-tighter"
        >
          00%
        </span>
      </div>
    </div>
  );
}

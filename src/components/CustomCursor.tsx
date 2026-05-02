"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Disable custom cursor completely on Sanity Studio route
  if (pathname?.startsWith("/studio")) return null;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Centered tracking setup
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-hide]")) {
        gsap.to(cursor, { width: 0, height: 0, duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(cursor, { width: 50, height: 50, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[50px] h-[50px] bg-[#7d0c1a] pointer-events-none z-[9999] overflow-hidden"
      style={{ borderRadius: "50%" }}
    />
  );
}

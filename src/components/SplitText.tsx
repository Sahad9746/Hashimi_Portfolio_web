"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { cn } from "@/lib/utils";

export default function SplitText({
  text,
  className,
  as: Component = "p",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: any;
  delay?: number;
}) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "lines,words,chars" });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
      },
      y: 100,
      opacity: 0,
      rotateZ: 5,
      duration: 0.8,
      stagger: 0.02,
      ease: "power3.out",
      delay: delay,
    });

    return () => {
      split.revert();
    };
  }, [delay]);

  return (
    <Component ref={textRef} className={cn("m-0 leading-tight", className)}>
      {text}
    </Component>
  );
}

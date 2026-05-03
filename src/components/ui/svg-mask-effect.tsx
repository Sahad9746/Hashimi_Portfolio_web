"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 0,
  revealSize = 450,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  const updateMousePosition = (e: MouseEvent) => {
    if (!maskRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    maskRef.current.style.setProperty("--mouse-x", `${x}px`);
    maskRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener("mousemove", updateMousePosition);
    return () => {
      container.removeEventListener("mousemove", updateMousePosition);
    };
  }, [isHovered]); // Added dependency to match browser expectation and prevent size mismatch
  
  let maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative w-full h-full", className)}
    >
      {/* Background/Idle text */}
      <div className="flex h-full w-full items-center justify-center">
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor-hide="true"
          className="w-fit h-fit"
        >
          {revealText}
        </div>
      </div>

      {/* Masked revealed text */}
      <div
        ref={maskRef}
        className="absolute inset-0 flex h-full w-full items-center justify-center bg-[#7d0c1a] [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [-webkit-mask-image:url(/mask.svg)] [-webkit-mask-repeat:no-repeat]"
        style={{
          visibility: isHovered ? "visible" : "hidden",
          WebkitMaskSize: `${maskSize}px`,
          maskSize: `${maskSize}px`,
          WebkitMaskPosition: "calc(var(--mouse-x, -9999px) - var(--mask-size, 0px) / 2) calc(var(--mouse-y, -9999px) - var(--mask-size, 0px) / 2)",
          maskPosition: "calc(var(--mouse-x, -9999px) - var(--mask-size, 0px) / 2) calc(var(--mouse-y, -9999px) - var(--mask-size, 0px) / 2)",
          "--mask-size": `${maskSize}px`,
          transition: "mask-size 0.3s ease-out, -webkit-mask-size 0.3s ease-out",
          pointerEvents: "none"
        } as any}
      >
        <div className="relative z-20 flex w-full h-full items-center justify-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

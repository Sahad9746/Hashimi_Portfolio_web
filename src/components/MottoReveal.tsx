"use client";

import { useRef } from "react";
import TextFillReveal from "./TextFillReveal";

export default function MottoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      id="motto-reveal"
      className="relative w-full h-[50vh] flex flex-col items-center justify-center pointer-events-none"
    >
      <div
        className="relative z-10 max-w-[1300px] w-full px-4 md:px-8 lg:px-16 pointer-events-auto flex flex-col items-center justify-center text-center"
      >
        <span className="font-sans text-[1.2rem] uppercase font-medium text-[#AEA28F]/50 block mb-2 md:mb-4 tracking-normal">
          MY MOTTO
        </span>
        
        <TextFillReveal>
          <p
            className="text-[3rem] md:text-[6rem] lg:text-[7.5rem] font-sans font-bold leading-[1.0] tracking-tighter text-[#AEA28F] uppercase"
          >
            FILM IS A<br />
            BATTLEGROUND
          </p>
        </TextFillReveal>

        <span className="font-sans text-[1.2rem] uppercase font-medium text-[#AEA28F]/50 block mt-4 md:mt-6 tracking-normal">
          SAM FULLER
        </span>
      </div>
    </div>
  );
}

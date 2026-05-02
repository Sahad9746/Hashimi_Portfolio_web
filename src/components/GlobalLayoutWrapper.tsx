"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import CustomCursor from "./CustomCursor";
import { cn } from "@/lib/utils";

export default function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isStudio = pathname?.startsWith("/studio");

  if (!hasMounted) return <>{children}</>;
  if (isStudio) return <>{children}</>;

  return (
    <div className={cn(!isStudio && "cursor-none")}>
      <CustomCursor />
      {/* Navigation positioned via vh */}
      <nav 
        className="fixed left-0 w-full z-50 bg-transparent px-4 md:px-8 flex items-start justify-between pointer-events-auto text-[#AEA28F]"
        style={{ top: "6.5476190476vh" }}
      >
        {/* Logo Mark */}
        <div className="relative z-50 flex items-center">
          <a href="#" aria-label="Home" className="block">
            <Image 
              src="/assets/tube-logo.png" 
              alt="Tube Logo" 
              width={120} 
              height={40} 
              className="w-auto h-10 object-contain"
              priority
            />
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="flex flex-col items-end gap-3 z-50 text-right">
          {["About", "Work", "Contact"].map((title) => (
            <a 
              key={title}
              href={`#${title.toLowerCase()}`} 
              className="group relative overflow-hidden block uppercase tracking-[0.25em] leading-[0.96] text-base font-sans font-medium"
            >
              <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                <span className="block">{title}</span>
                <span className="block absolute top-full right-0" aria-hidden="true">{title}</span>
              </div>
            </a>
          ))}
        </div>
      </nav>

      {/* Left Social Links */}
      <div className="fixed left-4 md:left-8 bottom-8 z-50 flex flex-col items-center gap-4 text-[#AEA28F]/50 pointer-events-auto">
        {/* Instagram */}
        <a href="#" className="w-8 h-8 rounded-full border border-[#AEA28F]/30 flex items-center justify-center hover:text-[#AEA28F] hover:border-[#AEA28F] transition-all" aria-label="Instagram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        
        {/* Email */}
        <a href="mailto:hello@hashmi.com" className="w-8 h-8 rounded-full border border-[#AEA28F]/30 flex items-center justify-center hover:text-[#AEA28F] hover:border-[#AEA28F] transition-all" aria-label="Email">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>

        {/* WhatsApp */}
        <a href="#" className="w-8 h-8 rounded-full border border-[#AEA28F]/30 flex items-center justify-center hover:text-[#AEA28F] hover:border-[#AEA28F] transition-all" aria-label="WhatsApp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" className="w-8 h-8 rounded-full border border-[#AEA28F]/30 flex items-center justify-center hover:text-[#AEA28F] hover:border-[#AEA28F] transition-all" aria-label="LinkedIn">
          <span className="font-sans font-bold text-[10px] leading-none">in</span>
        </a>
      </div>

      {children}
    </div>
  );
}

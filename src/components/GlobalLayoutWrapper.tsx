"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomCursor from "./CustomCursor";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    
    // Register scroll triggers for nav highlighting
    // Use the actual order on the page: hero -> about -> work -> contact
    const sections = ["hero", "about", "work", "contact"];
    const triggers: any[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(id === "hero" ? "" : id);
          }
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach(t => t.kill());
  }, [hasMounted]);

  const isStudio = pathname?.startsWith("/studio");

  if (!hasMounted) return <>{children}</>;
  if (isStudio) return <>{children}</>;

  return (
    <div>
      <CustomCursor />
      
      {/* Navigation - Container is pointer-events-none so it doesn't block the page */}
      <nav 
        className="fixed left-0 w-full z-[100] bg-transparent pointer-events-none px-4 md:px-8 lg:px-16" 
        style={{ top: "6.5476190476vh" }}
      >
        {/* Logo Mark - pointer-events-auto to enable clicking */}
        <div data-cursor-hide className="relative z-[101] flex items-center pointer-events-auto inline-block w-fit">
          <Link href="/" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
            <Image 
              src="/assets/tube-logo.png" 
              alt="Tube Logo" 
              width={160} 
              height={160} 
              className="object-contain w-auto h-16 md:h-20"
              priority
            />
          </Link>
        </div>

        {/* Vertical Desktop Nav - pointer-events-auto to enable clicking */}
        <div 
          data-cursor-hide
          className="hidden md:flex absolute top-0 right-4 md:right-8 lg:right-16 flex-col items-end gap-3 z-[101] text-right pointer-events-auto"
        >
          {["Work", "About", "Contact"].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => {
                  const target = document.getElementById(item.toLowerCase());
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group relative overflow-hidden block uppercase tracking-[0.25em] leading-[0.96] text-[0.8rem] font-sans font-medium text-[#AEA28F] cursor-pointer outline-none"
              >
                <div className={cn(
                  "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full",
                  isActive && "-translate-y-full"
                )}>
                  <span className="block">{item}</span>
                  <span className="block absolute top-full right-0 text-[#7d0c1a]" aria-hidden="true">{item}</span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Social Links - pointer-events-auto to enable clicking */}
      <div 
        data-cursor-hide 
        className="fixed bottom-[6.349206349vh] left-4 md:left-8 lg:left-16 z-[100] flex flex-col gap-5 pointer-events-auto"
      >
        {[
          { icon: "Instagram", label: "IG" },
          { icon: "LinkedIn", label: "LI" },
          { icon: "WhatsApp", label: "WA" },
          { icon: "Phone", label: "PH" }
        ].map((s, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[#AEA28F] hover:text-[#7d0c1a] transition-all transform hover:scale-125"
            aria-label={s.icon}
          >
            {s.icon === "Instagram" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            )}
            {s.icon === "LinkedIn" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            )}
            {s.icon === "WhatsApp" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            )}
            {s.icon === "Phone" && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            )}
          </a>
        ))}
      </div>

      {children}
    </div>
  );
}

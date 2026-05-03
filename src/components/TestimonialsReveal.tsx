"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TextFillReveal from "./TextFillReveal";

export default function TestimonialsReveal({ testimonials: sanityTestimonials }: { testimonials?: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsStartRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCircles, setShowCircles] = useState(false);
  const xRayRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isWithinTestimonialSection, setIsWithinTestimonialSection] = useState(false);
  const [maskCenter, setMaskCenter] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback if DB is empty
  const testimonials = sanityTestimonials?.length ? sanityTestimonials : [
    {
      quote: "Tube is seriously the best and he never complains. Every frame he delivers is intentional, every edit feels alive.",
      name: "SARAH CHEN",
      designation: "CREATIVE DIRECTOR",
      company: "STUDIO NOIR",
      avatarUrl: "/assets/dp1.jpg",
    },
    {
      quote: "Working with Tube changed how I think about visual storytelling. He doesn't just shoot — he sculpts light.",
      name: "JAMES OKAFOR",
      designation: "FOUNDER",
      company: "OKAFOR FILMS",
      avatarUrl: "/assets/dp2.jpg",
    },
    {
      quote: "The motion work he delivered was beyond what we imagined. Clients keep asking who made it. The answer is always Tube.",
      name: "PRIYA MEHTA",
      designation: "HEAD OF CONTENT",
      company: "WAVELENGTH MEDIA",
      avatarUrl: "/assets/dp3.jpg",
    },
  ];

  const revealSize = 450;
  const idleSize = 40;
  const maskSize = isHovered ? revealSize : idleSize;

  // Track mouse using CSS variables
  useEffect(() => {
    if (!isMounted) return;
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!xRayRef.current) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Always update mouse position for tracking
      xRayRef.current.style.setProperty("--mouse-x", `${x}px`);
      xRayRef.current.style.setProperty("--mouse-y", `${y}px`);
      
      // Lock the center when not hovered (so expansion happens from this point)
      if (!isHovered) {
        setMaskCenter({ x, y });
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, isMounted]);

  const getAltQuote = (index: number) => {
    const altQuotes = [
      "Tube is a wizard, but don't tell him I said that or he'll charge more.",
      "He actually spent 3 hours debating a single frame. It was worth it.",
      "We tried to find someone cheaper, but we came crawling back. Help."
    ];
    return altQuotes[index % altQuotes.length];
  };

  useEffect(() => {
    if (!isMounted) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Show circles when testimonials section is in view
      if (testimonialsStartRef.current) {
        ScrollTrigger.create({
          trigger: testimonialsStartRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setShowCircles(true),
          onLeave: () => setShowCircles(false),
          onEnterBack: () => setShowCircles(true),
          onLeaveBack: () => setShowCircles(false),
        });
      }

      // Track active testimonial
      testimonials.forEach((_, i) => {
        const el = document.querySelector(`[data-testimonial="${i}"]`);
        if (!el) return;
        
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // Section label entrance
      gsap.from(".testimonials-label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        opacity: 0,
        y: 12,
        duration: 0.8,
        ease: "power3.out",
      });

      // Per-testimonial entrance animations
      gsap.utils.toArray<HTMLElement>("[data-testimonial]").forEach((el) => {
        gsap.from(el.querySelector(".quote-text"), {
          scrollTrigger: { trigger: el, start: "top 80%" },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
        });
        
        gsap.from(el.querySelector(".quote-meta"), {
          scrollTrigger: { trigger: el, start: "top 75%" },
          opacity: 0,
          y: 20,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) {
    return (
      <section ref={sectionRef} className="relative w-full bg-[#111] z-20 overflow-hidden min-h-screen">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16 w-full" style={{ paddingTop: "14.880952381vh" }}>
           <span className="font-sans text-[0.75rem] uppercase tracking-[0.4em] font-medium text-[#AEA28F]/50 block mb-8">
              What They Said
           </span>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#111] z-20 overflow-hidden"
      onMouseEnter={() => setIsWithinTestimonialSection(true)}
      onMouseLeave={() => setIsWithinTestimonialSection(false)}
    >
      {/* Fixed circles - always centered in viewport */}
      <div
        className={`hidden md:flex fixed top-1/2 -translate-y-1/2 right-16 z-30 flex-col items-center transition-opacity duration-500 ${
          showCircles ? "opacity-100" : "opacity-0"
        }`}
        style={{ gap: "20px" }}
      >
        {/* Arrow indicator */}
        <div
          className="absolute -left-7 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            top: (() => {
              let offset = 0;
              for (let j = 0; j < activeIndex; j++) {
                offset += 64 + 20;
              }
              offset += 80 / 2 - 8;
              return `${offset}px`;
            })(),
          }}
          aria-hidden="true"
        >
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M12 8L0 0.5V15.5L12 8Z" fill="#7d0c1a" />
          </svg>
        </div>

        {testimonials.map((t, i) => {
          const isActive = activeIndex === i;
          const size = isActive ? 80 : 64;
          
          return (
            <div
              key={i}
              className="relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                opacity: isActive ? 1 : 0.3,
                flexShrink: 0,
              }}
            >
              <Image
                src={t.avatarUrl}
                alt={t.name}
                fill
                className="object-cover"
                sizes="100px"
              />
              {!isActive && <div className="absolute inset-0 bg-[#111]/60" />}
            </div>
          );
        })}
      </div>

      <div 
        className="relative z-10"
        data-cursor-hide="true"
      >
        {/* Section label */}
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16 w-full" style={{ paddingTop: "14.880952381vh" }}>
          <div className="separator">
            <span className="testimonials-label font-sans text-[0.75rem] uppercase tracking-[0.4em] font-medium text-[#AEA28F]/50 block mb-8">
              What They Said
            </span>
            <div className="w-full h-px bg-[#AEA28F]/20" />
          </div>
        </div>

        <div 
          ref={testimonialsStartRef} 
          className="max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16 w-full"
        >
          <div 
            className="w-full md:w-[70%] lg:w-[65%]"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-testimonial={i}
                className="min-h-screen flex items-center"
                style={{ 
                  paddingTop: "14.880952381vh",
                  paddingBottom: "14.880952381vh"
                }}
              >
                <div className="w-full">
                  <div 
                    className="quote-text flex items-start gap-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span
                      className="font-sans font-bold text-[#7d0c1a] leading-none select-none flex-shrink-0"
                      style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginTop: "-0.1em" }}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    
                    <TextFillReveal
                      start="top 95%"
                      end="top 60%"
                      stagger={0.02}
                      darkColor="#333"
                    >
                      <h3
                        className="font-sans font-bold text-[#AEA28F] leading-[1.05] tracking-tight"
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4.75rem)" }}
                      >
                        {t.quote}
                      </h3>
                    </TextFillReveal>
                  </div>

                  <div className="quote-meta flex flex-col gap-1" style={{ marginTop: "14.880952381vh" }}>
                    <span className="font-sans text-[0.8rem] uppercase tracking-[0.25em] text-[#AEA28F] font-medium">
                      {t.name}
                    </span>
                    <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-[#AEA28F]/50">
                      {t.designation}
                    </span>
                    <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-[#AEA28F]/30">
                      {t.company}
                    </span>
                  </div>

                  <div className="h-px bg-[#AEA28F]/15 w-full" style={{ marginTop: "14.880952381vh" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* X-ray Mask Layer (Reveals Alternative Truths) */}
      <div
        ref={xRayRef}
        className="absolute inset-0 z-[25] bg-[#7d0c1a] [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [-webkit-mask-image:url(/mask.svg)] [-webkit-mask-repeat:no-repeat]"
        style={{
          visibility: isWithinTestimonialSection ? "visible" : "hidden",
          opacity: isWithinTestimonialSection ? 1 : 0,
          WebkitMaskSize: `${maskSize}px`,
          maskSize: `${maskSize}px`,
          WebkitMaskPosition: "calc(var(--mouse-x, -9999px) - var(--mask-size, 0px) / 2) calc(var(--mouse-y, -9999px) - var(--mask-size, 0px) / 2)",
          maskPosition: "calc(var(--mouse-x, -9999px) - var(--mask-size, 0px) / 2) calc(var(--mouse-y, -9999px) - var(--mask-size, 0px) / 2)",
          "--mask-size": `${maskSize}px`,
          transition: "mask-size 0.3s ease-out, -webkit-mask-size 0.3s ease-out, opacity 0.3s ease-out",
          pointerEvents: "none",
        } as any}
      >
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16 w-full" style={{ paddingTop: "14.880952381vh" }}>
          <div className="separator opacity-0">
            <span className="font-sans text-[0.75rem] uppercase tracking-[0.4em] font-medium block mb-8">
              What They Said
            </span>
            <div className="w-full h-px bg-[#AEA28F]/20" />
          </div>
        </div>

        <div className="max-w-[1300px] mx-auto px-4 md:px-8 lg:px-16 w-full">
          <div className="w-full md:w-[70%] lg:w-[65%]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-h-screen flex items-center"
                style={{ 
                  paddingTop: "14.880952381vh",
                  paddingBottom: "14.880952381vh"
                }}
              >
                <div className="w-full">
                  <div className="flex items-start gap-2">
                    <span
                      className="font-sans font-bold text-black leading-none select-none flex-shrink-0"
                      style={{ fontSize: "clamp(3rem, 6vw, 5rem)", marginTop: "-0.1em" }}
                    >
                      &ldquo;
                    </span>
                    <h3
                      className="font-sans font-bold text-black leading-[1.05] tracking-tight"
                      style={{ fontSize: "clamp(2.5rem, 5vw, 4.75rem)" }}
                    >
                      {getAltQuote(i)}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 opacity-0" style={{ marginTop: "14.880952381vh" }}>
                    <span className="font-sans text-[0.8rem] uppercase tracking-[0.25em] font-medium">
                      {t.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-24" />
    </section>
  );
}

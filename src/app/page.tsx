"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";
import Image from "next/image";
import SplitType from "split-type";
import InteractiveTicker from "@/components/InteractiveTicker";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import AboutReveal from "@/components/AboutReveal";

const projects = [
  { title: "ARCHETYPES", category: "BRAND IDENTITY", year: "2024", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
  { title: "MONOLITH", category: "WEB DESIGN", year: "2024", img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop" },
  { title: "SYSTEMS", category: "EDITORIAL", year: "2023", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" }
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image reveal animations
      gsap.utils.toArray<HTMLElement>(".project-image-wrapper").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          scale: 1.1,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      // Line separators
      gsap.utils.toArray<HTMLElement>(".separator").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.inOut",
        });
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={container} className="w-full bg-[#111] px-4 md:px-8 overflow-hidden">

      {/* Hero Section */}
      <section className="sticky top-0 z-0 w-full h-screen py-[184px] flex flex-col justify-center items-center overflow-hidden bg-[#111]">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            src="https://cdn.pixabay.com/video/2023/10/22/185966-876724391_large.mp4"
          />
          <div className="absolute inset-0 bg-[#111]/40 mix-blend-multiply" />
        </div>

        {/* Mask Effect Heading */}
        <div className="absolute inset-0 z-10">
          <MaskContainer
            revealSize={350}
            revealText={
              <div className="flex flex-col items-center">
                <span className="font-sans text-xs uppercase tracking-[0.4em] font-medium text-[#AEA28F] mb-[30px]" style={{ fontVariant: "small-caps" }}>
                  Hashim
                </span>
                <h1 className="text-center font-sans font-bold leading-[0.90] tracking-normal uppercase text-[9.05rem] text-[#AEA28F]">
                  MAKING<br />
                  <span className="text-[#7d0c1a]">GOOD</span><br />
                  <span className="text-[#7d0c1a]">SHIT</span><br />
                  SINCE<br />
                  2009
                </h1>
              </div>
            }
          >
            {/* What is revealed inside the mask */}
            <div className="flex flex-col items-center">
              <span className="font-sans text-xs uppercase tracking-[0.4em] font-medium text-[#AEA28F] mb-[30px]" style={{ fontVariant: "small-caps" }}>
                Hashim
              </span>
              <h1 className="text-center font-sans font-bold leading-[0.90] tracking-normal uppercase text-[9.05rem] text-black">
                HIDING<br />
                BAD<br />
                SHIT<br />
                SINCE<br />
                2009
              </h1>
            </div>
          </MaskContainer>
        </div>

      </section>

      {/* Body Content that scrolls over the Hero */}
      <div className="relative z-10 bg-[#111] w-full">

      {/* About Section — scroll-reveal text */}
      <AboutReveal />

      {/* Interactive Skills Ticker Section */}
      <div className="-mx-4 md:-mx-8">
        <InteractiveTicker />
      </div>

      {/* Experience / History Section */}
      <section className="my-32 md:my-48">
        <div className="flex justify-between items-end border-b border-[#AEA28F]/30 pb-4 mb-16 separator px-4 md:px-8">
          <h2 className="font-sans text-xs md:text-sm uppercase tracking-widest font-medium text-[#AEA28F]/60">Experience</h2>
          <span className="font-sans text-xs md:text-sm uppercase tracking-widest font-medium text-[#AEA28F]/60">History</span>
        </div>

        <div className="flex flex-col">
          {[
            { role: "Self-lead Designer", company: "Fantasy Interactive" },
            { role: "Senior Product Designer", company: "Interactive Labs" },
            { role: "Art Director", company: "DR Com Group" },
            { role: "Photoshop Doodler", company: "DR Com Group" },
            { role: "Jurassic Designer", company: "DR Com Group" },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative flex flex-col md:flex-row md:items-center justify-between border-b border-[#AEA28F]/20 py-8 md:py-12 px-4 md:px-8 hover:bg-[#AEA28F] hover:text-[#111] transition-colors duration-500 cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex flex-col">
                <h3 className="font-serif text-4xl md:text-6xl tracking-tight leading-none mb-2 md:mb-0 transition-transform duration-500 group-hover:translate-x-4">
                  {item.role}
                </h3>
              </div>
              <div className="relative z-10 font-sans text-sm md:text-base tracking-widest uppercase opacity-70 mt-4 md:mt-0 transition-transform duration-500 group-hover:-translate-x-4 font-medium">
                {item.company}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section className="my-48 px-4 md:px-8">
        <div className="flex justify-between items-end border-b border-[#AEA28F]/30 pb-4 mb-16 separator">
          <h2 className="font-sans text-xs md:text-sm uppercase tracking-widest font-medium text-[#AEA28F]/60">Clients</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-16">
          {[
            { client: "Ford", desc: "Working on the Next-Generation HMI Experience without no driving experience." },
            { client: "UFC", desc: "Developed the Future of UFC Sports Ecosystem despite not being a sports fan." },
            { client: "Lincoln", desc: "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life." },
            { client: "Royal Caribbean", desc: "I was just one person on a massive team that created an entire Royal Caribbean eco-system." },
            { client: "SleepiQ", desc: "Designed a 1M+ users product utilizing my best personal experience: sleeping." },
            { client: "NFL", desc: "Explored the Future of Fantasy Football while being in a country where football means a total different sport." },
          ].map((item, i) => (
            <div key={i} className="flex flex-col group cursor-pointer">
              <h3 className="font-serif text-5xl md:text-7xl tracking-tighter uppercase transition-colors duration-500 group-hover:text-[#7d0c1a]">
                {item.client}
              </h3>
              <p className="mt-8 font-sans text-base max-w-sm leading-relaxed text-[#AEA28F]/70 group-hover:text-[#AEA28F] transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-48 px-4 md:px-8">
        <div className="flex justify-between items-end border-b border-[#AEA28F]/30 pb-4 mb-16 separator">
          <h2 className="font-sans text-xs md:text-sm uppercase tracking-widest font-medium text-[#AEA28F]/60">What They Said</h2>
        </div>

        <div className="flex flex-col gap-32">
          {[
            { quote: "He's terrible, but it's his birthday so I'd say something nice.", name: "Michael Glass", title: "Group Design Director", company: "Fantasy Interactive" },
            { quote: "After countless rounds of feedback, you finally did it right.", name: "Peter Smart", title: "Head of Product", company: "Fantasy Interactive" },
            { quote: "I'm his wife, he made me say that.", name: "Linh Le", title: "Project Manager", company: "Interactive Labs" },
          ].map((testimonial, i) => (
            <div key={i} className="flex flex-col max-w-4xl mx-auto text-center items-center">
              <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-12">
                &ldquo;{testimonial.quote}&rdquo;
              </h3>
              <div className="font-sans flex flex-col text-sm uppercase tracking-widest opacity-70">
                <span className="font-bold mb-2">{testimonial.name}</span>
                <span>{testimonial.title}</span>
                <span>{testimonial.company}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motto */}
      <section className="my-48 flex justify-center text-center px-4 md:px-8">
        <div className="flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.4em] mb-12 opacity-50">My Motto</span>
          <h2 className="font-serif text-6xl md:text-9xl tracking-tighter uppercase leading-[0.9]">
            Not ALL<br />
            <span className="text-[#7d0c1a]">honest</span> design<br />
            is good
          </h2>
          <span className="font-sans mt-8 text-sm uppercase tracking-widest opacity-50">— Hashim</span>
        </div>
      </section>

      {/* Connect Section */}
      <section className="mt-48 pt-16 border-t border-[#AEA28F]/30 separator flex flex-col md:flex-row justify-between items-start gap-16 px-4 md:px-8 pb-16">
        <div>
          <h2 className="font-sans text-xs md:text-sm uppercase tracking-widest font-medium text-[#AEA28F]/60 mb-16">Connect</h2>
          <h2 className="font-serif text-6xl md:text-8xl tracking-tighter uppercase leading-none hover:text-[#7d0c1a] transition-colors cursor-pointer">
            HELLO@HASHIMI.STUDIO
          </h2>
          <p className="mt-8 font-sans text-sm uppercase tracking-widest opacity-50">+84 366 138 837</p>
        </div>
        <div className="flex flex-col gap-4 font-sans text-xs md:text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-[#7d0c1a] transition-colors flex justify-between gap-8 border-b border-[#AEA28F]/20 pb-4">
            <span>Dribbble</span>
            <span className="opacity-50">Fake works</span>
          </a>
          <a href="#" className="hover:text-[#7d0c1a] transition-colors flex justify-between gap-8 border-b border-[#AEA28F]/20 pb-4">
            <span>YouTube</span>
            <span className="opacity-50">Random tutorials</span>
          </a>
          <a href="#" className="hover:text-[#7d0c1a] transition-colors flex justify-between gap-8 border-b border-[#AEA28F]/20 pb-4">
            <span>LinkedIn</span>
            <span className="opacity-50">Serious me</span>
          </a>
          <a href="#" className="hover:text-[#7d0c1a] transition-colors flex justify-between gap-8 border-b border-[#AEA28F]/20 pb-4">
            <span>Instagram</span>
            <span className="opacity-50">Not Tiktok</span>
          </a>
        </div>
      </section>
      </div>
    </main>
  );
}

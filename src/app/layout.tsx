import type { Metadata } from "next";
import { Inter, Playfair_Display, Antonio } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";
import { cn } from "@/lib/utils";

const antonio = Antonio({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Designer Portfolio",
  description: "A luxury brutalist designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", inter.variable, playfair.variable, "font-sans", antonio.variable)}
    >
      <body suppressHydrationWarning className="bg-[#111] text-foreground font-sans min-h-screen selection:bg-foreground selection:text-background cursor-none">
        <CustomCursor />
        {/* <Preloader /> */}
        
        {/* Navigation positioned via vh */}
        <nav 
          className="fixed left-0 w-full z-50 bg-transparent px-4 md:px-8 flex items-start justify-between pointer-events-auto text-[#AEA28F]"
          style={{ top: "6.5476190476vh" }}
        >
          {/* Logo Mark */}
          <div className="relative z-50 flex items-center">
            <a href="#" aria-label="Home" className="block">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L2 16L16 30L30 16L16 2Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="16" cy="16" r="4" fill="currentColor"/>
              </svg>
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
        <div className="fixed left-4 md:left-8 bottom-8 z-50 flex flex-col items-center gap-6 text-[#AEA28F]/50 pointer-events-auto">
          {/* Dribbble */}
          <a href="#" className="hover:text-[#AEA28F] transition-colors" aria-label="Dribbble">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm7.938 5.563a10.18 10.18 0 0 1 2.312 6.375c-.338-.063-3.713-.75-7.125-.325-.075-.163-.138-.338-.213-.512-.212-.5-.437-1-.675-1.488 3.775-1.538 5.488-3.75 5.7-4.05zM12 1.75c2.75 0 5.25 1.125 7.063 2.938-.175.262-1.725 2.35-5.375 3.713-1.675-3.088-3.538-5.625-3.825-6.013A10.3 10.3 0 0 1 12 1.75zM8.05 3.05c.275.363 2.1 2.913 3.8 5.938-4.788 1.275-9.013 1.25-9.475 1.25A10.29 10.29 0 0 1 8.05 3.05zM1.75 12v-.325c.45.013 5.375.075 10.5-1.463.288.563.563 1.138.825 1.713-.138.038-.275.088-.413.138-5.375 1.738-8.225 6.475-8.45 6.85A10.19 10.19 0 0 1 1.75 12zm3.938 8.225c.15-.25 2.275-4.463 8.063-6.525.013 0 .025-.013.038-.013 1.438 3.75 2.038 6.9 2.188 7.75a10.205 10.205 0 0 1-10.288-1.212zm12.025.325c-.1-.588-.65-3.588-2-7.275 3.238-.513 6.075.338 6.425.45a10.235 10.235 0 0 1-4.425 6.825z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" className="hover:text-[#AEA28F] transition-colors" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" className="hover:text-[#AEA28F] transition-colors" aria-label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="8 5 20 12 8 19 8 5"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="hover:text-[#AEA28F] transition-colors font-sans font-bold text-base" aria-label="LinkedIn">
            in
          </a>
        </div>

        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

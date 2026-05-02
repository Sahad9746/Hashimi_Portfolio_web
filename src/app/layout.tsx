import type { Metadata } from "next";
import { Inter, Playfair_Display, Antonio } from "next/font/google";
import Image from "next/image";
import LenisProvider from "@/components/LenisProvider";
import GlobalLayoutWrapper from "@/components/GlobalLayoutWrapper";
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
      <body suppressHydrationWarning className="bg-[#111] text-foreground font-sans min-h-screen selection:bg-foreground selection:text-background">
        <LenisProvider>
          <GlobalLayoutWrapper>
            {children}
          </GlobalLayoutWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}

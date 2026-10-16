import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Geist_Mono, Cormorant_Garamond, Noto_Serif_SC } from "next/font/google";
import localFont from "next/font/local";
import { LanguageProvider } from "@/components/LanguageProvider";
import { BRAND } from "@/lib/site";
import { ShowcaseLayer } from "@/components/ShowcaseLayer";
import "./globals.css";
import "./light-surfaces.css";
import "./typography.css";
import "./theme.css";
import "./interior-layout.css";
import "./action-design.css";
import "./official-sections.css";
import { ThemeProvider, themeBootScript } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const brandDisplay = Cormorant_Garamond({
  variable: "--font-brand-display",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const chineseDisplay = Noto_Serif_SC({
  variable: "--font-brand-cn",
  weight: "500",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const chineseSans = localFont({
  src: "./fonts/noto-sans-sc-site.woff2",
  variable: "--font-noto-sans",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: `${BRAND.en} — AI for Science`,
  description:
    "AI-native scientific computing for molecular dynamics, materials research, LAMMPS workflows and AI for Science.",
  keywords: [
    "AI for Science",
    "Molecular Dynamics",
    "LAMMPS",
    "Scientific Computing",
    "Materials Science",
    "HPC",
  ],
  openGraph: {
    title: `${BRAND.en} — AI for Science`,
    description:
      "AI-native scientific computing for molecular simulation, materials research and scientific discovery.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`type-system ${inter.variable} ${interTight.variable} ${geistMono.variable} ${brandDisplay.variable} ${chineseDisplay.variable} ${chineseSans.variable}`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head>
      <body>
        <LanguageProvider>
          <ThemeProvider>
          {children}
          <ShowcaseLayer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

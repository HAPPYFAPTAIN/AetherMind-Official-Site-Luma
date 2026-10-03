import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { BRAND } from "@/lib/site";
import { ShowcaseLayer } from "@/components/ShowcaseLayer";
import "./globals.css";

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
      className={`${inter.variable} ${interTight.variable} ${geistMono.variable}`}
    >
      <body>
        <LanguageProvider>
          {children}
          <ShowcaseLayer />
        </LanguageProvider>
      </body>
    </html>
  );
}

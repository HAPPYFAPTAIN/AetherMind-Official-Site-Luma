import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ScrollRefresher } from "@/components/ScrollRefresher";
import { PlatformDefinition } from "@/components/sections/PlatformDefinition";
import { ComputationalEngine } from "@/components/sections/ComputationalEngine";
import { MolecularDynamics } from "@/components/sections/MolecularDynamics";
import { AIScience } from "@/components/sections/AIScience";
import { Workflow } from "@/components/sections/Workflow";
import { Scenarios } from "@/components/sections/Scenarios";
import { Results } from "@/components/sections/Results";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-0 text-text-primary">
      <ScrollRefresher />
      <Nav />
      <Hero />
      <PlatformDefinition />
      <ComputationalEngine />
      <MolecularDynamics />
      <AIScience />
      <Workflow />
      <Scenarios />
      <Results />
      <Infrastructure />
      <FinalCTA />
      <Footer />

      {/* film grain overlay */}
      <div className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay" />
    </main>
  );
}

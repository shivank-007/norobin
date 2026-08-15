import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";

import Hero from "@/components/sections/hero/Hero";
import IndustryStrip from "@/components/sections/industries/IndustryStrip";
import AIEmployeeTypes from "@/components/sections/ai-employee-types/AIEmployeeTypes";
import DemoSection from "@/components/sections/demo/DemoSection";
import HowItWorksSection from "@/components/sections/how-it-works/HowItWorksSection";
import ProcessSection from "@/components/sections/process/ProcessSection";
import InteractiveSelector from "@/components/sections/interactive-selector/InteractiveSelector";
import CTA from "@/components/sections/cta/CTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <IndustryStrip />
        <AIEmployeeTypes />
        <DemoSection />
        <HowItWorksSection />
        <ProcessSection />
        <InteractiveSelector />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
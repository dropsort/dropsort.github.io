"use client";

import MicrofluidicPath from "@/components/MicrofluidicPath";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Features from "@/components/Features";
import Screenshot from "@/components/Screenshot";
import HowItWorks from "@/components/HowItWorks";
import Editions from "@/components/Editions";
import Documentation from "@/components/Documentation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <MicrofluidicPath />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Introduction />
        <Features />
        <Screenshot />
        <HowItWorks />
        <Editions />
        <Documentation />
      </main>
      <Footer />
    </>
  );
}

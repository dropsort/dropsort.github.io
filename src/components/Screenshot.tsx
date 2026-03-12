"use client";

import Image from "next/image";
import SectionReveal from "./SectionReveal";
import screenshotPng from "@/assets/screenshot.png";

export default function Screenshot() {
  return (
    <section className="relative z-10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 section-backdrop">
        <SectionReveal>
          <div className="text-center mb-14 text-backdrop">
            <span className="text-xs font-mono tracking-widest text-brand/60 uppercase mb-4 block">
              Interface
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Designed for the bench
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              A purpose-built interface for real-time experiment monitoring.
              Histograms, scatter plots, gating controls, and trigger
              configuration — all live.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="relative">
            <div className="w-full max-w-5xl mx-auto overflow-hidden">
              <Image
                src={screenshotPng}
                alt="DropSort application screenshot"
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-brand/5 via-transparent to-brand-light/5 pointer-events-none blur-2xl -z-10" />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

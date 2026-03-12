"use client";

import { motion } from "framer-motion";
import EmailLink from "./EmailLink";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center pt-24 pb-20 section-backdrop hero-backdrop">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="font-mono">Real-time droplet sorting software</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-backdrop"
        >
          Turn your microscope into a
          <br />
          <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
            high-throughput sorter
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed text-backdrop"
        >
          DropSort processes raw fluorescence signals from PMTs, segments
          droplets in real time, enables multi-parameter gating, and outputs
          trigger signals to drive electrode-based sorting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <EmailLink
            subject="DropSort inquiry"
            body={`Hello DropSort team,

I would like to learn more about DropSort.

Name:
Organization:
Use case:

Best regards,`}
            className="group relative px-8 py-3.5 rounded-lg bg-brand text-white font-semibold text-sm tracking-wide hover:shadow-[0_0_32px_rgba(233,30,99,0.3)] transition-all duration-300"
          >
            Get in touch
          </EmailLink>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-foreground/20 font-medium text-sm tracking-wide transition-all duration-200"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}

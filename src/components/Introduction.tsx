"use client";

import SectionReveal from "./SectionReveal";

const highlights = [
  {
    title: "Real-time processing",
    desc: "Continuous signal acquisition and droplet detection at up to 100 MHz sampling rate.",
  },
  {
    title: "Multi-channel analysis",
    desc: "Measure fluorescence across up to 4 color channels, plus droplet length.",
  },
  {
    title: "Desktop interface",
    desc: "Full experiment control from signal configuration to sorting, all from a single application.",
  },
  {
    title: "Accessible FADS",
    desc: "Brings fluorescence-activated droplet sorting workflows within reach for teams working with droplet microfluidics.",
  },
];

export default function Introduction() {
  return (
    <section className="relative z-10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 section-backdrop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <SectionReveal>
            <div className="text-backdrop">
              <span className="text-xs font-mono tracking-widest text-brand/60 uppercase mb-4 block">
                About
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                What is DropSort
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  DropSort is dedicated software for real-time signal processing
                  and sorting in droplet microfluidics. It acquires raw optical
                  fluorescence signals detected by photomultiplier tubes (PMTs),
                  segments individual droplets from the continuous data stream,
                  and analyzes intensity and size distributions across multiple
                  channels.
                </p>
                <p>
                  Through an interactive gating interface, users define sorting
                  criteria on measured droplet parameters. When a droplet matches
                  the selected gates, DropSort outputs a real-time trigger signal
                  to control an electrode for sorting.
                </p>
              </div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((h, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-5 h-full">
                  <div className="w-8 h-0.5 bg-brand/40 rounded-full mb-3" />
                  <h3 className="text-sm font-semibold tracking-tight mb-1.5">
                    {h.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{h.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

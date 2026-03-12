"use client";

import SectionReveal from "./SectionReveal";

const features = [
  {
    title: "Up to 4 color channels",
    desc: "Acquire and analyze fluorescence signals from up to four PMT channels simultaneously, plus droplet length measurement.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand">
        <rect x="2" y="3" width="4" height="14" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="8" y="6" width="4" height="11" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="14" y="8" width="4" height="9" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Up to 4 selection windows",
    desc: "Define up to four independent sorting gates to isolate specific droplet populations based on measured parameters.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Up to 100 MHz sampling",
    desc: "High-speed signal acquisition at up to 100 MHz sampling rate for precise droplet detection and measurement.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand">
        <path d="M2 10 L5 10 L7 4 L10 16 L13 7 L15 13 L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Measurement modes",
    desc: "Choose from maximum, average, and ratio measurement modes to extract the parameters that matter for your experiment.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "CSV and FCS export",
    desc: "Export droplet-level measurement data as CSV or FCS files for downstream analysis with standard tools.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand">
        <path d="M4 13v3a1 1 0 001 1h10a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M10 3v9m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "Digital lab book",
    desc: "Built-in experiment logging. Automatically record parameters, gate settings, and sorting statistics with timestamps.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand">
        <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M7 6h6M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 section-backdrop">
        <SectionReveal>
          <div className="text-center mb-16 text-backdrop">
            <span className="text-xs font-mono tracking-widest text-brand/60 uppercase mb-4 block">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Capabilities
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Core features for real-time droplet analysis and sorting, designed
              around the needs of droplet microfluidics workflows.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <div className="group rounded-xl border border-border bg-card shadow-sm p-6 hover:bg-card-hover transition-all duration-300 h-full">
                <div className="mb-4 text-brand/60">{f.icon}</div>
                <h3 className="text-sm font-semibold tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

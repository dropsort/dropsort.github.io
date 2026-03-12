"use client";

import Link from "next/link";
import SectionReveal from "./SectionReveal";

const docs = [
  {
    title: "Setup Instructions",
    desc: "Hardware connection and first-run setup for the DropSort system.",
    href: "/documentation/setup/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v6m0 0l-2.5-2.5M10 8l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="10" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="14" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "User Guide",
    desc: "Signal configuration, gating workflows, data export, and feature reference.",
    href: "/documentation/userguide/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 4h5a2 2 0 012 2v11l-2-1.5L6 17V4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 4h-5a2 2 0 00-2 2v11l2-1.5 2 1.5V4z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Documentation() {
  return (
    <section id="documentation" className="relative z-10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 section-backdrop">
        <SectionReveal>
          <div className="text-center mb-14 text-backdrop">
            <span className="text-xs font-mono tracking-widest text-brand/60 uppercase mb-4 block">
              Reference
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Documentation & reference
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Product documentation and setup guides for the DropSort platform.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {docs.map((d, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <Link
                href={d.href}
                className="group block rounded-xl border border-border bg-card shadow-sm p-6 hover:bg-card-hover transition-all duration-300 h-full"
              >
                <div className="text-brand/45 mb-4">{d.icon}</div>
                <h3 className="text-sm font-semibold tracking-tight mb-1.5">
                  {d.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{d.desc}</p>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

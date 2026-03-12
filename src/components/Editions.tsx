"use client";

import SectionReveal from "./SectionReveal";
import EmailLink from "./EmailLink";

const editions = [
  {
    name: "Lite",
    tagline: "For basic experiments",
    price: "Free",
    features: [
      "1 color channel",
      "Basic droplet measurement",
      "Histogram visualization",
      "1 selection window",
      "No data saving",
    ],
    cta: "Get started",
    accent: false,
    emailSubject: "DropSort Lite - get started",
    emailBody: `Hello DropSort team,

I would like to get started with DropSort Lite.

Name:
Organization:
Planned use case:

Best regards,`,
  },
  {
    name: "Pro",
    tagline: "For advanced experiments",
    price: "Upon request",
    features: [
      "Up to 4 color channels",
      "Up to 4 selection windows",
      "All measurement modes",
      "CSV and FCS export",
      "Built-in digital lab book",
    ],
    cta: "Request access",
    accent: true,
    emailSubject: "DropSort Pro - access request",
    emailBody: `Hello DropSort team,

I would like to request access to DropSort Pro.

Name:
Organization:
Required features:

Best regards,`,
  },
  {
    name: "Custom",
    tagline: "For specialized platforms and OEM integration",
    price: "Contact us",
    features: [],
    description:
      "If you did not find a feature you need, we can extend DropSort and tailor the software to your exact workflow. We support custom signal processing, hardware integrations, automation interfaces, and feature development based on your application requirements.",
    cta: "Contact us",
    accent: false,
    emailSubject: "DropSort Custom - project inquiry",
    emailBody: `Hello DropSort team,

I am interested in a custom DropSort setup.

Name:
Organization:
Project requirements:

Best regards,`,
  },
];

export default function Editions() {
  return (
    <section id="editions" className="relative z-10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 section-backdrop">
        <SectionReveal>
          <div className="text-center mb-16 text-backdrop">
            <span className="text-xs font-mono tracking-widest text-brand/60 uppercase mb-4 block">
              Editions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Choose your edition
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              DropSort is available in three editions, from free evaluation
              to fully customized platform integration.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {editions.map((ed, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div
                className={`relative rounded-xl border p-8 h-full flex flex-col ${
                  ed.accent
                    ? "border-brand/25 bg-card shadow-sm"
                    : "border-border bg-card shadow-sm"
                }`}
              >
                {ed.accent && (
                  <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight mb-1">
                    {ed.name}
                  </h3>
                  <p className="text-sm text-muted mb-3">{ed.tagline}</p>
                  <p className="text-2xl font-bold tracking-tight">
                    {ed.price === "Free" ? (
                      "Free"
                    ) : (
                      <span className="text-base font-medium text-muted">
                        {ed.price === "Upon request"
                          ? "Price upon request"
                          : ed.price}
                      </span>
                    )}
                  </p>
                </div>

                {ed.name === "Custom" ? (
                  <p className="text-sm text-muted leading-relaxed mb-8 flex-grow">
                    {ed.description}
                  </p>
                ) : (
                  <ul className="space-y-3 mb-8 flex-grow">
                    {ed.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-muted"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          className="shrink-0 mt-0.5"
                        >
                          <path
                            d="M4 8l3 3 5-6"
                            stroke={
                              ed.accent
                                ? "rgba(233,30,99,0.55)"
                                : "rgba(160,160,176,0.4)"
                            }
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <EmailLink
                  subject={ed.emailSubject}
                  body={ed.emailBody}
                  className={`block text-center text-sm font-medium px-6 py-3 rounded-lg transition-all duration-200 ${
                    ed.accent
                      ? "bg-brand text-white hover:shadow-[0_0_24px_rgba(233,30,99,0.25)]"
                      : "border border-border text-muted hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  {ed.cta}
                </EmailLink>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

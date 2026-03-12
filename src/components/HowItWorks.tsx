"use client";

import SectionReveal from "./SectionReveal";

const steps = [
  {
    num: "01",
    title: "Acquire",
    subtitle: "Raw fluorescence signal from PMTs",
    desc: "Connect photomultiplier tubes (PMTs) to the system. DropSort digitizes and streams the raw fluorescence signal in real time.",
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-auto" fill="none">
        <path
          d="M10 50 Q30 20 50 50 Q70 80 90 50 Q110 20 130 50 Q150 80 170 50 Q185 30 190 50"
          stroke="rgba(233,30,99,0.45)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M10 50 Q30 20 50 50 Q70 80 90 50 Q110 20 130 50 Q150 80 170 50 Q185 30 190 50"
          stroke="rgba(233,30,99,0.1)"
          strokeWidth="8"
          fill="none"
        />
        <line x1="10" y1="85" x2="190" y2="85" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
        {[30, 70, 110, 150].map((x, i) => (
          <line key={i} x1={x} y1="83" x2={x} y2="87" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        ))}
        <text x="100" y="95" textAnchor="middle" fill="rgba(0,0,0,0.15)" fontSize="6" fontFamily="monospace">
          time →
        </text>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Segment",
    subtitle: "Detect and measure droplets in real time",
    desc: "Droplet boundaries are detected in the continuous signal stream, isolating each droplet event with precise timing.",
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-auto" fill="none">
        {[20, 65, 110, 155].map((x, i) => (
          <g key={i}>
            <rect
              x={x}
              y="25"
              width="30"
              height="50"
              rx="4"
              fill={i === 1 ? "rgba(233,30,99,0.06)" : "rgba(233,30,99,0.03)"}
              stroke={i === 1 ? "rgba(233,30,99,0.3)" : "rgba(233,30,99,0.15)"}
              strokeWidth="1"
              strokeDasharray={i === 1 ? "none" : "3 2"}
            />
            <circle
              cx={x + 15}
              cy="50"
              r="6"
              fill={i === 1 ? "rgba(233,30,99,0.35)" : "rgba(233,30,99,0.12)"}
            />
          </g>
        ))}
        <path
          d="M10 50 Q20 30 35 50 T60 50 Q72 30 80 50 T105 50 Q115 30 125 50 T150 50 Q162 35 170 50 T190 50"
          stroke="rgba(233,30,99,0.2)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Gate",
    subtitle: "Analyze distributions and define sorting criteria",
    desc: "Extract droplet features — intensity, width, multi-channel ratios. Visualize population distributions and define sorting gates interactively.",
    visual: (
      <svg viewBox="0 0 200 100" className="w-full h-auto" fill="none">
        {Array.from({ length: 40 }, (_, i) => {
          const x = 20 + Math.sin(i * 1.7) * 40 + i * 2.5 + (i % 3) * 8;
          const y = 15 + Math.cos(i * 2.3) * 25 + 35 + (i % 5) * 4;
          const inGate = x > 60 && x < 140 && y > 30 && y < 70;
          return (
            <circle
              key={i}
              cx={Math.min(190, Math.max(10, x))}
              cy={Math.min(90, Math.max(10, y))}
              r="2.5"
              fill={inGate ? "rgba(233,30,99,0.5)" : "rgba(233,30,99,0.15)"}
            />
          );
        })}
        <rect
          x="60"
          y="30"
          width="80"
          height="40"
          rx="2"
          fill="none"
          stroke="rgba(233,30,99,0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <text
          x="100"
          y="24"
          textAnchor="middle"
          fill="rgba(233,30,99,0.4)"
          fontSize="7"
          fontFamily="monospace"
        >
          GATE
        </text>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Sort",
    subtitle: "Output trigger signal to electrode",
    desc: "Droplets matching the gate criteria receive a real-time trigger signal to the sorting electrode, deflecting them into the collection channel.",
    visual: (
      <svg viewBox="0 0 240 112" className="w-full h-auto" fill="none">
        {/* Channel fills */}
        <rect x="8" y="50" width="102" height="14" fill="rgba(233,30,99,0.015)" />
        <path d="M110 50 V24 H124 V50 Z" fill="rgba(233,30,99,0.015)" />
        <path d="M110 64 V90 H124 V64 Z" fill="rgba(0,0,0,0.008)" />
        <rect x="110" y="50" width="14" height="14" fill="rgba(233,30,99,0.01)" />
        <rect x="124" y="24" width="108" height="14" fill="rgba(233,30,99,0.02)" />
        <rect x="124" y="76" width="108" height="14" fill="rgba(0,0,0,0.008)" />

        {/* Incoming channel walls */}
        <line x1="8" y1="50" x2="110" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        <line x1="8" y1="64" x2="110" y2="64" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

        {/* Sort branch walls — outer turns up from incoming top wall */}
        <path d="M110 50 V24 H232" stroke="rgba(233,30,99,0.2)" strokeWidth="1" fill="none" />
        <path d="M124 50 V38 H232" stroke="rgba(233,30,99,0.15)" strokeWidth="1" fill="none" />

        {/* Waste branch walls — outer turns down from incoming bottom wall */}
        <path d="M110 64 V90 H232" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
        <path d="M124 64 V76 H232" stroke="rgba(0,0,0,0.06)" strokeWidth="1" fill="none" />

        {/* Electrode zone background */}
        <rect x="68" y="38" width="28" height="38" fill="rgba(233,30,99,0.025)" rx="2" stroke="rgba(233,30,99,0.07)" strokeWidth="0.5" strokeDasharray="3 2" />

        {/* Electrode plates */}
        <rect x="72" y="36" width="20" height="3.5" rx="1.5" fill="rgba(233,30,99,0.4)" />
        <rect x="72" y="74.5" width="20" height="3.5" rx="1.5" fill="rgba(233,30,99,0.4)" />

        {/* Voltage labels */}
        <text x="82" y="33" textAnchor="middle" fill="rgba(233,30,99,0.3)" fontSize="5.5" fontFamily="monospace">+V</text>
        <text x="82" y="86" textAnchor="middle" fill="rgba(233,30,99,0.3)" fontSize="5.5" fontFamily="monospace">−V</text>

        {/* Electric field lines */}
        {[76, 82, 88].map((x, i) => (
          <line key={i} x1={x} y1="40" x2={x} y2="74" stroke="rgba(233,30,99,0.06)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
        ))}

        {/* Incoming droplets */}
        <circle cx="20" cy="57" r="4" fill="rgba(233,30,99,0.08)" />
        <circle cx="36" cy="57" r="4" fill="rgba(233,30,99,0.1)" />
        <circle cx="52" cy="57" r="4" fill="rgba(233,30,99,0.14)" />
        <circle cx="66" cy="57" r="4" fill="rgba(233,30,99,0.18)" />

        {/* Active droplet being deflected — squeezed against top wall */}
        <ellipse cx="86" cy="53" rx="8" ry="4" fill="rgba(233,30,99,0.04)" />
        <ellipse cx="86" cy="53" rx="5.5" ry="3" fill="rgba(233,30,99,0.5)" />

        {/* Deflection arrow — halfway between electrode and channel wall */}
        <path d="M86 48 V43" stroke="rgba(233,30,99,0.35)" strokeWidth="1" strokeLinecap="round" />
        <path d="M84 45 L86 42 L88 45" stroke="rgba(233,30,99,0.35)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Sorted droplets in collection channel */}
        <circle cx="165" cy="31" r="4" fill="rgba(233,30,99,0.3)" />
        <circle cx="195" cy="31" r="4" fill="rgba(233,30,99,0.2)" />

        {/* Trigger pulse waveform above electrodes */}
        <path d="M68 18 h4 v-10 h4 v10 h4 v-7 h4 v7 h4 v-10 h4 v10 h4" stroke="rgba(233,30,99,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="82" y="26" textAnchor="middle" fill="rgba(233,30,99,0.2)" fontSize="4.5" fontFamily="monospace">TRIGGER</text>

        {/* Labels */}
        <text x="228" y="21" fill="rgba(233,30,99,0.45)" fontSize="7" fontFamily="monospace" textAnchor="end">SORT</text>
        <text x="228" y="103" fill="rgba(0,0,0,0.12)" fontSize="7" fontFamily="monospace" textAnchor="end">WASTE</text>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 section-backdrop">
        <SectionReveal>
          <div className="text-center mb-16 text-backdrop">
            <span className="text-xs font-mono tracking-widest text-brand/60 uppercase mb-4 block">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              How DropSort works
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {steps.map((step, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="group relative rounded-2xl border border-border bg-card shadow-sm p-7 hover:bg-card-hover transition-colors duration-300 h-full">
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-2xl font-bold font-mono text-brand/25 leading-none pt-0.5">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-brand/50 font-mono tracking-wide">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {step.desc}
                </p>
                <div className="rounded-lg bg-background border border-border/60 p-4">
                  {step.visual}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

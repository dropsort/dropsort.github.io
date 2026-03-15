"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoPng from "@/assets/logo.png";
import EmailLink from "./EmailLink";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Editions", href: "#editions" },
  { label: "Documentation", href: "#documentation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              <Image
                src={logoPng}
                alt="DropSort logo"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-semibold tracking-tight font-logo">
              Drop<span className="text-[#C2185B]">Sort</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <EmailLink
              subject="DropSort inquiry"
              body={`Hello DropSort team,

I would like to get in touch regarding DropSort.

Name:
Organization:
Use case:

Best regards,`}
              className="text-sm font-medium px-5 py-2 rounded-lg bg-brand text-white hover:shadow-[0_0_24px_rgba(233,30,99,0.25)] transition-all duration-200"
            >
              Get in touch
            </EmailLink>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-foreground"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 8h16M4 16h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted hover:text-foreground py-2"
                >
                  {link.label}
                </a>
              ))}
              <EmailLink
                subject="DropSort inquiry"
                body={`Hello DropSort team,

I would like to get in touch regarding DropSort.

Name:
Organization:
Use case:

Best regards,`}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium px-5 py-2.5 rounded-lg bg-brand text-white text-center mt-2"
              >
                Get in touch
              </EmailLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

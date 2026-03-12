"use client";

import Image from "next/image";
import logoPng from "@/assets/logo.png";
import EmailLink from "./EmailLink";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 py-12 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                <Image
                  src={logoPng}
                  alt="DropSort logo"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold tracking-tight font-logo">
                Drop<span className="text-[#C2185B]">Sort</span>
              </span>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted">
              <a href="#how-it-works" className="hover:text-foreground transition-colors">
                How it works
              </a>
              <a href="#features" className="hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#editions" className="hover:text-foreground transition-colors">
                Editions
              </a>
              <a href="#documentation" className="hover:text-foreground transition-colors">
                Documentation
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-border/30">
            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/60">
              <span className="hover:text-muted transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-muted transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-muted transition-colors cursor-pointer">Imprint</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-muted/50">
              <EmailLink
                revealAddress
                className="hover:text-muted transition-colors"
              >
                Contact
              </EmailLink>
              <span>&copy; {new Date().getFullYear()} DropSort</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

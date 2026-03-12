import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { afacadSans } from "./fonts";

export const metadata: Metadata = {
  title: "DropSort — Microfluidic Droplet Sorting Software",
  description:
    "DropSort is software for real-time signal processing and sorting in droplet microfluidics. It processes raw fluorescence PMT signals, segments droplets, enables gating, and drives electrode-based sorting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${afacadSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}

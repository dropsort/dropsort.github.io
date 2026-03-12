import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { afacadSans } from "./fonts";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPageRepo = repo.toLowerCase().endsWith(".github.io");
const ghBasePath = process.env.GITHUB_ACTIONS === "true" && !isUserOrOrgPageRepo
  ? `/${repo}`
  : "";

export const metadata: Metadata = {
  title: "DropSort — Microfluidic Droplet Sorting Software",
  description:
    "DropSort is software for real-time signal processing and sorting in droplet microfluidics. It processes raw fluorescence PMT signals, segments droplets, enables gating, and drives electrode-based sorting.",
  icons: {
    icon: `${ghBasePath}/favicon.ico`,
    shortcut: `${ghBasePath}/favicon.ico`,
    apple: `${ghBasePath}/favicon.ico`,
  },
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

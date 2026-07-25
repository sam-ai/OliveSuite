"use client";

import { ArrowRight, BrainCircuit, Github } from "lucide-react";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Hybrid Router", href: "#hybrid" },
      { label: "Olive Mesh", href: "#mesh" },
      { label: "Model Catalog", href: "#models" },
      { label: "Quickstart", href: "#quickstart" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "OdiaGenAI Models", href: "#models" },
      { label: "Datasets", href: "#" },
      { label: "Benchmarks", href: "#compare" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050912]">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg border border-[#A3B565]/20 bg-[radial-gradient(circle_at_50%_0%,rgba(163,181,101,0.14),transparent_55%),linear-gradient(135deg,#0d1728_0%,#081120_100%)] px-6 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(246,242,234,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.5)_1px,transparent_1px)] [background-size:56px_56px]" />
          <h2 className="relative text-3xl font-semibold text-[#F6F2EA] sm:text-4xl">
            Ready to build sovereign AI?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-6 text-[#F6F2EA]/70 sm:text-base sm:leading-7">
            Add Odia voice, retrieval, and reasoning to your product in minutes. Free to start, runs on
            hardware you own.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#quickstart"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A3B565] px-6 text-sm font-semibold text-[#081120] transition-colors duration-200 hover:bg-[#F6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
            >
              Start building
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-[#F6F2EA] backdrop-blur transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10 md:px-6 lg:px-8">
        <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <a href="#" className="flex items-center gap-3 text-[#F6F2EA]">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#A3B565]/30 bg-[#A3B565]/10">
                <BrainCircuit className="h-5 w-5 text-[#A3B565]" />
              </span>
              <span className="text-base font-semibold tracking-wide">OliveSuite</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#F6F2EA]/60">
              Hybrid, offline-first AI infrastructure for Indic languages. Built by OdiaGenAI.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-[#F6F2EA]">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#F6F2EA]/60 transition-colors duration-200 hover:text-[#F6F2EA]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-[#F6F2EA]/50">
            © 2026 OliveSuite · OdiaGenAI. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs text-[#F6F2EA]/50">
            <Github className="h-3.5 w-3.5" />
            Privacy-first by design
          </p>
        </div>
      </div>
    </footer>
  );
}

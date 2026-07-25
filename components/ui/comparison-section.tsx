"use client";

import { Check, Minus, Scale, X } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Mark = "yes" | "partial" | "no";

const columns = [
  { id: "cloud", label: "Traditional Cloud AI", highlight: false },
  { id: "device", label: "Olive On-Device", highlight: false },
  { id: "hybrid", label: "Olive Hybrid", highlight: true },
] as const;

type ColumnId = (typeof columns)[number]["id"];

const rows: Array<{ feature: string } & Record<ColumnId, Mark>> = [
  { feature: "Works offline", cloud: "no", device: "yes", hybrid: "yes" },
  { feature: "Indic-first quality", cloud: "partial", device: "yes", hybrid: "yes" },
  { feature: "Data privacy", cloud: "no", device: "yes", hybrid: "yes" },
  { feature: "Sub-150ms responses", cloud: "no", device: "yes", hybrid: "yes" },
  { feature: "Handles noisy audio", cloud: "yes", device: "partial", hybrid: "yes" },
  { feature: "Cost efficient at scale", cloud: "no", device: "yes", hybrid: "yes" },
  { feature: "Smart routing", cloud: "no", device: "no", hybrid: "yes" },
];

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes") {
    return <Check className="h-4 w-4 text-[#A3B565]" />;
  }

  if (mark === "partial") {
    return <Minus className="h-4 w-4 text-[#F6F2EA]/50" />;
  }

  return <X className="h-4 w-4 text-[#FF8FA3]" />;
}

export function ComparisonSection() {
  return (
    <section id="compare" className="container mx-auto scroll-mt-24 px-4 pt-16 md:px-6 lg:px-8">
      <SectionHeading
        align="center"
        eyebrow="No compromise"
        eyebrowIcon={Scale}
        title="The best of on-device and cloud."
        description="Cloud-only tools fail offline and leak sensitive audio. On-device alone hits accuracy limits. OliveSuite routes every request to the right place."
      />

      <div className="mx-auto mt-8 max-w-4xl overflow-x-auto rounded-lg border border-white/10 bg-[#0d1728]/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-4 text-xs font-medium uppercase tracking-[0.16em] text-[#F6F2EA]/55">
                Capability
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "px-4 py-4 text-sm font-semibold",
                    column.highlight ? "bg-[#A3B565]/[0.08] text-[#A3B565]" : "text-[#F6F2EA]/80",
                  )}
                >
                  <span className="flex flex-wrap items-center gap-2">
                    {column.label}
                    {column.highlight ? (
                      <span className="rounded-full border border-[#A3B565]/40 bg-[#A3B565]/15 px-2 py-0.5 text-[10px] font-medium">
                        Recommended
                      </span>
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-white/5 last:border-b-0">
                <td className="px-4 py-3.5 text-[#F6F2EA]/85">{row.feature}</td>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn("px-4 py-3.5", column.highlight && "bg-[#A3B565]/[0.08]")}
                  >
                    <MarkIcon mark={row[column.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

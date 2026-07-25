import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon: Icon,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#5EE6FF]/20 bg-[#5EE6FF]/10 px-3 py-1 text-xs font-medium text-[#5EE6FF]">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {eyebrow}
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-[#F6F2EA] sm:text-3xl md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-sm leading-6 text-[#F6F2EA]/70 sm:text-base sm:leading-7">{description}</p>
      ) : null}
    </div>
  );
}

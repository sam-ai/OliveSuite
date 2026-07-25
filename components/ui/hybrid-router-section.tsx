"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Cloud,
  FileAudio,
  Laptop,
  Lock,
  Mic2,
  ShieldCheck,
  Split,
  Timer,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type RouteTarget = "on-device" | "cloud";

interface RouteScenario {
  id: string;
  label: string;
  icon: LucideIcon;
  command: string;
  commandEn: string;
  target: RouteTarget;
  signalLabel: string;
  signalValue: string;
  latency: string;
  note: string;
  lockedNote: string;
}

const scenarios: RouteScenario[] = [
  {
    id: "voice",
    label: "Voice",
    icon: Mic2,
    command: "ଥର୍ମୋଷ୍ଟାଟକୁ ୭୨ ଡିଗ୍ରୀକୁ ସେଟ କର",
    commandEn: "Set the thermostat to 72 degrees",
    target: "on-device",
    signalLabel: "Complexity",
    signalValue: "Low",
    latency: "96ms",
    note: "Simple intent with clear audio — resolved entirely on-device.",
    lockedNote: "Simple intent with clear audio — resolved entirely on-device.",
  },
  {
    id: "transcription",
    label: "Transcription",
    icon: FileAudio,
    command: "ଆଜିର ଫିଲ୍ଡ ସାକ୍ଷାତକାର ଟ୍ରାନ୍ସକ୍ରାଇବ କର",
    commandEn: "Transcribe today's field interview",
    target: "on-device",
    signalLabel: "Audio SNR",
    signalValue: "Clear",
    latency: "118ms",
    note: "Clear speech — real-time transcription stays on the recorder.",
    lockedNote: "Clear speech — real-time transcription stays on the recorder.",
  },
  {
    id: "agents",
    label: "Agents",
    icon: Bot,
    command: "ଗତ ସପ୍ତାହର ବିଲ ସାରାଂଶ ଇମେଲ କର",
    commandEn: "Email a summary of last week's invoices",
    target: "cloud",
    signalLabel: "Complexity",
    signalValue: "High",
    latency: "420ms",
    note: "Multi-step tool chain — handed to the cloud model you approve.",
    lockedNote: "Privacy lock is on — this stays on-device even though the cloud would be faster.",
  },
];

const stats = [
  { icon: ShieldCheck, value: "0 bytes", label: "Leave the device by default" },
  { icon: Timer, value: "<120ms", label: "On-device voice latency" },
  { icon: Wallet, value: "5x", label: "Cost savings vs cloud-only" },
  { icon: Zap, value: "1 API", label: "Voice, retrieval and reasoning" },
];

function DestinationCard({
  target,
  active,
  latency,
  disabled,
}: {
  target: RouteTarget;
  active: boolean;
  latency: string;
  disabled?: boolean;
}) {
  const isDevice = target === "on-device";
  const Icon = isDevice ? Laptop : Cloud;

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all duration-300",
        active
          ? isDevice
            ? "border-[#A3B565]/50 bg-[#A3B565]/10 shadow-[0_0_40px_rgba(163,181,101,0.15)]"
            : "border-[#5EE6FF]/50 bg-[#5EE6FF]/10 shadow-[0_0_40px_rgba(94,230,255,0.15)]"
          : "border-white/10 bg-white/[0.03] opacity-60",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-[#F6F2EA]">
          <Icon className={cn("h-4 w-4", isDevice ? "text-[#A3B565]" : "text-[#5EE6FF]")} />
          {isDevice ? "On-Device" : "Cloud"}
        </span>
        {active ? (
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
              isDevice
                ? "border-[#A3B565]/40 bg-[#A3B565]/15 text-[#A3B565]"
                : "border-[#5EE6FF]/40 bg-[#5EE6FF]/15 text-[#5EE6FF]",
            )}
          >
            Active route
          </span>
        ) : null}
        {!active && disabled ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium text-[#F6F2EA]/60">
            <Lock className="h-3 w-3" />
            Locked
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-xs leading-5 text-[#F6F2EA]/60">
        {isDevice
          ? "Local LLM, Whisper and FAISS on owned hardware."
          : "Approved cloud endpoint for the hard requests."}
      </p>
      {active ? (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#050912]/60 px-2.5 py-1 font-mono text-[11px] text-[#F6F2EA]/80">
          <Timer className="h-3 w-3" />
          Latency {latency}
        </p>
      ) : null}
    </div>
  );
}

export function HybridRouterSection() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [privacyLock, setPrivacyLock] = useState(false);

  const scenario = scenarios.find((item) => item.id === activeId) ?? scenarios[0];
  const effectiveTarget: RouteTarget = privacyLock ? "on-device" : scenario.target;
  const cloudLocked = privacyLock && scenario.target === "cloud";

  return (
    <section id="hybrid" className="container mx-auto scroll-mt-24 px-4 pt-16 md:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Olive Hybrid Router"
        eyebrowIcon={Split}
        title="On-device first. Cloud only when you choose."
        description="Every request is scored for complexity, audio quality, and sensitivity. Simple tasks never leave the device — only the hard ones are handed to a cloud endpoint you approve."
      />

      <div className="mt-8 rounded-lg border border-white/10 bg-[#0d1728]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {scenarios.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === scenario.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]",
                    isActive
                      ? "border-[#5EE6FF]/40 bg-[#5EE6FF]/15 text-[#5EE6FF]"
                      : "border-white/10 bg-white/[0.03] text-[#F6F2EA]/65 hover:border-white/25 hover:text-[#F6F2EA]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-[#F6F2EA]/70">
              <Lock className="h-3.5 w-3.5 text-[#A3B565]" />
              Privacy lock · on-device only
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={privacyLock}
              aria-label="Toggle privacy lock"
              onClick={() => setPrivacyLock((value) => !value)}
              className={cn(
                "relative h-6 w-11 cursor-pointer rounded-full border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]",
                privacyLock ? "border-[#A3B565]/60 bg-[#A3B565]/30" : "border-white/15 bg-white/10",
              )}
            >
              <span
                className={cn(
                  "absolute left-0.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#F6F2EA] transition-transform duration-200",
                  privacyLock && "translate-x-[22px] bg-[#A3B565]",
                )}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-3 lg:grid-cols-[1.1fr_auto_1fr_auto_1.25fr]">
          <div key={scenario.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5EE6FF]">Command</p>
            <p className="mt-3 font-[Noto_Sans_Oriya,Inter,sans-serif] text-lg leading-8 text-[#F6F2EA]">
              {scenario.command}
            </p>
            <p className="mt-1 text-xs text-[#F6F2EA]/60">{scenario.commandEn}</p>
          </div>

          <ArrowRight className="mx-auto h-5 w-5 rotate-90 self-center text-[#5EE6FF]/50 lg:rotate-0" />

          <div className="rounded-lg border border-[#A3B565]/30 bg-[#A3B565]/10 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A3B565]">
              Olive Hybrid Router
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 text-sm text-[#F6F2EA]/85">
              <span>{scenario.signalLabel}</span>
              <span className="rounded-full border border-white/15 bg-[#050912]/60 px-2.5 py-0.5 font-mono text-[11px]">
                {scenario.signalValue}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
              <div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r from-[#A3B565] to-[#5EE6FF] transition-all duration-300",
                  effectiveTarget === "cloud" ? "w-4/5" : "w-1/3",
                )}
              />
            </div>
          </div>

          <ArrowRight className="mx-auto h-5 w-5 rotate-90 self-center text-[#5EE6FF]/50 lg:rotate-0" />

          <div className="grid content-start gap-3">
            <DestinationCard
              target="on-device"
              active={effectiveTarget === "on-device"}
              latency={scenario.latency}
            />
            <DestinationCard
              target="cloud"
              active={effectiveTarget === "cloud"}
              latency={scenario.latency}
              disabled={cloudLocked}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#050912]/70 px-3 py-2 text-xs text-[#F6F2EA]/80">
            <span
              className={cn(
                "h-2 w-2 rounded-full motion-safe:animate-pulse motion-reduce:animate-none",
                effectiveTarget === "on-device" ? "bg-[#A3B565]" : "bg-[#5EE6FF]",
              )}
            />
            Routing to {effectiveTarget === "on-device" ? "On-Device" : "Cloud"} — auto-optimizing for
            accuracy, privacy and cost
          </div>
          <p className="text-xs text-[#F6F2EA]/55">{cloudLocked ? scenario.lockedNote : scenario.note}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <Icon className="h-5 w-5 text-[#5EE6FF]" />
                <p className="mt-3 text-2xl font-semibold text-[#F6F2EA]">{stat.value}</p>
                <p className="mt-1 text-xs text-[#F6F2EA]/60">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

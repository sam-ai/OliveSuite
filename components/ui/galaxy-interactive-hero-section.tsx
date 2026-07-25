"use client";

import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  Cpu,
  Database,
  FileAudio,
  Github,
  Laptop,
  Menu,
  Mic2,
  Network,
  Pause,
  ShieldCheck,
  Volume2,
  Waves,
  X,
} from "lucide-react";

import { ComparisonSection } from "@/components/ui/comparison-section";
import { HybridRouterSection } from "@/components/ui/hybrid-router-section";
import { MeshNetworkSection } from "@/components/ui/mesh-network-section";
import { ModelCatalogSection } from "@/components/ui/model-catalog-section";
import { QuickstartSection } from "@/components/ui/quickstart-section";
import { RadialOrbitalTimelineDemo } from "@/components/ui/radial-orbital-timeline-demo";
import { SiteFooter } from "@/components/ui/site-footer";

const Spline = lazy(() => import("@splinetool/react-spline"));

const ttsSamples = [
  {
    id: "odia-privacy",
    label: "Odia privacy reply",
    language: "Odia",
    duration: "0:12",
    src: "/audio/odia-privacy-reply.mp3",
    transcript: "ମୋ ତଥ୍ୟ ମୋ ଡିଭାଇସରେ ରହୁ।",
  },
  {
    id: "odia-retrieval",
    label: "RAG answer",
    language: "Odia + English",
    duration: "0:18",
    src: "/audio/odia-rag-answer.mp3",
    transcript: "OliveSuite retrieves local context and answers without sending private data to the cloud.",
  },
];

function HeroSplineBackground() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Suspense
        fallback={
          <div className="h-screen w-full bg-[radial-gradient(circle_at_70%_35%,rgba(94,230,255,0.18),transparent_30%),linear-gradient(135deg,#081120_0%,#101927_52%,#020510_100%)]" />
        }
      >
        <Spline
          className="h-screen w-full"
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(8,17,32,0.96),rgba(8,17,32,0.62)_34%,rgba(8,17,32,0.18)_58%,rgba(8,17,32,0.86)),linear-gradient(to_bottom,rgba(8,17,32,0.15),rgba(8,17,32,0.72)_72%,#050912)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(246,242,234,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { label: "Voice AI", href: "#voice" },
    { label: "Hybrid", href: "#hybrid" },
    { label: "Mesh", href: "#mesh" },
    { label: "Models", href: "#models" },
    { label: "Compare", href: "#compare" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#081120]/70 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 text-[#F6F2EA]">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#A3B565]/30 bg-[#A3B565]/10">
            <BrainCircuit className="h-5 w-5 text-[#A3B565]" />
          </span>
          <span className="text-base font-semibold tracking-wide">OliveSuite</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="cursor-pointer text-sm text-[#F6F2EA]/70 transition-colors duration-200 hover:text-[#F6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5EE6FF]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="#"
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-medium text-[#F6F2EA]/80 transition-colors duration-200 hover:border-[#5EE6FF]/50 hover:text-[#F6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="#"
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-[#A3B565] px-5 text-sm font-semibold text-[#081120] transition-colors duration-200 hover:bg-[#F6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
          >
            Try Demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-white/20 text-[#F6F2EA] transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF] lg:hidden"
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-white/10 bg-[#081120]/95 transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="cursor-pointer rounded-lg px-3 py-3 text-sm text-[#F6F2EA]/75 transition-colors duration-200 hover:bg-white/5 hover:text-[#F6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroContent() {
  return (
    <div className="grid w-full min-w-0 items-center gap-8 px-4 pt-24 text-[#F6F2EA] sm:pt-28 md:pt-32 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="w-full max-w-[326px] min-w-0 text-left sm:max-w-4xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5EE6FF]/30 bg-[#5EE6FF]/10 px-4 py-2 text-sm text-[#5EE6FF] backdrop-blur">
          <ShieldCheck className="h-4 w-4" />
          Runs on your device
        </div>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-normal sm:text-6xl md:text-7xl">
          OliveSuite
          <span className="block text-[#A3B565]">Agentic AI for Indic Languages</span>
        </h1>
        <p className="mt-6 max-w-full text-base leading-7 text-[#F6F2EA]/75 sm:max-w-2xl sm:text-lg md:text-xl">
          Offline-first speech, retrieval, and reasoning systems built for Odia and beyond.
          Private local compute for teams building regional AI infrastructure.
        </p>
        <div className="mt-8 flex pointer-events-auto w-full max-w-[326px] flex-col gap-3 sm:max-w-none sm:flex-row">
          <a
            href="#"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A3B565] px-6 text-sm font-semibold text-[#081120] transition-colors duration-200 hover:bg-[#F6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
          >
            Try Demo
            <Mic2 className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#5EE6FF]/30 bg-[#081120]/40 px-6 text-sm font-semibold text-[#F6F2EA] backdrop-blur transition-colors duration-200 hover:border-[#5EE6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
          >
            Explore Models
            <Network className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-[#F6F2EA] backdrop-blur transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
      <HeroVisualization />
    </div>
  );
}

function HeroVisualization() {
  return (
    <div className="pointer-events-auto relative hidden min-h-[520px] lg:block">
      <div className="absolute right-0 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full border border-[#5EE6FF]/20 bg-[#5EE6FF]/10 shadow-[0_0_110px_rgba(94,230,255,0.18)] backdrop-blur-2xl motion-safe:animate-pulse motion-reduce:animate-none" />
      <div className="absolute right-16 top-16 w-72 rounded-lg border border-white/10 bg-[#1B2433]/70 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#5EE6FF]">
            Live Odia STT
          </span>
          <Waves className="h-4 w-4 text-[#A3B565]" />
        </div>
        <p className="mt-4 font-[Noto_Sans_Oriya,Inter,sans-serif] text-xl leading-8 text-[#F6F2EA]">
          ମୋ ତଥ୍ୟ ମୋ ଡିଭାଇସରେ ରହୁ।
        </p>
        <div className="mt-5 flex h-10 items-end gap-1">
          {[18, 28, 16, 34, 24, 38, 20, 30, 14, 26, 36, 22].map((height, index) => (
            <span
              key={index}
              className="w-full rounded-full bg-gradient-to-t from-[#A3B565] to-[#5EE6FF]"
              style={{ height }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 right-8 w-80 rounded-lg border border-white/10 bg-[#081120]/75 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#A3B565]/10 text-[#A3B565]">
            <Database className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#F6F2EA]">Retrieval context</p>
            <p className="text-xs text-[#F6F2EA]/60">FAISS · local embeddings · private corpus</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Speech", "Policy", "Dataset"].map((label) => (
            <span key={label} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-[#F6F2EA]/70">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute left-12 top-1/2 w-60 -translate-y-1/2 rounded-lg border border-[#A3B565]/20 bg-[#A3B565]/10 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Laptop className="h-5 w-5 text-[#A3B565]" />
          <span className="text-sm font-semibold text-[#F6F2EA]">Local device active</span>
        </div>
        <p className="mt-3 text-xs leading-5 text-[#F6F2EA]/60">
          Speech, retrieval, and model inference stay under owner control.
        </p>
      </div>
    </div>
  );
}

function IntelligencePanel({ panelRef }: { panelRef: React.RefObject<HTMLDivElement> }) {
  return (
    <section id="voice" className="relative z-10 container mx-auto mt-10 scroll-mt-24 px-4 md:px-6 lg:px-8">
      <div
        ref={panelRef}
        className="mx-auto grid w-full max-w-6xl gap-0 overflow-hidden rounded-lg border border-white/10 bg-[#0d1728]/80 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#5EE6FF]">Live Odia voice intelligence</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#F6F2EA]">Voice to agent to answer</h2>
            </div>
            <span className="rounded-full border border-[#A3B565]/30 bg-[#A3B565]/10 px-3 py-1 text-xs font-medium text-[#A3B565]">
              Local
            </span>
          </div>
          <div className="space-y-3">
            {[
              "Voice -> STT",
              "Intent -> Agent",
              "RAG -> Local LLM",
              "TTS -> Reply",
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.035] p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#5EE6FF]/10 text-sm font-semibold text-[#5EE6FF]">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-[#F6F2EA]/80">{step}</span>
                <span className="ml-auto h-2 w-16 rounded-full bg-gradient-to-r from-[#A3B565] to-[#5EE6FF]" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[360px] flex-col overflow-hidden bg-[#081120]">
          <div className="relative min-h-[280px] flex-1">
            <video
              className="absolute inset-0 h-full w-full object-cover object-top"
              src="/video/avatar.mp4"
              controls
              playsInline
              preload="metadata"
              aria-label="Live Odia voice intelligence demo video"
            >
              <track kind="captions" />
            </video>
            <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs text-[#F6F2EA]/75 backdrop-blur">
              No cloud dependency
            </div>
          </div>
          <p className="relative max-w-full border-t border-white/10 p-5 text-sm leading-6 text-[#F6F2EA]/75 sm:px-7">
            Private speech, retrieval, and reasoning loops that keep user data on owned hardware.
          </p>
        </div>
      </div>
    </section>
  );
}

function TtsAudioDemo() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeSampleId, setActiveSampleId] = useState(ttsSamples[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");

  const activeSample = ttsSamples.find((sample) => sample.id === activeSampleId) ?? ttsSamples[0];

  const handlePlaySample = async (sampleId: string) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const sample = ttsSamples.find((item) => item.id === sampleId) ?? ttsSamples[0];
    setAudioMessage("");

    if (activeSampleId !== sampleId) {
      setActiveSampleId(sampleId);
      audio.src = sample.src;
      audio.load();
    }

    try {
      if (isPlaying && activeSampleId === sampleId) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setAudioMessage(`Add the real audio file at public${sample.src} to enable playback.`);
    }
  };

  return (
    <section className="container mx-auto px-4 pt-16 md:px-6 lg:px-8">
      <div className="grid gap-5 rounded-lg border border-white/10 bg-[#0d1728]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5EE6FF]/20 bg-[#5EE6FF]/10 px-3 py-1 text-xs font-medium text-[#5EE6FF]">
            <FileAudio className="h-4 w-4" />
            Real TTS audio
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-[#F6F2EA] sm:text-3xl">
            Let visitors hear the model
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#F6F2EA]/70">
            Use real generated MP3, WAV, OGG, or M4A files for Odia TTS samples. Keep playback
            user-initiated, include transcripts, and avoid autoplay.
          </p>
        </div>

        <div className="space-y-3">
          <audio
            ref={audioRef}
            preload="metadata"
            src={activeSample.src}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              setIsPlaying(false);
              setAudioMessage(`Add the real audio file at public${activeSample.src} to enable playback.`);
            }}
          >
            <track kind="captions" />
          </audio>

          {ttsSamples.map((sample) => {
            const isActive = activeSample.id === sample.id;
            const isCurrentPlaying = isActive && isPlaying;

            return (
              <div
                key={sample.id}
                className={`rounded-lg border p-4 transition-colors duration-200 ${
                  isActive
                    ? "border-[#5EE6FF]/30 bg-[#5EE6FF]/10"
                    : "border-white/10 bg-white/[0.035] hover:border-white/20"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#F6F2EA]">{sample.label}</p>
                    <p className="mt-1 text-xs text-[#F6F2EA]/60">
                      {sample.language} · {sample.duration}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#A3B565]/30 bg-[#A3B565]/10 px-4 text-sm font-semibold text-[#F6F2EA] transition-colors duration-200 hover:bg-[#A3B565]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
                    onClick={() => handlePlaySample(sample.id)}
                    aria-label={`${isCurrentPlaying ? "Pause" : "Play"} ${sample.label}`}
                  >
                    {isCurrentPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    {isCurrentPlaying ? "Pause" : "Play sample"}
                  </button>
                </div>
                <p className="mt-4 rounded-md border border-white/10 bg-[#081120]/60 px-3 py-2 font-[Noto_Sans_Oriya,Inter,sans-serif] text-sm leading-6 text-[#F6F2EA]/75">
                  {sample.transcript}
                </p>
              </div>
            );
          })}

          {audioMessage ? (
            <p className="rounded-md border border-[#A3B565]/30 bg-[#A3B565]/10 px-3 py-2 text-sm text-[#F6F2EA]" role="status" aria-live="polite">
              {audioMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HomepageSections() {
  const sections = [
    {
      icon: Mic2,
      title: "Voice Intelligence",
      eyebrow: "Interactive Odia demo",
      description:
        "A speech loop that visualizes Odia input, routes intent through an agent, retrieves local context, and responds with TTS.",
      detail: "Speak -> STT -> Agent -> TTS",
    },
    {
      icon: Cpu,
      title: "Core Stack",
      eyebrow: "Architecture",
      description:
        "A clean pipeline for Voice -> STT -> Agent -> RAG -> Local LLM -> TTS, with visible ownership at every step.",
      detail: "Voice -> STT -> Agent -> RAG -> LLM -> TTS",
    },
    {
      icon: Database,
      title: "Models by OdiaGenAI",
      eyebrow: "Research assets",
      description:
        "STT models, TTS models, datasets, embeddings, and benchmarks presented as credible infrastructure, not feature noise.",
      detail: "STT · TTS · Datasets · Benchmarks",
    },
    {
      icon: Laptop,
      title: "Offline AI",
      eyebrow: "Sovereign compute",
      description:
        "No cloud dependency. Your data stays with you, and sensitive regional-language workflows can run on owned hardware.",
      detail: "Private local inference",
    },
    {
      icon: Boxes,
      title: "Open Ecosystem",
      eyebrow: "Integrations",
      description:
        "Designed to sit comfortably beside Ollama, Whisper, FAISS, LangGraph, vLLM, and llama.cpp.",
      detail: "Ollama · Whisper · FAISS · LangGraph · vLLM",
    },
    {
      icon: BookOpen,
      title: "Community / Research",
      eyebrow: "Open-source platform",
      description:
        "Positioned as Indic AI infrastructure: reproducible, inspectable, and useful for builders, labs, and language communities.",
      detail: "Open research infrastructure",
    },
  ];

  return (
    <section className="container mx-auto px-4 pt-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#5EE6FF]">
          Research-grade cinematic UI
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-[#F6F2EA] sm:text-4xl">
          Quiet intelligence for regional AI sovereignty
        </h2>
        <p className="mt-4 text-base leading-7 text-[#F6F2EA]/70">
          The page structure keeps the strongest message up front: local compute, privacy,
          ownership, and serious Indic-language research.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map(({ icon: Icon, title, eyebrow, description, detail }) => (
          <article
            key={title}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/10 backdrop-blur transition-colors duration-200 hover:border-[#5EE6FF]/30 hover:bg-white/[0.055]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-[#A3B565]/20 bg-[#A3B565]/10 text-[#A3B565]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-white/10 bg-[#1B2433]/70 px-3 py-1 text-xs text-[#F6F2EA]/60">
                {eyebrow}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#F6F2EA]">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#F6F2EA]/70">{description}</p>
            <div className="mt-5 rounded-md border border-[#5EE6FF]/20 bg-[#5EE6FF]/[0.055] px-3 py-2 text-xs font-medium text-[#5EE6FF]">
              {detail}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HeroSection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollPosition = window.pageYOffset;

        if (panelRef.current) {
          panelRef.current.style.transform = `translateY(-${scrollPosition * 0.16}px)`;
        }

        if (heroContentRef.current) {
          const maxScroll = 460;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          heroContentRef.current.style.opacity = opacity.toString();
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#081120]">
      <Navbar />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div
          ref={heroContentRef}
          className="pointer-events-none absolute inset-0 z-10 flex h-screen items-center justify-start"
        >
          <div className="container mx-auto">
            <HeroContent />
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-28 bg-[#050912] pb-20">
        <IntelligencePanel panelRef={panelRef} />
        <TtsAudioDemo />
        <RadialOrbitalTimelineDemo />
        <HybridRouterSection />
        <MeshNetworkSection />
        <ModelCatalogSection />
        <QuickstartSection />
        <ComparisonSection />
      </div>

      <SiteFooter />
    </div>
  );
}

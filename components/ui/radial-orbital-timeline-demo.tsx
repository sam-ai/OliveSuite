"use client";

import {
  AudioLines,
  Bot,
  BrainCircuit,
  Database,
  Gauge,
  Globe2,
  Laptop,
  Mic2,
} from "lucide-react";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Odia STT",
    date: "Live",
    content: "Streaming speech recognition for Odia-first workflows with transcripts ready for agent reasoning.",
    category: "Voice Intelligence",
    icon: Mic2,
    relatedIds: [2, 4, 5],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 2,
    title: "Agent Core",
    date: "Live",
    content: "Task planning, tool routing, and grounded reasoning designed for local and regional-language assistants.",
    category: "Reasoning",
    icon: Bot,
    relatedIds: [1, 3, 4],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "Local LLM",
    date: "Active",
    content: "On-device inference through open model runtimes so sensitive conversations stay under owner control.",
    category: "Offline AI",
    icon: Laptop,
    relatedIds: [2, 4, 7],
    status: "in-progress" as const,
    energy: 78,
  },
  {
    id: 4,
    title: "RAG Memory",
    date: "Active",
    content: "Private retrieval over datasets, documents, and research corpora using local embeddings and vector search.",
    category: "Retrieval",
    icon: Database,
    relatedIds: [1, 2, 3],
    status: "in-progress" as const,
    energy: 82,
  },
  {
    id: 5,
    title: "Odia TTS",
    date: "Demo",
    content: "Real generated voice samples with transcripts and user-controlled playback for accessible product demos.",
    category: "Speech Output",
    icon: AudioLines,
    relatedIds: [1, 6],
    status: "in-progress" as const,
    energy: 68,
  },
  {
    id: 6,
    title: "Benchmarks",
    date: "Next",
    content: "Evaluation views for STT, TTS, embeddings, and agent quality so research claims stay inspectable.",
    category: "OdiaGenAI Models",
    icon: Gauge,
    relatedIds: [5, 8],
    status: "pending" as const,
    energy: 54,
  },
  {
    id: 7,
    title: "Open Runtime",
    date: "Active",
    content: "Integration surface for Ollama, Whisper, FAISS, LangGraph, vLLM, llama.cpp, and custom model services.",
    category: "Open Ecosystem",
    icon: BrainCircuit,
    relatedIds: [3, 4, 8],
    status: "completed" as const,
    energy: 86,
  },
  {
    id: 8,
    title: "Community",
    date: "Next",
    content: "An open-source research platform for Indic AI infrastructure, reproducible datasets, and shared tooling.",
    category: "Research Platform",
    icon: Globe2,
    relatedIds: [6, 7],
    status: "pending" as const,
    energy: 48,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default {
  RadialOrbitalTimelineDemo,
};

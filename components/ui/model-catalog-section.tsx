"use client";

import { useMemo, useState } from "react";
import { Boxes, Check, Copy, Search } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type ModelType = "STT" | "TTS" | "LLM" | "Embedding";
type RunMode = "Single machine" | "Multi-machine";

interface CatalogModel {
  id: string;
  name: string;
  description: string;
  type: ModelType;
  size: string;
  quant: string;
  run: RunMode;
  layers: string;
  ref: string;
}

const catalogModels: CatalogModel[] = [
  {
    id: "whisper-large",
    name: "OdiaGen Whisper Large v3",
    description: "Highest-accuracy Odia speech recognition",
    type: "STT",
    size: "3.1 GB",
    quant: "F16",
    run: "Single machine",
    layers: "—",
    ref: "OdiaGenAI/whisper-large-v3-odia:f16",
  },
  {
    id: "stt-small",
    name: "OdiaGen STT Streaming Small",
    description: "Real-time streaming STT for low-power devices",
    type: "STT",
    size: "466 MB",
    quant: "Q5_1",
    run: "Single machine",
    layers: "—",
    ref: "OdiaGenAI/stt-streaming-small-odia-GGUF:Q5_1",
  },
  {
    id: "tts-v2",
    name: "OdiaGen TTS v2",
    description: "Natural Odia voices for assistants and IVR",
    type: "TTS",
    size: "1.2 GB",
    quant: "F16",
    run: "Single machine",
    layers: "—",
    ref: "OdiaGenAI/tts-v2-odia:f16",
  },
  {
    id: "instruct-4b",
    name: "OdiaGen Instruct 4B",
    description: "Fast general chat and tool use in Odia",
    type: "LLM",
    size: "2.5 GB",
    quant: "Q4_K_M",
    run: "Single machine",
    layers: "—",
    ref: "OdiaGenAI/instruct-4b-odia-GGUF:Q4_K_M",
  },
  {
    id: "instruct-14b",
    name: "OdiaGen Instruct 14B",
    description: "Strong reasoning for agent workflows",
    type: "LLM",
    size: "9.0 GB",
    quant: "Q4_K_M",
    run: "Single machine",
    layers: "—",
    ref: "OdiaGenAI/instruct-14b-odia-GGUF:Q4_K_M",
  },
  {
    id: "odia-32b",
    name: "OdiaGen 32B",
    description: "Best dense quality, layer package for mesh serving",
    type: "LLM",
    size: "20 GB",
    quant: "UD-Q4_K_M",
    run: "Multi-machine",
    layers: "64 layers",
    ref: "OdiaGenAI/odia-32b-GGUF:UD-Q4_K_M",
  },
  {
    id: "odia-72b",
    name: "OdiaGen 72B",
    description: "Research-grade quality across 4+ nodes",
    type: "LLM",
    size: "46 GB",
    quant: "UD-Q4_K_XL",
    run: "Multi-machine",
    layers: "81 layers",
    ref: "OdiaGenAI/odia-72b-GGUF:UD-Q4_K_XL",
  },
  {
    id: "embed-v2",
    name: "IndicEmbed v2",
    description: "Retrieval embeddings for Indic RAG corpora",
    type: "Embedding",
    size: "280 MB",
    quant: "F16",
    run: "Single machine",
    layers: "—",
    ref: "OdiaGenAI/indic-embed-v2:f16",
  },
];

const typeStyles: Record<ModelType, string> = {
  STT: "border-[#5EE6FF]/30 bg-[#5EE6FF]/10 text-[#5EE6FF]",
  TTS: "border-[#A3B565]/30 bg-[#A3B565]/10 text-[#A3B565]",
  LLM: "border-[#C9A7EB]/30 bg-[#C9A7EB]/10 text-[#C9A7EB]",
  Embedding: "border-white/15 bg-white/[0.06] text-[#F6F2EA]/75",
};

const typeFilters: Array<ModelType | "All"> = ["All", "STT", "TTS", "LLM", "Embedding"];
const runFilters: Array<RunMode | "All"> = ["All", "Single machine", "Multi-machine"];

export function ModelCatalogSection() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ModelType | "All">("All");
  const [runFilter, setRunFilter] = useState<RunMode | "All">("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return catalogModels.filter((model) => {
      const matchesQuery =
        q === "" ||
        model.name.toLowerCase().includes(q) ||
        model.description.toLowerCase().includes(q) ||
        model.ref.toLowerCase().includes(q);
      const matchesType = typeFilter === "All" || model.type === typeFilter;
      const matchesRun = runFilter === "All" || model.run === runFilter;

      return matchesQuery && matchesType && matchesRun;
    });
  }, [query, typeFilter, runFilter]);

  const copyRef = async (model: CatalogModel) => {
    try {
      await navigator.clipboard.writeText(model.ref);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = model.ref;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedId(model.id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === model.id ? null : current));
    }, 1600);
  };

  return (
    <section id="models" className="container mx-auto scroll-mt-24 px-4 pt-16 md:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Model Catalog"
        eyebrowIcon={Boxes}
        title="OdiaGenAI models, ready to copy."
        description="Browse STT, TTS, LLM, and embedding models from OdiaGenAI. Copy a ref and serve it on one machine — or split it across your mesh."
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#F6F2EA]/50" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search models or refs"
            aria-label="Search models"
            className="h-10 w-full rounded-md border border-white/10 bg-[#050912]/70 pl-9 pr-3 text-sm text-[#F6F2EA] placeholder:text-[#F6F2EA]/40 focus:border-[#5EE6FF]/40 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {typeFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTypeFilter(option)}
              className={cn(
                "h-8 cursor-pointer rounded-full border px-3 text-xs font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]",
                typeFilter === option
                  ? "border-[#5EE6FF]/40 bg-[#5EE6FF]/15 text-[#5EE6FF]"
                  : "border-white/10 bg-white/[0.03] text-[#F6F2EA]/60 hover:border-white/25 hover:text-[#F6F2EA]",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {runFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRunFilter(option)}
              className={cn(
                "h-8 cursor-pointer rounded-full border px-3 text-xs font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]",
                runFilter === option
                  ? "border-[#A3B565]/40 bg-[#A3B565]/15 text-[#A3B565]"
                  : "border-white/10 bg-white/[0.03] text-[#F6F2EA]/60 hover:border-white/25 hover:text-[#F6F2EA]",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-white/10 bg-[#0d1728]/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-[0.16em] text-[#F6F2EA]/55">
              <th className="px-4 py-3 font-medium">Model</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Size / Quant</th>
              <th className="px-4 py-3 font-medium">Run mode</th>
              <th className="px-4 py-3 font-medium">Layers</th>
              <th className="px-4 py-3 font-medium">Model ref</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((model) => (
              <tr
                key={model.id}
                className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-[#F6F2EA]">{model.name}</p>
                  <p className="mt-0.5 text-xs text-[#F6F2EA]/55">{model.description}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium",
                      typeStyles[model.type],
                    )}
                  >
                    {model.type}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#F6F2EA]/75">
                  {model.size} · {model.quant}
                </td>
                <td className="px-4 py-3 text-xs text-[#F6F2EA]/75">{model.run}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#F6F2EA]/60">{model.layers}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <code className="whitespace-nowrap rounded border border-white/10 bg-[#050912]/70 px-2 py-1 font-mono text-[11px] text-[#5EE6FF]">
                      {model.ref}
                    </code>
                    <button
                      type="button"
                      onClick={() => void copyRef(model)}
                      aria-label={`Copy model ref for ${model.name}`}
                      className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border border-white/10 text-[#F6F2EA]/70 transition-colors duration-200 hover:border-[#5EE6FF]/40 hover:text-[#5EE6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
                    >
                      {copiedId === model.id ? (
                        <Check className="h-3.5 w-3.5 text-[#A3B565]" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-[#F6F2EA]/55">
                  No models match the current filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[#F6F2EA]/55">
        {filtered.length} of {catalogModels.length} models
      </p>
    </section>
  );
}

"use client";

import { ArrowRight, Layers, Network } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

const modelLayers = [
  { name: "L0", size: "3.0B", width: 58 },
  { name: "L1", size: "3.1B", width: 62 },
  { name: "L2", size: "3.2B", width: 66 },
  { name: "L3", size: "3.3B", width: 70 },
  { name: "L4", size: "3.2B", width: 66 },
  { name: "L5", size: "3.1B", width: 62 },
  { name: "L6", size: "3.2B", width: 66 },
  { name: "L7", size: "3.3B", width: 70 },
  { name: "L8", size: "3.1B", width: 62 },
  { name: "L9", size: "3.2B", width: 66 },
];

const meshNodes = [
  { name: "Office server", memory: "192 GB", layers: ["L0", "L1", "L2", "L3"], used: 82 },
  { name: "Workstation", memory: "96 GB", layers: ["L4", "L5"], used: 64 },
  { name: "GPU rig", memory: "32 GB", layers: ["L6", "L7"], used: 71 },
  { name: "Laptop", memory: "24 GB", layers: ["L8"], used: 48 },
  { name: "Mini PC", memory: "8 GB", layers: ["L9"], used: 38 },
];

const splitStages = [
  { range: "L0–26", node: "Office server", detail: "prompt ingest · 4 ms" },
  { range: "L27–53", node: "GPU rig", detail: "activations · 11 ms" },
  { range: "L54–80", node: "Workstation", detail: "tokens return" },
];

const meshBenefits = [
  "Large Indic models get split into smaller pieces",
  "Memory-bound GPUs run smaller layer slices",
  "Layers land on right-sized nodes you own",
];

export function MeshNetworkSection() {
  return (
    <section id="mesh" className="container mx-auto scroll-mt-24 px-4 pt-16 md:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Olive Mesh"
        eyebrowIcon={Network}
        title="Run bigger Indic models without bigger GPUs."
        description="Split one large model across the machines you already own — office server, workstation, GPU rig, laptop, or mini PC. One local API, two mesh modes."
      />

      <div className="mt-8 rounded-lg border border-white/10 bg-[#0d1728]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl lg:p-7">
        <div className="grid items-center gap-6 lg:grid-cols-[0.95fr_auto_1.05fr]">
          <div className="rounded-lg border border-white/10 bg-[#050912]/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#A3B565]" />
                <p className="font-mono text-sm font-semibold text-[#F6F2EA]">OdiaGen-32B</p>
              </span>
              <span className="rounded-full border border-[#A3B565]/30 bg-[#A3B565]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#A3B565]">
                ready to shard
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[#F6F2EA]/60">
              <span>params 32B</span>
              <span>weights 20GB</span>
              <span>layers 10</span>
            </div>
            <div className="mt-4 space-y-1.5">
              {modelLayers.map((layer) => (
                <div key={layer.name} className="flex items-center gap-2">
                  <span className="w-7 shrink-0 font-mono text-[11px] text-[#F6F2EA]/60">{layer.name}</span>
                  <div
                    className="h-3.5 rounded-sm bg-gradient-to-r from-[#A3B565] to-[#5EE6FF]"
                    style={{ width: `${layer.width}%` }}
                  />
                  <span className="font-mono text-[11px] text-[#F6F2EA]/60">{layer.size}</span>
                </div>
              ))}
            </div>
          </div>

          <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-[#5EE6FF]/50 lg:rotate-0" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[#F6F2EA]">Split plan committed</p>
              <p className="font-mono text-[11px] text-[#F6F2EA]/60">10 layers · 5 nodes live</p>
            </div>
            <div className="mt-3 space-y-2">
              {meshNodes.map((node) => (
                <div key={node.name} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-[#F6F2EA]">
                      <span className="h-2 w-2 rounded-full bg-[#A3B565] motion-safe:animate-pulse motion-reduce:animate-none" />
                      {node.name}
                    </span>
                    <span className="font-mono text-[11px] text-[#F6F2EA]/60">{node.memory}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex flex-wrap gap-1">
                      {node.layers.map((layer) => (
                        <span
                          key={layer}
                          className="rounded border border-[#5EE6FF]/25 bg-[#5EE6FF]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#5EE6FF]"
                        >
                          {layer}
                        </span>
                      ))}
                    </div>
                    <div className="ml-auto h-1.5 w-20 shrink-0 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#A3B565] to-[#5EE6FF]"
                        style={{ width: `${node.used}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {meshBenefits.map((text, index) => (
            <div key={text} className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#5EE6FF]/10 font-mono text-[11px] text-[#5EE6FF]">
                {index + 1}
              </span>
              <p className="text-xs leading-5 text-[#F6F2EA]/70">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <article className="rounded-lg border border-white/10 bg-[#0d1728]/80 p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5EE6FF]/20 bg-[#5EE6FF]/10 px-3 py-1 text-xs font-medium text-[#5EE6FF]">
            Router mode
          </div>
          <h3 className="mt-4 text-lg font-semibold text-[#F6F2EA]">The model field selects a node.</h3>
          <p className="mt-2 text-sm leading-6 text-[#F6F2EA]/70">
            Point any OpenAI-compatible client at localhost. Olive Mesh keeps an inventory of warm models
            across your nodes and routes each call to the right one.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-[#050912] p-4 font-mono text-xs leading-6 text-[#F6F2EA]/85">
            <code>{`POST /v1/chat/completions
{
  "model": "odia-instruct-4b",
  "messages": ["..."]
}`}</code>
          </pre>
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#F6F2EA]/70">
            <span className="rounded border border-white/15 bg-[#050912]/70 px-2 py-1">
              client · localhost:7337
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#5EE6FF]/60" />
            <span className="rounded border border-[#A3B565]/30 bg-[#A3B565]/10 px-2 py-1 text-[#A3B565]">
              node-02 · odia-instruct-4b warm
            </span>
          </div>
        </article>

        <article className="rounded-lg border border-white/10 bg-[#0d1728]/80 p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A3B565]/20 bg-[#A3B565]/10 px-3 py-1 text-xs font-medium text-[#A3B565]">
            Split mode
          </div>
          <h3 className="mt-4 text-lg font-semibold text-[#F6F2EA]">Layer ranges become a pipeline.</h3>
          <p className="mt-2 text-sm leading-6 text-[#F6F2EA]/70">
            For models too big for one machine, the planner maps layer ranges onto nodes and streams
            activations between them.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-[#050912] p-4 font-mono text-xs leading-6 text-[#F6F2EA]/85">
            <code>{`POST /v1/chat/completions
{
  "model": "odiagen-72b",
  "messages": ["..."]
}`}</code>
          </pre>
          <div className="mt-4 space-y-2">
            {splitStages.map((stage) => (
              <div key={stage.range} className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="rounded border border-[#5EE6FF]/25 bg-[#5EE6FF]/10 px-2 py-1 text-[#5EE6FF]">
                  {stage.range}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#5EE6FF]/50" />
                <span className="rounded border border-white/15 bg-[#050912]/70 px-2 py-1 text-[#F6F2EA]/80">
                  {stage.node}
                </span>
                <span className="text-[#F6F2EA]/50">{stage.detail}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-[#F6F2EA]/55">
            weights stay local · activations over QUIC · 3 nodes · 46 GB
          </p>
        </article>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const installCommand = "curl -fsSL https://olivesuite.dev/install.sh | bash";

const terminalLines: Array<{ text: string; kind: "cmd" | "out" | "ok" }> = [
  { text: "curl -fsSL https://olivesuite.dev/install.sh | bash", kind: "cmd" },
  { text: "olive setup", kind: "cmd" },
  { text: "› discovering local models... [ok]", kind: "out" },
  { text: "› joined lab mesh (4 peers) [ok]", kind: "out" },
  { text: "› proxy listening on localhost:7337 [ok]", kind: "out" },
  { text: "olive serve --model instruct-4b-odia", kind: "cmd" },
  { text: "stream › OdiaGen-4B · 38 t/s · ttft 142 ms · on-device", kind: "ok" },
];

const codeTabs = [
  {
    id: "python",
    label: "Python",
    code: `from olivesuite import Olive

client = Olive(base_url="http://localhost:7337/v1")

reply = client.chat(
    model="odia-instruct-4b",
    route="hybrid",  # on-device first, cloud fallback
    messages=[{"role": "user", "content": "ନମସ୍କାର, ମୋ ତଥ୍ୟ କେଉଁଠାରେ ରହେ?"}],
)

print(reply.text)`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    code: `import Olive from "@olivesuite/sdk";

const client = new Olive({ baseURL: "http://localhost:7337/v1" });

const reply = await client.chat({
  model: "odia-instruct-4b",
  route: "hybrid", // on-device first, cloud fallback
  messages: [{ role: "user", "content": "ନମସ୍କାର" }],
});

console.log(reply.text);`,
  },
  {
    id: "curl",
    label: "cURL",
    code: `curl http://localhost:7337/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "odia-instruct-4b",
    "route": "hybrid",
    "messages": [
      {"role": "user", "content": "ନମସ୍କାର"}
    ]
  }'`,
  },
];

export function QuickstartSection() {
  const [activeTab, setActiveTab] = useState(codeTabs[0].id);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);

  const activeSnippet = codeTabs.find((tab) => tab.id === activeTab) ?? codeTabs[0];

  const copyText = async (text: string, target: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedTarget(target);
    window.setTimeout(() => {
      setCopiedTarget((current) => (current === target ? null : current));
    }, 1600);
  };

  return (
    <section id="quickstart" className="container mx-auto scroll-mt-24 px-4 pt-16 md:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Quickstart"
        eyebrowIcon={Terminal}
        title="Add Odia voice intelligence in minutes."
        description="One installer, one local API. Serve models on a single machine or across your mesh, then point any OpenAI-compatible client at localhost."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#050912] shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]/80" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]/80" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]/80" />
              <span className="ml-3 font-mono text-[11px] text-[#F6F2EA]/55">zsh · olive</span>
            </div>
            <button
              type="button"
              onClick={() => void copyText(installCommand, "terminal")}
              className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md border border-white/10 px-2.5 font-mono text-[10px] text-[#F6F2EA]/70 transition-colors duration-200 hover:border-[#5EE6FF]/40 hover:text-[#5EE6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
            >
              {copiedTarget === "terminal" ? (
                <Check className="h-3 w-3 text-[#A3B565]" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              COPY
            </button>
          </div>
          <div className="space-y-1.5 overflow-x-auto p-4 font-mono text-xs leading-6 sm:text-[13px]">
            {terminalLines.map((line, index) => (
              <p key={index} className="whitespace-nowrap">
                {line.kind === "cmd" ? <span className="mr-2 select-none text-[#A3B565]">$</span> : null}
                <span
                  className={
                    line.kind === "cmd"
                      ? "text-[#F6F2EA]"
                      : line.kind === "ok"
                        ? "text-[#A3B565]"
                        : "text-[#5EE6FF]/80"
                  }
                >
                  {line.text}
                </span>
              </p>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#050912] shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-3 py-2">
            <div className="flex gap-1">
              {codeTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "h-7 cursor-pointer rounded-md border px-3 font-mono text-[11px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]",
                    activeTab === tab.id
                      ? "border-[#5EE6FF]/40 bg-[#5EE6FF]/15 text-[#5EE6FF]"
                      : "border-transparent text-[#F6F2EA]/60 hover:text-[#F6F2EA]",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void copyText(activeSnippet.code, "snippet")}
              aria-label="Copy code snippet"
              className="grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-white/10 text-[#F6F2EA]/70 transition-colors duration-200 hover:border-[#5EE6FF]/40 hover:text-[#5EE6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5EE6FF]"
            >
              {copiedTarget === "snippet" ? (
                <Check className="h-3.5 w-3.5 text-[#A3B565]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <pre className="min-h-[280px] overflow-x-auto p-4 font-mono text-xs leading-6 text-[#F6F2EA]/85 sm:text-[13px]">
            <code>{activeSnippet.code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

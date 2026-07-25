"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(timelineData[0]?.id ?? null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!autoRotate || prefersReducedMotion) {
      return;
    }

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.18) % 360).toFixed(3)));
    }, 60);

    return () => window.clearInterval(rotationTimer);
  }, [autoRotate, prefersReducedMotion]);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const isOpening = !prev[id];
      const nextState: Record<number, boolean> = {};

      timelineData.forEach((item) => {
        nextState[item.id] = item.id === id ? isOpening : false;
      });

      if (isOpening) {
        setActiveNodeId(id);
        setAutoRotate(false);
        setPulseEffect(Object.fromEntries(getRelatedItems(id).map((relatedId) => [relatedId, true])));
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return nextState;
    });
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current || event.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.52, Math.min(1, 0.52 + 0.48 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) {
      return false;
    }

    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "border-[#A3B565]/40 bg-[#A3B565]/15 text-[#A3B565]";
      case "in-progress":
        return "border-[#5EE6FF]/40 bg-[#5EE6FF]/15 text-[#5EE6FF]";
      case "pending":
        return "border-white/15 bg-white/5 text-[#F6F2EA]/70";
    }
  };

  const activeItem = timelineData.find((item) => item.id === activeNodeId) ?? timelineData[0];

  return (
    <section id="feature-topology" className="relative max-w-full overflow-x-hidden bg-[#050912] py-20 text-[#F6F2EA]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(94,230,255,0.12),transparent_34%),linear-gradient(to_bottom,#050912,#081120)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(246,242,234,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="container relative z-10 mx-auto max-w-[100vw] overflow-hidden px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[310px] text-center sm:max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#5EE6FF]">
            Feature topology
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-5xl">
            <span className="block sm:inline">Every OliveSuite</span>{" "}
            <span className="block sm:inline">capability orbits</span>{" "}
            <span className="block sm:inline">local intelligence</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[310px] text-sm leading-7 text-[#F6F2EA]/70 sm:max-w-3xl sm:text-base">
            Explore how speech, retrieval, local models, evaluation, and open integrations connect
            into one offline-first Indic AI system.
          </p>
        </div>

        <div className="relative left-[50vw] mt-12 grid w-[240px] max-w-[calc(100vw-32px)] -translate-x-1/2 gap-4 overflow-hidden sm:w-[340px] lg:hidden">
          {timelineData.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.id}
                className="w-full max-w-full overflow-hidden whitespace-normal border-white/10 bg-white/[0.035] text-[#F6F2EA]"
                style={{ overflowWrap: "anywhere" }}
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-md border border-[#A3B565]/25 bg-[#A3B565]/10 text-[#A3B565]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <Badge className={`hidden sm:inline-flex ${getStatusStyles(item.status)}`}>
                      {item.status === "completed"
                        ? "LIVE"
                        : item.status === "in-progress"
                          ? "IN BUILD"
                          : "NEXT"}
                    </Badge>
                  </div>
                  <CardTitle className="pt-4 text-xl leading-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="max-w-full break-words text-sm leading-6 text-[#F6F2EA]/70">{item.content}</p>
                  <div className="mt-4 h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#A3B565] to-[#5EE6FF]"
                      style={{ width: `${item.energy}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div
          className="relative mx-auto mt-12 hidden h-[760px] max-w-6xl items-center justify-center lg:flex"
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <div
            className="absolute flex h-full w-full items-center justify-center"
            ref={orbitRef}
            style={{ perspective: "1000px" }}
          >
            <div className="absolute grid h-24 w-24 place-items-center rounded-full border border-[#5EE6FF]/30 bg-[#5EE6FF]/10 shadow-[0_0_90px_rgba(94,230,255,0.22)]">
              <div className="absolute h-32 w-32 rounded-full border border-[#5EE6FF]/15 motion-safe:animate-ping motion-reduce:animate-none" />
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#F6F2EA]/90 text-[#081120]">
                <Zap className="h-5 w-5" />
              </div>
            </div>

            <div className="absolute h-[440px] w-[440px] rounded-full border border-[#5EE6FF]/15" />
            <div className="absolute h-[620px] w-[620px] rounded-full border border-white/5" />

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="absolute transition-all duration-700"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: isExpanded ? 200 : position.zIndex,
                    opacity: isExpanded ? 1 : position.opacity,
                  }}
                >
                  <div
                    className={`pointer-events-none absolute rounded-full -inset-1 ${
                      isPulsing ? "motion-safe:animate-pulse" : ""
                    }`}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(94,230,255,0.22) 0%, rgba(94,230,255,0) 70%)",
                      width: `${item.energy * 0.55 + 42}px`,
                      height: `${item.energy * 0.55 + 42}px`,
                      left: `-${(item.energy * 0.55 + 2) / 2}px`,
                      top: `-${(item.energy * 0.55 + 2) / 2}px`,
                    }}
                  />

                  <button
                    ref={(element) => {
                      nodeRefs.current[item.id] = element;
                    }}
                    type="button"
                    className={`relative grid h-12 w-12 cursor-pointer place-items-center rounded-full border-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5EE6FF] ${
                      isExpanded
                        ? "scale-150 border-[#F6F2EA] bg-[#F6F2EA] text-[#081120] shadow-lg shadow-[#5EE6FF]/20"
                        : isRelated
                          ? "border-[#5EE6FF] bg-[#5EE6FF]/30 text-[#F6F2EA]"
                          : "border-white/30 bg-[#081120] text-[#F6F2EA] hover:border-[#A3B565]"
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleItem(item.id);
                    }}
                    aria-expanded={isExpanded}
                    aria-label={`Show ${item.title} feature details`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>

                  <div
                    className={`absolute left-1/2 top-16 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300 ${
                      isExpanded ? "scale-125 text-[#F6F2EA]" : "text-[#F6F2EA]/70"
                    }`}
                  >
                    {item.title}
                  </div>

                  {isExpanded ? (
                    <Card className="absolute left-1/2 top-24 w-72 -translate-x-1/2 overflow-visible border-white/15 bg-[#081120]/92 text-[#F6F2EA] shadow-2xl shadow-black/30 backdrop-blur-xl">
                      <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/40" />
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <Badge className={getStatusStyles(item.status)}>
                            {item.status === "completed"
                              ? "LIVE"
                              : item.status === "in-progress"
                                ? "IN BUILD"
                                : "NEXT"}
                          </Badge>
                          <span className="text-xs font-mono text-[#F6F2EA]/50">{item.date}</span>
                        </div>
                        <CardTitle className="pt-2 text-base">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 pt-0 text-xs leading-5 text-[#F6F2EA]/75">
                        <p>{item.content}</p>

                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="flex items-center">
                              <Zap className="mr-1 h-3 w-3" />
                              Readiness
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#A3B565] to-[#5EE6FF]"
                              style={{ width: `${item.energy}%` }}
                            />
                          </div>
                        </div>

                        {item.relatedIds.length > 0 ? (
                          <div className="mt-4 border-t border-white/10 pt-3">
                            <div className="mb-2 flex items-center">
                              <Link className="mr-1 h-3 w-3 text-[#F6F2EA]/70" />
                              <h4 className="text-xs font-medium uppercase tracking-wider text-[#F6F2EA]/70">
                                Connected nodes
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find((candidate) => candidate.id === relatedId);

                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="h-7 cursor-pointer rounded-full border-white/15 bg-transparent px-2 py-0 text-xs text-[#F6F2EA]/80 transition-colors duration-200 hover:bg-white/10 hover:text-[#F6F2EA]"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title}
                                    <ArrowRight className="ml-1 h-3 w-3 text-[#F6F2EA]/60" />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute bottom-8 left-1/2 w-full max-w-xl -translate-x-1/2 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-center backdrop-blur">
            <p className="text-sm font-medium text-[#F6F2EA]">{activeItem?.category ?? "Feature system"}</p>
            <p className="mt-1 text-xs leading-5 text-[#F6F2EA]/60">
              Select a node to pause the orbit and inspect connected parts of the stack.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

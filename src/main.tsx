import React from "react";
import ReactDOM from "react-dom/client";
import { HeroSectionBasic } from "@/components/ui/galaxy-interactive-hero-section-demo";
import { RadialOrbitalTimelineDemo } from "@/components/ui/radial-orbital-timeline-demo";
import "./index.css";

const App = window.location.pathname === "/features" ? RadialOrbitalTimelineDemo : HeroSectionBasic;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

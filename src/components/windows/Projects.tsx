"use client";

import { useState } from "react";

const projects = [
  {
    name: "CampusNest",
    description:
      "University housing platform with real-time messaging and university email verification.",
    tags: ["Go", "Next.js", "PostgreSQL", "WebSockets"],
    url: "#",
    status: "active",
  },
  {
    name: "SimplifyJobsDaemon",
    description:
      "Automated resume tailoring daemon that generates job-specific resumes on application.",
    tags: ["Go", "Claude API", "Automation"],
    url: "#",
    status: "active",
  },
  {
    name: "SteamLensAI",
    description:
      "GPU-accelerated NLP pipeline processing 400k+ Steam reviews for sentiment and topic analysis.",
    tags: ["Python", "CUDA", "Transformers", "Dask"],
    url: "#",
    status: "complete",
  },
  {
    name: "NYC Transit Hub",
    description:
      "Real-time MTA tracking app built with TypeScript and Next.js. Hackathon winner.",
    tags: ["TypeScript", "Next.js", "MTA API"],
    url: "#",
    status: "complete",
  },
  {
    name: "PatchBotAI",
    description:
      "Agentic debugging system that autonomously identifies and patches code issues.",
    tags: ["Python", "LLM", "Agents"],
    url: "#",
    status: "complete",
  },
  {
    name: "LocalPilotAI",
    description:
      "Offline coding assistant running local LLMs for air-gapped development environments.",
    tags: ["Python", "Ollama", "LLM"],
    url: "#",
    status: "complete",
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        overflowY: "auto",
        height: "100%",
        scrollbarWidth: "none",
      }}
    >
      <style>{`
        .projects-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      {projects.map((p, i) => (
        <div
          key={p.name}
          className="projects-scroll"
          style={{
            background:
              hovered === i
                ? "#414559"
                : "rgba(65,69,89,0.6)",
            border: `1px solid ${hovered === i ? "#626880" : "#51576d"}`,
            borderRadius: 5,
            padding: "10px 12px",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
            flexShrink: 0,
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {
            if (p.url !== "#") window.open(p.url, "_blank");
          }}
        >
          {/* Row 1: name + status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{ color: "#c6d0f5", fontSize: "0.85rem", fontWeight: 600 }}
            >
              {p.name}
            </span>
            <span
              style={{
                background:
                  p.status === "active"
                    ? "rgba(166,209,137,0.15)"
                    : "rgba(140,170,238,0.15)",
                color: p.status === "active" ? "#a6d189" : "#8caaee",
                border: `1px solid ${p.status === "active" ? "rgba(166,209,137,0.3)" : "rgba(140,170,238,0.3)"}`,
                borderRadius: 3,
                padding: "2px 6px",
                fontSize: "0.65rem",
                lineHeight: 1.3,
              }}
            >
              {p.status}
            </span>
          </div>

          {/* Row 2: description */}
          <div
            style={{
              color: "#a5adce",
              fontSize: "0.75rem",
              lineHeight: 1.5,
              marginTop: 4,
            }}
          >
            {p.description}
          </div>

          {/* Row 3: tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              marginTop: 4,
            }}
          >
            {p.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#414559",
                  border: "1px solid #51576d",
                  borderRadius: 3,
                  padding: "1px 6px",
                  fontSize: "0.65rem",
                  color: "#b5bfe2",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

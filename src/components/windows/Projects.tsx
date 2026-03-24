"use client";

import { useState } from "react";

const projects = [
    {
        name: "CampusNest",
        description:
            "University housing platform with .edu auth, real-time messaging, roommate matching, and marketplace.",
        tags: ["Go", "Next.js", "PostgreSQL", "WebSockets"],
        url: "#",
        status: "active",
    },
    {
        name: "SimplifyJobsDaemon",
        description:
            "Linux daemon that polls job feeds, runs a local LLM to select projects, and generates tailored resumes automatically.",
        tags: ["Go", "Python", "Ollama", "Claude API"],
        url: "#",
        status: "active",
    },
    {
        name: "SteamLensAI",
        description:
            "Distributed NLP pipeline processing 1.2M Steam reviews with 10x GPU speedup. Dataset published on Kaggle.",
        tags: ["Python", "Dask", "CUDA", "Transformers"],
        url: "#",
        status: "complete",
    },
    {
        name: "NYC Transit Hub",
        description:
            "Real-time MTA dashboard with live GTFS-RT feeds, Mapbox map, and subway/LIRR/Metro-North tracking. Hackathon winner.",
        tags: ["Next.js", "TypeScript", "Mapbox GL"],
        url: "#",
        status: "complete",
    },
    {
        name: "PatchbotAI",
        description:
            "AI coding agent built from scratch using Gemini function calling with sandboxed code execution.",
        tags: ["Python", "Gemini API", "Agents"],
        url: "#",
        status: "complete",
    },
    {
        name: "LocalPilotAI",
        description:
            "Offline VSCode extension for AI autocompletion via Ollama. Zero API calls, sub-200ms latency.",
        tags: ["TypeScript", "VSCode API", "Ollama"],
        url: "#",
        status: "complete",
    },
    {
        name: "Numerai Pipeline",
        description:
            "ML pipeline on a 2.7M-sample hedge fund dataset. LightGBM + CUDA, 10x speedup, Sharpe ratio 2.42.",
        tags: ["Python", "LightGBM", "CUDA", "scikit-learn"],
        url: "#",
        status: "complete",
    },
    {
        name: "Personality Prediction",
        description:
            "NLP pipeline predicting OCEAN traits from resumes. 74% accuracy with Logistic Regression. Published at ICRMIR-2023.",
        tags: ["Python", "spaCy", "NLTK", "scikit-learn"],
        url: "#",
        status: "complete",
    },
];

const statusColors: Record<string, { bg: string; color: string }> = {
    active: { bg: "#0d2518", color: "#16A34A" },
    complete: { bg: "#1a2545", color: "#2563EB" },
};

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
            {projects.map((p, i) => {
                const sc = statusColors[p.status] ?? statusColors.complete;
                return (
                    <div
                        key={p.name}
                        className="projects-scroll"
                        style={{
                            background: "#1a1a2e",
                            border: "2px solid #e2e0f0",
                            borderRadius: 6,
                            padding: "10px 12px",
                            cursor: "pointer",
                            transition: "all 0.1s",
                            flexShrink: 0,
                            boxShadow: hovered === i
                                ? "4px 4px 0px #4a4870"
                                : "2px 2px 0px #4a4870",
                            transform: hovered === i
                                ? "translate(-2px, -2px)"
                                : "translate(0, 0)",
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
                                style={{ color: "#e8e5f5", fontSize: "0.78rem", fontWeight: 800 }}
                            >
                                {p.name}
                            </span>
                            <span
                                style={{
                                    background: sc.bg,
                                    color: sc.color,
                                    border: "2px solid #e2e0f0",
                                    borderRadius: 3,
                                    padding: "2px 6px",
                                    fontSize: "0.6rem",
                                    lineHeight: 1.3,
                                    fontWeight: 700,
                                }}
                            >
                                {p.status}
                            </span>
                        </div>

                        {/* Row 2: description */}
                        <div
                            style={{
                                color: "#9896b8",
                                fontSize: "0.68rem",
                                lineHeight: 1.5,
                                marginTop: 4,
                                fontWeight: 500,
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
                                        background: "#12121e",
                                        border: "2px solid #e2e0f0",
                                        borderRadius: 3,
                                        padding: "1px 6px",
                                        fontSize: "0.62rem",
                                        color: "#e8e5f5",
                                        fontWeight: 600,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

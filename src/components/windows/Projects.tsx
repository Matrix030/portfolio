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
                            style={{ color: "#c6d0f5", fontSize: "0.78rem", fontWeight: 600 }}
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
                                fontSize: "0.6rem",
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
                            fontSize: "0.68rem",
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
                                    fontSize: "0.62rem",
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

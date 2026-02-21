"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

// --- Types ---

interface NodeDatum extends d3.SimulationNodeDatum {
    id: string;
    type: "project" | "skill";
    cluster: string;
    color: string;
}

interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
    source: string | NodeDatum;
    target: string | NodeDatum;
}

// --- Cluster targets ---
// 6 clusters arranged in a 3x2 grid
const clusterPositions: Record<string, { x: number; y: number }> = {
    webdev: { x: 0.22, y: 0.28 },
    ml: { x: 0.5, y: 0.18 },
    aitools: { x: 0.78, y: 0.28 },
    distributed: { x: 0.22, y: 0.72 },
    infra: { x: 0.5, y: 0.82 },
    research: { x: 0.78, y: 0.72 },
};

// --- Cluster colors (IBM colorblind-safe palette) ---
// Safe for deuteranopia/protanopia — avoids red/green confusion
// Clusters: blue, amber, magenta, vivid orange, purple, white
const clusterColors: Record<string, string> = {
    webdev: "#648fff", // blue
    ml: "#ffb000", // amber
    aitools: "#dc267f", // magenta
    distributed: "#fe6100", // vivid orange
    infra: "#785ef0", // purple
    research: "#c8c8c8", // light gray
};

const PROJECT_COLOR = "#44cfcb"; // cyan — distinct from all cluster colors

// --- Data ---

const rawNodes: NodeDatum[] = [
    // ── Projects ──────────────────────────────────────────────────────
    { id: "CampusNest", type: "project", cluster: "webdev", color: PROJECT_COLOR },
    { id: "NYC Transit Hub", type: "project", cluster: "webdev", color: PROJECT_COLOR },
    { id: "SteamLensAI", type: "project", cluster: "distributed", color: PROJECT_COLOR },
    { id: "Numerai Pipeline", type: "project", cluster: "research", color: PROJECT_COLOR },
    { id: "PatchbotAI", type: "project", cluster: "aitools", color: PROJECT_COLOR },
    { id: "LocalPilotAI", type: "project", cluster: "aitools", color: PROJECT_COLOR },
    { id: "SimplifyJobsDaemon", type: "project", cluster: "aitools", color: PROJECT_COLOR },
    { id: "Personality Prediction", type: "project", cluster: "research", color: PROJECT_COLOR },

    // ── Web Dev skills ─────────────────────────────────────────────────
    { id: "Next.js", type: "skill", cluster: "webdev", color: clusterColors.webdev },
    { id: "React", type: "skill", cluster: "webdev", color: clusterColors.webdev },
    { id: "TypeScript", type: "skill", cluster: "webdev", color: clusterColors.webdev },
    { id: "Django", type: "skill", cluster: "webdev", color: clusterColors.webdev },
    { id: "Go", type: "skill", cluster: "webdev", color: clusterColors.webdev },
    { id: "Node.js", type: "skill", cluster: "webdev", color: clusterColors.webdev },
    { id: "Mapbox GL", type: "skill", cluster: "webdev", color: clusterColors.webdev },

    // ── ML skills ──────────────────────────────────────────────────────
    { id: "PyTorch", type: "skill", cluster: "ml", color: clusterColors.ml },
    { id: "Transformers", type: "skill", cluster: "ml", color: clusterColors.ml },
    { id: "Python", type: "skill", cluster: "ml", color: clusterColors.ml },
    { id: "CUDA", type: "skill", cluster: "ml", color: clusterColors.ml },
    { id: "scikit-learn", type: "skill", cluster: "ml", color: clusterColors.ml },
    { id: "LightGBM", type: "skill", cluster: "ml", color: clusterColors.ml },

    // ── AI Tools skills ────────────────────────────────────────────────
    { id: "Ollama", type: "skill", cluster: "aitools", color: clusterColors.aitools },
    { id: "Gemini API", type: "skill", cluster: "aitools", color: clusterColors.aitools },
    { id: "Function Calling", type: "skill", cluster: "aitools", color: clusterColors.aitools },
    { id: "VSCode API", type: "skill", cluster: "aitools", color: clusterColors.aitools },
    { id: "Claude API", type: "skill", cluster: "aitools", color: clusterColors.aitools },

    // ── Distributed skills ─────────────────────────────────────────────
    { id: "Dask", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "PostgreSQL", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "MongoDB", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Redis", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "ETL Pipelines", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Parquet", type: "skill", cluster: "distributed", color: clusterColors.distributed },

    // ── Infra skills ───────────────────────────────────────────────────
    { id: "AWS", type: "skill", cluster: "infra", color: clusterColors.infra },
    { id: "Docker", type: "skill", cluster: "infra", color: clusterColors.infra },
    { id: "CI/CD", type: "skill", cluster: "infra", color: clusterColors.infra },
    { id: "Linux", type: "skill", cluster: "infra", color: clusterColors.infra },
    { id: "Terraform", type: "skill", cluster: "infra", color: clusterColors.infra },

    // ── Research skills ────────────────────────────────────────────────
    { id: "NLP", type: "skill", cluster: "research", color: clusterColors.research },
    { id: "spaCy / NLTK", type: "skill", cluster: "research", color: clusterColors.research },
    { id: "GPU Optimization", type: "skill", cluster: "research", color: clusterColors.research },
    { id: "Time-Series ML", type: "skill", cluster: "research", color: clusterColors.research },
];

const rawLinks: LinkDatum[] = [
    // CampusNest (v2 Go + Next.js)
    { source: "CampusNest", target: "Go" },
    { source: "CampusNest", target: "Next.js" },
    { source: "CampusNest", target: "TypeScript" },
    { source: "CampusNest", target: "PostgreSQL" },
    { source: "CampusNest", target: "AWS" },
    { source: "CampusNest", target: "Docker" },
    { source: "CampusNest", target: "CI/CD" },
    { source: "CampusNest", target: "Django" },

    // NYC Transit Hub
    { source: "NYC Transit Hub", target: "Next.js" },
    { source: "NYC Transit Hub", target: "React" },
    { source: "NYC Transit Hub", target: "TypeScript" },
    { source: "NYC Transit Hub", target: "Mapbox GL" },
    { source: "NYC Transit Hub", target: "Node.js" },

    // SteamLensAI
    { source: "SteamLensAI", target: "Python" },
    { source: "SteamLensAI", target: "Dask" },
    { source: "SteamLensAI", target: "CUDA" },
    { source: "SteamLensAI", target: "PyTorch" },
    { source: "SteamLensAI", target: "Transformers" },
    { source: "SteamLensAI", target: "Parquet" },
    { source: "SteamLensAI", target: "ETL Pipelines" },
    { source: "SteamLensAI", target: "GPU Optimization" },

    // Numerai Pipeline
    { source: "Numerai Pipeline", target: "Python" },
    { source: "Numerai Pipeline", target: "LightGBM" },
    { source: "Numerai Pipeline", target: "scikit-learn" },
    { source: "Numerai Pipeline", target: "PyTorch" },
    { source: "Numerai Pipeline", target: "CUDA" },
    { source: "Numerai Pipeline", target: "Time-Series ML" },
    { source: "Numerai Pipeline", target: "GPU Optimization" },

    // PatchbotAI
    { source: "PatchbotAI", target: "Python" },
    { source: "PatchbotAI", target: "Gemini API" },
    { source: "PatchbotAI", target: "Function Calling" },

    // LocalPilotAI
    { source: "LocalPilotAI", target: "TypeScript" },
    { source: "LocalPilotAI", target: "Ollama" },
    { source: "LocalPilotAI", target: "VSCode API" },

    // SimplifyJobsDaemon
    { source: "SimplifyJobsDaemon", target: "Go" },
    { source: "SimplifyJobsDaemon", target: "Python" },
    { source: "SimplifyJobsDaemon", target: "Ollama" },
    { source: "SimplifyJobsDaemon", target: "Claude API" },
    { source: "SimplifyJobsDaemon", target: "Linux" },

    // Personality Prediction
    { source: "Personality Prediction", target: "Python" },
    { source: "Personality Prediction", target: "NLP" },
    { source: "Personality Prediction", target: "spaCy / NLTK" },
    { source: "Personality Prediction", target: "scikit-learn" },
];

const legendEntries = [
    { label: "Web Dev", color: clusterColors.webdev },
    { label: "ML / AI", color: clusterColors.ml },
    { label: "AI Tools", color: clusterColors.aitools },
    { label: "Distributed Systems", color: clusterColors.distributed },
    { label: "Infra / DevOps", color: clusterColors.infra },
    { label: "Research", color: clusterColors.research },
    { label: "Project (node)", color: PROJECT_COLOR },
];

function nid(d: string | NodeDatum): string {
    return typeof d === "string" ? d : d.id;
}

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

export default function TechGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const hoveredRef = useRef<string | null>(null);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        name: string;
        connected: string[];
    } | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const svg = svgRef.current;
        if (!container || !svg) return;

        const nodes: NodeDatum[] = rawNodes.map((d) => ({ ...d }));
        const links: LinkDatum[] = rawLinks.map((d) => ({ ...d }));

        let { width, height } = container.getBoundingClientRect();

        const svgSel = d3.select(svg);
        svgSel.selectAll("*").remove();

        // --- Defs ---
        const defs = svgSel.append("defs");

        // Glow filter
        const glow = defs
            .append("filter")
            .attr("id", "glow")
            .attr("x", "-50%")
            .attr("y", "-50%")
            .attr("width", "200%")
            .attr("height", "200%");
        glow.append("feGaussianBlur").attr("stdDeviation", "2.5").attr("result", "coloredBlur");
        const glowMerge = glow.append("feMerge");
        glowMerge.append("feMergeNode").attr("in", "coloredBlur");
        glowMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Background radial gradient
        const bgGrad = defs
            .append("radialGradient")
            .attr("id", "bg-radial")
            .attr("cx", "50%")
            .attr("cy", "50%")
            .attr("r", "50%");
        bgGrad.append("stop").attr("offset", "0%").attr("stop-color", "rgba(186,187,241,0.03)");
        bgGrad.append("stop").attr("offset", "100%").attr("stop-color", "transparent");

        // Background
        svgSel.append("rect").attr("width", width).attr("height", height).attr("fill", "#232634");
        svgSel.append("rect").attr("width", width).attr("height", height).attr("fill", "url(#bg-radial)");

        const linkGroup = svgSel.append("g");
        const nodeGroup = svgSel.append("g");
        const labelGroup = svgSel.append("g").style("pointer-events", "none");

        // --- Links ---
        const linkSel = linkGroup
            .selectAll<SVGLineElement, LinkDatum>("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 0.8)
            .each(function(l) {
                const src = nodes.find((n) => n.id === nid(l.source));
                d3.select(this).attr("stroke", hexToRgba(src?.color ?? "#626880", 0.2));
            });

        // --- Nodes ---
        const nodeSel = nodeGroup
            .selectAll<SVGCircleElement, NodeDatum>("circle")
            .data(nodes, (d) => d.id)
            .join("circle")
            .attr("r", (d) => (d.type === "project" ? 10 : 5))
            .attr("fill", (d) => d.color)
            .attr("opacity", (d) => (d.type === "project" ? 0.9 : 0.85))
            .attr("filter", "url(#glow)")
            .style("cursor", "grab");

        // --- Hover labels (hidden by default) ---
        const labelSel = labelGroup
            .selectAll<SVGTextElement, NodeDatum>("text")
            .data(nodes, (d) => d.id)
            .join("text")
            .text((d) => d.id)
            .attr("text-anchor", "middle")
            .attr("dy", (d) => (d.type === "project" ? -15 : -10))
            .attr("fill", "#c6d0f5")
            .attr("font-size", "0.65rem")
            .attr(
                "font-family",
                '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace'
            )
            .attr("opacity", 0);

        // --- Hover handlers ---
        nodeSel
            .on("mouseenter", function(event, d) {
                hoveredRef.current = d.id;

                const connectedIds = new Set<string>();
                links.forEach((l) => {
                    const sid = nid(l.source);
                    const tid = nid(l.target);
                    if (sid === d.id) connectedIds.add(tid);
                    if (tid === d.id) connectedIds.add(sid);
                });

                // Highlight connected links
                linkSel
                    .attr("stroke", (l) => {
                        const sid = nid(l.source);
                        const tid = nid(l.target);
                        if (sid === d.id || tid === d.id) {
                            return hexToRgba(d.color, 0.6);
                        }
                        const src = nodes.find((n) => n.id === sid);
                        return hexToRgba(src?.color ?? "#626880", 0.2);
                    })
                    .attr("stroke-width", (l) =>
                        nid(l.source) === d.id || nid(l.target) === d.id ? 1.5 : 0.8
                    );

                // Scale hovered node
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("r", d.type === "project" ? 13 : 7)
                    .attr("opacity", 1);

                // Show labels for hovered node + neighbors
                labelSel
                    .transition()
                    .duration(150)
                    .attr("opacity", (n) =>
                        n.id === d.id || connectedIds.has(n.id) ? 1 : 0
                    );

                // Tooltip for projects only
                if (d.type === "project") {
                    const [mx, my] = d3.pointer(event, container);
                    setTooltip({
                        x: mx,
                        y: my,
                        name: d.id,
                        connected: Array.from(connectedIds),
                    });
                }
            })
            .on("mousemove", function(event) {
                if (hoveredRef.current) {
                    const nd = nodes.find((n) => n.id === hoveredRef.current);
                    if (nd?.type === "project") {
                        const [mx, my] = d3.pointer(event, container);
                        setTooltip((prev) => (prev ? { ...prev, x: mx, y: my } : null));
                    }
                }
            })
            .on("mouseleave", function(_, d) {
                hoveredRef.current = null;
                setTooltip(null);

                // Reset links
                linkSel
                    .attr("stroke-width", 0.8)
                    .each(function(l) {
                        const src = nodes.find((n) => n.id === nid(l.source));
                        d3.select(this).attr("stroke", hexToRgba(src?.color ?? "#626880", 0.2));
                    });

                // Reset node
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("r", d.type === "project" ? 10 : 5)
                    .attr("opacity", d.type === "project" ? 0.9 : 0.85);

                // Hide all labels
                labelSel.transition().duration(150).attr("opacity", 0);
            });

        // --- Clustering force ---
        function clusterForce(alpha: number) {
            nodes.forEach((node) => {
                const target = clusterPositions[node.cluster];
                if (!target) return;
                node.vx! += (target.x * width - node.x!) * 0.08 * alpha;
                node.vy! += (target.y * height - node.y!) * 0.08 * alpha;
            });
        }

        // --- Simulation ---
        const simulation = d3
            .forceSimulation<NodeDatum>(nodes)
            .force(
                "link",
                d3
                    .forceLink<NodeDatum, LinkDatum>(links)
                    .id((d) => d.id)
                    .distance(80)
                    .strength(0.4)
            )
            .force("charge", d3.forceManyBody().strength(-160))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force(
                "collide",
                d3.forceCollide<NodeDatum>().radius((d) => (d.type === "project" ? 22 : 12))
            )
            .force("cluster", () => clusterForce(simulation.alpha()))
            .alphaDecay(0.02)
            .velocityDecay(0.4);

        simulation.on("tick", () => {
            linkSel
                .attr("x1", (d) => (d.source as NodeDatum).x!)
                .attr("y1", (d) => (d.source as NodeDatum).y!)
                .attr("x2", (d) => (d.target as NodeDatum).x!)
                .attr("y2", (d) => (d.target as NodeDatum).y!);

            nodeSel.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

            labelSel.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
        });

        // Idle drift
        const driftInterval = setInterval(() => {
            if (simulation.alpha() < 0.01) {
                simulation.alpha(0.03).restart();
            }
        }, 5000);

        // --- Drag ---
        const drag = d3
            .drag<SVGCircleElement, NodeDatum>()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

        nodeSel.call(drag);

        // --- Resize ---
        const ro = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            if (rect.width === 0 || rect.height === 0) return;
            width = rect.width;
            height = rect.height;
            svgSel.selectAll("rect").attr("width", width).attr("height", height);

            simulation.stop();
            simulation
                .force(
                    "link",
                    d3
                        .forceLink<NodeDatum, LinkDatum>(links)
                        .id((d) => d.id)
                        .distance(80)
                        .strength(0.4)
                )
                .force("charge", d3.forceManyBody().strength(-160))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force(
                    "collide",
                    d3.forceCollide<NodeDatum>().radius((d) => (d.type === "project" ? 22 : 12))
                )
                .force("cluster", () => clusterForce(simulation.alpha()))
                .alpha(0.3)
                .restart();
        });
        ro.observe(container);

        return () => {
            simulation.stop();
            clearInterval(driftInterval);
            ro.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Legend */}
            <div
                style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 10,
                    background: "rgba(41,44,60,0.85)",
                    border: "1px solid #51576d",
                    borderRadius: 5,
                    padding: "0.6rem 0.875rem",
                    fontFamily:
                        '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
                }}
            >
                <div
                    style={{
                        color: "#737994",
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                    }}
                >
                    knowledge graph
                </div>
                {legendEntries.map((e) => (
                    <div
                        key={e.label}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 4,
                        }}
                    >
                        <div
                            style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                background: e.color,
                                boxShadow: `0 0 6px ${hexToRgba(e.color, 0.7)}`,
                                flexShrink: 0,
                            }}
                        />
                        <span style={{ color: "#a5adce", fontSize: "0.68rem" }}>{e.label}</span>
                    </div>
                ))}
            </div>

            <svg
                ref={svgRef}
                style={{ display: "block", width: "100%", height: "100%" }}
            />

            {/* Tooltip (projects only) */}
            {tooltip && (
                <div
                    style={{
                        position: "absolute",
                        left: tooltip.x + 14,
                        top: tooltip.y - 10,
                        background: "rgba(41,44,60,0.95)",
                        border: "1px solid #51576d",
                        borderRadius: 5,
                        padding: "6px 10px",
                        fontSize: "0.7rem",
                        fontFamily:
                            '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        zIndex: 10,
                    }}
                >
                    <div style={{ color: "#c6d0f5", fontSize: "0.7rem", fontWeight: 600 }}>
                        {tooltip.name}
                    </div>
                    {tooltip.connected.map((s) => (
                        <div key={s} style={{ color: "#a5adce", fontSize: "0.65rem" }}>
                            {s}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

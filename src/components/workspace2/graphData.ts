import * as d3 from "d3";

// --- Types ---

export interface NodeDatum extends d3.SimulationNodeDatum {
    id: string;
    type: "project" | "skill";
    cluster: string;
    color: string;
}

export interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
    source: string | NodeDatum;
    target: string | NodeDatum;
}

// --- Cluster targets ---
// 6 clusters arranged in a 3x2 grid
export const clusterPositions: Record<string, { x: number; y: number }> = {
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
export const clusterColors: Record<string, string> = {
    webdev: "#648fff", // blue
    ml: "#ffb000", // amber
    aitools: "#dc267f", // magenta
    distributed: "#fe6100", // vivid orange
    infra: "#785ef0", // purple
    research: "#c8c8c8", // light gray
};

export const PROJECT_COLOR = "#44cfcb"; // cyan — distinct from all cluster colors

// --- Data ---

export const rawNodes: NodeDatum[] = [
    // ── Projects ──────────────────────────────────────────────────────
    { id: "CampusNest", type: "project", cluster: "webdev", color: PROJECT_COLOR },
    { id: "NYC Transit Hub", type: "project", cluster: "webdev", color: PROJECT_COLOR },
    { id: "SteamLensAI", type: "project", cluster: "distributed", color: PROJECT_COLOR },
    { id: "Numerai Pipeline", type: "project", cluster: "research", color: PROJECT_COLOR },
    { id: "PatchbotAI", type: "project", cluster: "aitools", color: PROJECT_COLOR },
    { id: "LocalPilotAI", type: "project", cluster: "aitools", color: PROJECT_COLOR },
    { id: "SimplifyJobsDaemon", type: "project", cluster: "aitools", color: PROJECT_COLOR },
    { id: "Personality Prediction", type: "project", cluster: "research", color: PROJECT_COLOR },
    { id: "University Drive", type: "project", cluster: "distributed", color: PROJECT_COLOR },

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
    { id: "ETL Pipelines", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Parquet", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Java 21", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Spring Boot", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "JavaFX", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "SQLite", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Maven", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Server-Sent Events", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Multithreading", type: "skill", cluster: "distributed", color: clusterColors.distributed },
    { id: "Content-Addressed Storage", type: "skill", cluster: "distributed", color: clusterColors.distributed },

    // ── Infra skills ───────────────────────────────────────────────────
    { id: "AWS", type: "skill", cluster: "infra", color: clusterColors.infra },
    { id: "Docker", type: "skill", cluster: "infra", color: clusterColors.infra },
    { id: "CI/CD", type: "skill", cluster: "infra", color: clusterColors.infra },
    { id: "Linux", type: "skill", cluster: "infra", color: clusterColors.infra },

    // ── Research skills ────────────────────────────────────────────────
    { id: "NLP", type: "skill", cluster: "research", color: clusterColors.research },
    { id: "spaCy / NLTK", type: "skill", cluster: "research", color: clusterColors.research },
    { id: "GPU Optimization", type: "skill", cluster: "research", color: clusterColors.research },
    { id: "Time-Series ML", type: "skill", cluster: "research", color: clusterColors.research },
];

export const rawLinks: LinkDatum[] = [
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
    { source: "SteamLensAI", target: "MongoDB" },
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

    // University Drive (Java client-server folder sync — CS6103 course project)
    { source: "University Drive", target: "Java 21" },
    { source: "University Drive", target: "Spring Boot" },
    { source: "University Drive", target: "JavaFX" },
    { source: "University Drive", target: "SQLite" },
    { source: "University Drive", target: "Maven" },
    { source: "University Drive", target: "Server-Sent Events" },
    { source: "University Drive", target: "Multithreading" },
    { source: "University Drive", target: "Content-Addressed Storage" },
];

export const legendEntries = [
    { label: "Web Dev", color: clusterColors.webdev },
    { label: "ML / AI", color: clusterColors.ml },
    { label: "AI Tools", color: clusterColors.aitools },
    { label: "Distributed Systems", color: clusterColors.distributed },
    { label: "Infra / DevOps", color: clusterColors.infra },
    { label: "Research", color: clusterColors.research },
    { label: "Project (node)", color: PROJECT_COLOR },
];

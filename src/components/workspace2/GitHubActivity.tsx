"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const USERNAME = "Matrix030";
const API = "https://api.github.com";

// --- Types ---

interface UserStats {
    public_repos: number;
    followers: number;
}

interface Repo {
    name: string;
    pushed_at: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
}

interface GitHubEvent {
    type: string;
    repo: { name: string };
    created_at: string;
    payload: Record<string, unknown>;
}

// --- Helpers ---

const langColors: Record<string, string> = {
    TypeScript: "#3B82F6",
    Python: "#22C55E",
    Go: "#06B6D4",
    JavaScript: "#FBBF24",
    Rust: "#F97316",
    Java: "#F43F5E",
};

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
}

function truncate(s: string | null, max: number): string {
    if (!s) return "";
    return s.length > max ? s.slice(0, max) + "\u2026" : s;
}

const FONT =
    '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

const eventConfig: Record<
    string,
    { icon: string; verb: string; color: string }
> = {
    PushEvent: { icon: "\u2191", verb: "pushed to", color: "#22C55E" },
    CreateEvent: { icon: "+", verb: "created", color: "#3B82F6" },
    WatchEvent: { icon: "\u2605", verb: "starred", color: "#FBBF24" },
    ForkEvent: { icon: "\u2442", verb: "forked", color: "#A855F7" },
};

// --- Skeleton ---

function Skeleton() {
    const widths = ["80%", "60%", "45%", "70%", "55%", "80%", "50%", "65%"];
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem",
                fontFamily: FONT,
            }}
        >
            {widths.map((w, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        background: "#12121e",
                        border: "2px solid #e2e0f0",
                        borderRadius: 3,
                        height: "0.7rem",
                        width: w,
                    }}
                />
            ))}
        </div>
    );
}

// --- Heatmap ---

interface ContribCell {
    date: string;
    level: number;
}

function Heatmap() {
    const [cells, setCells] = useState<ContribCell[]>([]);
    const WEEKS = 52;

    useEffect(() => {
        fetch("/api/contributions")
            .then((r) => r.json())
            .then((data: ContribCell[]) => {
                if (Array.isArray(data)) {
                    const levelMap: Record<string, number> = {};
                    data.forEach((c) => {
                        levelMap[c.date] = c.level;
                    });

                    const today = new Date();
                    const grid: ContribCell[] = [];
                    for (let i = WEEKS * 7 - 1; i >= 0; i--) {
                        const d = new Date(today);
                        d.setDate(d.getDate() - i);
                        const key = d.toISOString().slice(0, 10);
                        grid.push({ date: key, level: levelMap[key] ?? 0 });
                    }
                    setCells(grid);
                }
            })
            .catch(() => {});
    }, []);

    const levelColors = [
        "#12121e",
        "#BBF7D0",
        "#86EFAC",
        "#4ADE80",
        "#22C55E",
    ];

    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
        gridTemplateRows: "repeat(7, 1fr)",
        gap: 2,
        gridAutoFlow: "column",
        width: "100%",
    };

    const cellStyle: React.CSSProperties = {
        width: "100%",
        aspectRatio: "1",
        borderRadius: 1,
        border: "1px solid #e2e0f0",
    };

    if (cells.length === 0) {
        return (
            <div style={gridStyle}>
                {Array.from({ length: WEEKS * 7 }).map((_, i) => (
                    <div
                        key={i}
                        style={{ ...cellStyle, background: "#12121e" }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div style={gridStyle}>
            {cells.map((c) => (
                <div
                    key={c.date}
                    title={`${c.date}: level ${c.level}`}
                    style={{
                        ...cellStyle,
                        background: levelColors[c.level] ?? "#12121e",
                    }}
                />
            ))}
        </div>
    );
}

// --- Main component ---

export default function GitHubActivity() {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [repos, setRepos] = useState<Repo[] | null>(null);
    const [events, setEvents] = useState<GitHubEvent[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };

        Promise.all([
            fetch(`${API}/users/${USERNAME}`, { headers }).then((r) => {
                if (!r.ok) throw new Error();
                return r.json();
            }),
            fetch(`${API}/users/${USERNAME}/repos?sort=pushed&per_page=6`, {
                headers,
            }).then((r) => {
                if (!r.ok) throw new Error();
                return r.json();
            }),
            fetch(`${API}/users/${USERNAME}/events/public?per_page=30`, {
                headers,
            }).then((r) => {
                if (!r.ok) throw new Error();
                return r.json();
            }),
        ])
            .then(([user, repoData, eventData]) => {
                setStats({
                    public_repos: user.public_repos,
                    followers: user.followers,
                });
                setRepos(repoData);
                setEvents(eventData);
            })
            .catch(() => setError(true));
    }, []);

    if (error) {
        return (
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT,
                }}
            >
                <span
                    style={{
                        color: "#e8e5f5",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        background: "#220d10",
                        border: "2px solid #e2e0f0",
                        borderRadius: 4,
                        padding: "0.3rem 0.6rem",
                        boxShadow: "2px 2px 0px #4a4870",
                    }}
                >
                    {"!"} failed to load github data
                </span>
            </div>
        );
    }

    if (!stats || !repos || !events) return <Skeleton />;

    const filteredEvents = events.filter((e) => e.type in eventConfig).slice(0, 8);
    const displayRepos = repos.slice(0, 5);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "1rem",
                gap: "0.75rem",
                overflow: "hidden",
                fontFamily: FONT,
            }}
        >
            {/* Header */}
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <div style={{ color: "#e8e5f5", fontSize: "0.82rem", fontWeight: 800 }}>
                            {"@"}{USERNAME}
                        </div>
                        <div style={{ color: "#6b6890", fontSize: "0.65rem", fontWeight: 600 }}>
                            github activity
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Pill icon="repo" value={`${stats.public_repos}`} color="#3B82F6" bg="#1a2545" />
                        <Pill icon="flwr" value={`${stats.followers}`} color="#22C55E" bg="#0d2518" />
                    </div>
                </div>
            </div>

            {/* Recent Repos */}
            <div style={{ flex: "0 0 auto" }}>
                <SectionLabel>recent repos</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {displayRepos.map((repo) => (
                        <RepoRow key={repo.name} repo={repo} />
                    ))}
                </div>
            </div>

            {/* Recent Events */}
            <div style={{ flex: "1 1 auto", minHeight: 0, overflow: "hidden" }}>
                <SectionLabel>recent activity</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {filteredEvents.map((evt, i) => (
                        <EventRow key={`${evt.repo.name}-${evt.created_at}-${i}`} event={evt} />
                    ))}
                </div>
            </div>

            {/* Heatmap */}
            <div style={{ flex: "0 0 auto" }}>
                <SectionLabel>contributions (last year)</SectionLabel>
                <Heatmap />
            </div>
        </div>
    );
}

// --- Sub-components ---

function Pill({
    icon,
    value,
    color,
    bg,
}: {
    icon: string;
    value: string;
    color: string;
    bg: string;
}) {
    return (
        <span
            style={{
                background: bg,
                border: "2px solid #e2e0f0",
                borderRadius: 3,
                padding: "2px 8px",
                color,
                fontSize: "0.62rem",
                whiteSpace: "nowrap",
                fontWeight: 700,
            }}
        >
            {icon} {value}
        </span>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                color: "#e8e5f5",
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.4rem",
                fontWeight: 800,
            }}
        >
            {children}
        </div>
    );
}

function RepoRow({ repo }: { repo: Repo }) {
    const [hovered, setHovered] = useState(false);
    const langColor = langColors[repo.language ?? ""] ?? "#6b6890";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.35rem 0.5rem",
                borderRadius: 3,
                background: hovered ? "#12121e" : "transparent",
                borderBottom: "1px solid #e2e0f0",
                transition: "background 0.1s",
                cursor: "default",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                <span
                    style={{
                        color: "#e8e5f5",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {repo.name}
                </span>
                <span style={{ color: "#6b6890", fontSize: "0.62rem", fontWeight: 500 }}>
                    {truncate(repo.description, 40)}
                </span>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    flexShrink: 0,
                    marginLeft: "0.5rem",
                }}
            >
                {repo.language && (
                    <>
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 2,
                                background: langColor,
                                border: "1px solid #e2e0f0",
                                flexShrink: 0,
                            }}
                        />
                        <span style={{ color: "#9896b8", fontSize: "0.62rem", fontWeight: 600 }}>
                            {repo.language}
                        </span>
                    </>
                )}
                <span style={{ color: "#6b6890", fontSize: "0.6rem", fontWeight: 600 }}>
                    {timeAgo(repo.pushed_at)}
                </span>
            </div>
        </div>
    );
}

function EventRow({ event }: { event: GitHubEvent }) {
    const cfg = eventConfig[event.type];
    if (!cfg) return null;

    const shortRepo = event.repo.name.replace(`${USERNAME}/`, "");

    return (
        <div
            style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                padding: "0.25rem 0",
                borderBottom: "1px solid rgba(226,224,240,0.15)",
            }}
        >
            <span style={{ color: cfg.color, fontSize: "0.68rem", flexShrink: 0, fontWeight: 700 }}>
                {cfg.icon}
            </span>
            <span
                style={{
                    color: "#9896b8",
                    fontSize: "0.68rem",
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 600,
                }}
            >
                {cfg.verb} {shortRepo}
            </span>
            <span
                style={{
                    color: "#6b6890",
                    fontSize: "0.6rem",
                    flexShrink: 0,
                    fontWeight: 600,
                }}
            >
                {timeAgo(event.created_at)}
            </span>
        </div>
    );
}

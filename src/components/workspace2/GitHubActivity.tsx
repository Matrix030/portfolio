"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// GitHub public API — 60 req/hour unauthenticated.
// For higher limits in production, add a GITHUB_TOKEN env var and pass
// Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` in headers.

const USERNAME = "rgmatr1x";
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
  TypeScript: "#8caaee",
  Python: "#a6d189",
  Go: "#99d1db",
  JavaScript: "#e5c890",
  Rust: "#ef9f76",
  Java: "#ea999c",
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
  PushEvent: { icon: "\uf40a", verb: "pushed to", color: "#a6d189" },
  CreateEvent: { icon: "\uf457", verb: "created", color: "#8caaee" },
  WatchEvent: { icon: "\uf4b2", verb: "starred", color: "#e5c890" },
  ForkEvent: { icon: "\uf402", verb: "forked", color: "#ca9ee6" },
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
            background: "#414559",
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

function Heatmap({ events }: { events: GitHubEvent[] }) {
  // Build date → count map from PushEvents
  const counts: Record<string, number> = {};
  events.forEach((e) => {
    if (e.type === "PushEvent") {
      const day = e.created_at.slice(0, 10);
      counts[day] = (counts[day] || 0) + 1;
    }
  });

  // Generate 16 weeks x 7 days grid (today = end)
  const today = new Date();
  const cells: { date: string; count: number }[] = [];
  for (let i = 16 * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    cells.push({ date: key, count: counts[key] || 0 });
  }

  function cellColor(count: number): string {
    if (count === 0) return "#414559";
    if (count === 1) return "rgba(166,209,137,0.3)";
    if (count === 2) return "rgba(166,209,137,0.6)";
    return "#a6d189";
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(16, 0.55rem)",
        gridTemplateRows: "repeat(7, 0.55rem)",
        gap: 2,
        gridAutoFlow: "column",
      }}
    >
      {cells.map((c) => (
        <div
          key={c.date}
          title={`${c.date}: ${c.count} event${c.count !== 1 ? "s" : ""}`}
          style={{
            width: "0.55rem",
            height: "0.55rem",
            borderRadius: 1,
            background: cellColor(c.count),
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
        <span style={{ color: "#ea999c", fontSize: "0.72rem" }}>
          {"\uf659"} failed to load github data
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
            <div style={{ color: "#c6d0f5", fontSize: "0.82rem", fontWeight: 600 }}>
              {"\uf408"} {USERNAME}
            </div>
            <div style={{ color: "#737994", fontSize: "0.65rem" }}>
              github activity
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Pill icon="\uf015" value={`${stats.public_repos} repos`} color="#8caaee" />
            <Pill icon="\uf415" value={`${stats.followers} followers`} color="#a6d189" />
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
        <SectionLabel>contributions (last 16 weeks)</SectionLabel>
        <Heatmap events={events} />
      </div>
    </div>
  );
}

// --- Sub-components ---

function Pill({
  icon,
  value,
  color,
}: {
  icon: string;
  value: string;
  color: string;
}) {
  return (
    <span
      style={{
        background: "#414559",
        border: "1px solid #51576d",
        borderRadius: 3,
        padding: "2px 8px",
        color,
        fontSize: "0.62rem",
        whiteSpace: "nowrap",
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
        color: "#737994",
        fontSize: "0.62rem",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: "0.4rem",
      }}
    >
      {children}
    </div>
  );
}

function RepoRow({ repo }: { repo: Repo }) {
  const [hovered, setHovered] = useState(false);
  const langColor = langColors[repo.language ?? ""] ?? "#626880";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.35rem 0.5rem",
        borderRadius: 3,
        background: hovered ? "#414559" : "transparent",
        transition: "background 0.15s",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span
          style={{
            color: "#c6d0f5",
            fontSize: "0.72rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {repo.name}
        </span>
        <span style={{ color: "#737994", fontSize: "0.62rem" }}>
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
                borderRadius: "50%",
                background: langColor,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#737994", fontSize: "0.62rem" }}>
              {repo.language}
            </span>
          </>
        )}
        <span style={{ color: "#737994", fontSize: "0.6rem" }}>
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
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <span style={{ color: cfg.color, fontSize: "0.68rem", flexShrink: 0 }}>
        {cfg.icon}
      </span>
      <span
        style={{
          color: "#a5adce",
          fontSize: "0.68rem",
          flex: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {cfg.verb} {shortRepo}
      </span>
      <span
        style={{
          color: "#737994",
          fontSize: "0.6rem",
          flexShrink: 0,
        }}
      >
        {timeAgo(event.created_at)}
      </span>
    </div>
  );
}

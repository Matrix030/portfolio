"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const USERNAME = "Matrix030";
const API = "https://api.github.com";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

const langColors: Record<string, string> = {
  TypeScript: "#3B82F6",
  Python: "#22C55E",
  Go: "#06B6D4",
  JavaScript: "#FBBF24",
  Rust: "#F97316",
  Java: "#F43F5E",
};

const eventConfig: Record<string, { icon: string; verb: string; color: string }> = {
  PushEvent: { icon: "↑", verb: "pushed to", color: "#22C55E" },
  CreateEvent: { icon: "+", verb: "created", color: "#3B82F6" },
  WatchEvent: { icon: "★", verb: "starred", color: "#FBBF24" },
  ForkEvent: { icon: "⑂", verb: "forked", color: "#A855F7" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

function truncate(s: string | null, max: number): string {
  if (!s) return "";
  return s.length > max ? s.slice(0, max) + "…" : s;
}

interface UserStats { public_repos: number; followers: number; }
interface Repo { name: string; pushed_at: string; description: string | null; language: string | null; }
interface GitHubEvent { type: string; repo: { name: string }; created_at: string; payload: Record<string, unknown>; }

function Skeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontFamily: FONT }}>
      {[80, 60, 70, 50, 65, 75].map((w, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "#F5F0E8", border: "2px solid #1a1a2e", borderRadius: 3, height: "0.7rem", width: `${w}%` }}
        />
      ))}
    </div>
  );
}

export default function MobileGitHub() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [events, setEvents] = useState<GitHubEvent[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
    Promise.all([
      fetch(`${API}/users/${USERNAME}`, { headers }).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`${API}/users/${USERNAME}/repos?sort=pushed&per_page=6`, { headers }).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`${API}/users/${USERNAME}/events/public?per_page=30`, { headers }).then(r => { if (!r.ok) throw new Error(); return r.json(); }),
    ])
      .then(([user, repoData, eventData]) => {
        setStats({ public_repos: user.public_repos, followers: user.followers });
        setRepos(repoData);
        setEvents(eventData);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div style={{ color: "#1a1a2e", fontFamily: FONT, fontSize: "0.72rem", fontWeight: 700, background: "#FEE2E2", border: "2px solid #1a1a2e", borderRadius: 4, padding: "0.3rem 0.6rem", display: "inline-block" }}>
        ! failed to load github data
      </div>
    );
  }

  if (!stats || !repos || !events) return <Skeleton />;

  const filteredEvents = events.filter(e => e.type in eventConfig).slice(0, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontFamily: FONT }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#1a1a2e", fontSize: "0.82rem", fontWeight: 800 }}>@{USERNAME}</div>
          <div style={{ color: "#6B7280", fontSize: "0.65rem", fontWeight: 600 }}>github activity</div>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[
            { label: "repo", value: stats.public_repos, color: "#3B82F6", bg: "#DBEAFE" },
            { label: "flwr", value: stats.followers, color: "#22C55E", bg: "#DCFCE7" },
          ].map(p => (
            <span key={p.label} style={{ background: p.bg, border: "2px solid #1a1a2e", borderRadius: 3, padding: "2px 8px", color: p.color, fontSize: "0.62rem", fontWeight: 700 }}>
              {p.label} {p.value}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Repos */}
      <div>
        <div style={{ color: "#1a1a2e", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", fontWeight: 800 }}>
          recent repos
        </div>
        {repos.slice(0, 5).map(repo => (
          <div key={repo.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.35rem 0", borderBottom: "1px solid rgba(26,26,46,0.15)" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "#1a1a2e", fontSize: "0.72rem", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{repo.name}</div>
              <div style={{ color: "#6B7280", fontSize: "0.62rem", fontWeight: 500 }}>{truncate(repo.description, 35)}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0, marginLeft: "0.5rem" }}>
              {repo.language && (
                <div style={{ width: 8, height: 8, borderRadius: 2, background: langColors[repo.language] ?? "#6B7280", border: "1px solid #1a1a2e" }} />
              )}
              <span style={{ color: "#6B7280", fontSize: "0.6rem", fontWeight: 600 }}>{timeAgo(repo.pushed_at)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div>
        <div style={{ color: "#1a1a2e", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", fontWeight: 800 }}>
          recent activity
        </div>
        {filteredEvents.map((evt, i) => {
          const cfg = eventConfig[evt.type];
          const shortRepo = evt.repo.name.replace(`${USERNAME}/`, "");
          return (
            <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center", padding: "0.25rem 0", borderBottom: "1px solid rgba(26,26,46,0.15)" }}>
              <span style={{ color: cfg.color, fontSize: "0.68rem", flexShrink: 0, fontWeight: 700 }}>{cfg.icon}</span>
              <span style={{ color: "#374151", fontSize: "0.68rem", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600 }}>{cfg.verb} {shortRepo}</span>
              <span style={{ color: "#6B7280", fontSize: "0.6rem", flexShrink: 0, fontWeight: 600 }}>{timeAgo(evt.created_at)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const USERNAME = "Matrix030";
const API = "https://api.github.com";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

const langColors: Record<string, string> = {
  TypeScript: "#8caaee",
  Python: "#a6d189",
  Go: "#99d1db",
  JavaScript: "#e5c890",
  Rust: "#ef9f76",
  Java: "#ea999c",
};

const eventConfig: Record<string, { icon: string; verb: string; color: string }> = {
  PushEvent: { icon: "↑", verb: "pushed to", color: "#a6d189" },
  CreateEvent: { icon: "+", verb: "created", color: "#8caaee" },
  WatchEvent: { icon: "★", verb: "starred", color: "#e5c890" },
  ForkEvent: { icon: "⑂", verb: "forked", color: "#ca9ee6" },
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
          style={{ background: "#414559", borderRadius: 3, height: "0.7rem", width: `${w}%` }}
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
      <div style={{ color: "#ea999c", fontFamily: FONT, fontSize: "0.72rem" }}>
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
          <div style={{ color: "#c6d0f5", fontSize: "0.82rem", fontWeight: 600 }}>@{USERNAME}</div>
          <div style={{ color: "#737994", fontSize: "0.65rem" }}>github activity</div>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[
            { label: "repo", value: stats.public_repos, color: "#8caaee" },
            { label: "flwr", value: stats.followers, color: "#a6d189" },
          ].map(p => (
            <span key={p.label} style={{ background: "#414559", border: "1px solid #51576d", borderRadius: 3, padding: "2px 8px", color: p.color, fontSize: "0.62rem" }}>
              {p.label} {p.value}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Repos */}
      <div>
        <div style={{ color: "#737994", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
          recent repos
        </div>
        {repos.slice(0, 5).map(repo => (
          <div key={repo.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.35rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "#c6d0f5", fontSize: "0.72rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{repo.name}</div>
              <div style={{ color: "#737994", fontSize: "0.62rem" }}>{truncate(repo.description, 35)}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0, marginLeft: "0.5rem" }}>
              {repo.language && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: langColors[repo.language] ?? "#626880" }} />
              )}
              <span style={{ color: "#737994", fontSize: "0.6rem" }}>{timeAgo(repo.pushed_at)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div>
        <div style={{ color: "#737994", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
          recent activity
        </div>
        {filteredEvents.map((evt, i) => {
          const cfg = eventConfig[evt.type];
          const shortRepo = evt.repo.name.replace(`${USERNAME}/`, "");
          return (
            <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center", padding: "0.25rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ color: cfg.color, fontSize: "0.68rem", flexShrink: 0 }}>{cfg.icon}</span>
              <span style={{ color: "#a5adce", fontSize: "0.68rem", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cfg.verb} {shortRepo}</span>
              <span style={{ color: "#737994", fontSize: "0.6rem", flexShrink: 0 }}>{timeAgo(evt.created_at)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

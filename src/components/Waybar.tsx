"use client";

import { useState, useEffect } from "react";

const GRADUATION_DATE = new Date("2026-05-05T00:00:00").getTime();

function formatClock(now: Date): string {
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const day = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  return `${weekday} | ${day} - ${h}:${m}:${s}`;
}

function formatCountdown(now: Date): string {
  const diff = GRADUATION_DATE - now.getTime();
  if (diff <= 0) return "🎓 Graduated!";
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSec % 60).padStart(2, "0");
  return `🎓 ${days}d ${hours}:${mins}:${secs}`;
}

interface Workspace {
  id: number;
  activeIcon: string;
  inactiveIcon: string;
}

const workspaces: Workspace[] = [
  { id: 1, activeIcon: "\uf444", inactiveIcon: "\uf4c3" },
  { id: 2, activeIcon: "\uf444", inactiveIcon: "\uf4c3" },
  { id: 3, activeIcon: "\uf444", inactiveIcon: "\uf4c3" },
];

export default function Waybar() {
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 2,
        left: 2,
        right: 2,
        height: 32,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        background: "#101010",
        borderRadius: 5,
        fontFamily: '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
        fontSize: 13,
        color: "#c6d0f5",
        boxShadow: "0 2px 8px rgba(26,26,26,0.93)",
      }}
    >
      {/* LEFT: Workspaces */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#101010",
          borderRadius: 5,
          margin: 5,
          marginLeft: 2,
        }}
      >
        {workspaces.map((ws) => {
          const isActive = ws.id === activeWorkspace;
          return (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              style={{
                background: "#101010",
                border: "none",
                borderRadius: 5,
                padding: "0.4rem",
                color: isActive ? "#99d1db" : "#babbf1",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: 1,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#1e1e1e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#101010";
              }}
            >
              {ws.id}: {isActive ? ws.activeIcon : ws.inactiveIcon}
            </button>
          );
        })}
      </div>

      {/* CENTER: Clock + Graduation (absolutely centered) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#101010",
            borderRadius: 5,
            padding: "0.5rem 1rem",
            margin: "5px 0",
            color: "#8caaee",
            whiteSpace: "nowrap",
          }}
        >
          {now ? formatClock(now) : "\u00A0"}
        </div>
        <div
          style={{
            background: "#101010",
            borderRadius: 5,
            padding: "0.5rem 1rem",
            margin: "5px 0 5px 0.5rem",
            color: "#f4b8e4",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {now ? formatCountdown(now) : "\u00A0"}
        </div>
      </div>

      {/* RIGHT: System modules */}
      <div style={{ display: "flex", alignItems: "center", margin: "5px 2px 5px 0", marginLeft: "auto" }}>
        <Module color="#ea999c" borderRadius="5px 0 0 5px">
          {"\uf028"} 75%
        </Module>
        <Module color="#c6d0f5" borderRadius="0">
          up 2 hours, 30 minutes
        </Module>
        <Module color="#99d1db" borderRadius="0">
          {"\udb82\udd22"} 450Mbits
        </Module>
        <Module color="#a6d189" borderRadius="0">
          {"\uf4bc"}  ▁▂▃▄ 12%
        </Module>
        <Module color="#c6d0f5" borderRadius="0 5px 5px 0">
          {"\uf035b"}  7.2G/31.3G
        </Module>
        {/* Tray placeholder */}
        <div style={{ width: 16, height: 16, marginLeft: 4 }} />
      </div>
    </div>
  );
}

function Module({
  color,
  borderRadius,
  children,
}: {
  color: string;
  borderRadius: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#101010",
        padding: "0.5rem 1rem",
        margin: "5px 0",
        color,
        borderRadius,
        whiteSpace: "nowrap",
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      {children}
    </div>
  );
}

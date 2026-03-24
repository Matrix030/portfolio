"use client";

import MasterDocViewer from "./MasterDocViewer";
import MasterDocRaw from "./MasterDocRaw";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

function StaticWindow({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#1a1a2e",
        borderRadius: 8,
        height: "100%",
        overflow: "hidden",
        border: "3px solid #e2e0f0",
        boxShadow: "4px 4px 0px #4a4870",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: "1.75rem",
          flexShrink: 0,
          background: accent,
          borderBottom: "3px solid #e2e0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0.75rem",
          userSelect: "none",
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "0.72rem",
            fontFamily: FONT,
            fontWeight: 700,
          }}
        >
          {title}
        </span>
        {/* Traffic lights (decorative) */}
        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#EF4444", border: "2px solid #e2e0f0" }} />
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#FBBF24", border: "2px solid #e2e0f0" }} />
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#22C55E", border: "2px solid #e2e0f0" }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export default function Workspace3() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        gap: 6,
        padding: 6,
        background: "#0e0e1c",
        boxSizing: "border-box",
      }}
    >
      {/* Left — human-readable doc */}
      <div style={{ flex: "0 0 58%", minWidth: 0, height: "100%" }}>
        <StaticWindow title="master.doc" accent="#3B82F6">
          <MasterDocViewer />
        </StaticWindow>
      </div>

      {/* Right — raw JSON */}
      <div style={{ flex: "0 0 42%", minWidth: 0, height: "100%" }}>
        <StaticWindow title="master.json" accent="#A855F7">
          <MasterDocRaw />
        </StaticWindow>
      </div>
    </div>
  );
}

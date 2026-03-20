"use client";

import MasterDocViewer from "./MasterDocViewer";
import MasterDocRaw from "./MasterDocRaw";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

function StaticWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#51576d",
        borderRadius: 10,
        height: "100%",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(35,38,52,0.8)",
        position: "relative",
      }}
    >
      {/* inner inset */}
      <div
        style={{
          position: "absolute",
          inset: 1,
          borderRadius: 9,
          overflow: "hidden",
          background: "rgba(48,52,70,0.85)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: "1.75rem",
            flexShrink: 0,
            background: "rgba(41,44,60,0.8)",
            borderBottom: "1px solid rgba(81,87,109,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0.75rem",
            userSelect: "none",
          }}
        >
          <span
            style={{
              color: "#c6d0f5",
              fontSize: "0.72rem",
              fontFamily: FONT,
            }}
          >
            {title}
          </span>
          {/* Traffic lights (decorative) */}
          <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e78284" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e5c890" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#a6d189" }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          {children}
        </div>
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
        gap: 4,
        padding: 5,
        background: "#232634",
        boxSizing: "border-box",
      }}
    >
      {/* Left — human-readable doc */}
      <div style={{ flex: "0 0 58%", minWidth: 0, height: "100%" }}>
        <StaticWindow title="master.doc">
          <MasterDocViewer />
        </StaticWindow>
      </div>

      {/* Right — raw JSON */}
      <div style={{ flex: "0 0 42%", minWidth: 0, height: "100%" }}>
        <StaticWindow title="master.json">
          <MasterDocRaw />
        </StaticWindow>
      </div>
    </div>
  );
}

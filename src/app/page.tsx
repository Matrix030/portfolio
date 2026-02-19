"use client";

import { useState } from "react";
import Waybar from "@/components/Waybar";
import WorkspaceManager from "@/components/WorkspaceManager";

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState(1);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#232634",
      }}
    >
      <Waybar
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
      <div
        style={{
          position: "absolute",
          top: "2.5rem",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <WorkspaceManager activeWorkspace={activeWorkspace} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Waybar from "@/components/Waybar";
import WorkspaceManager from "@/components/WorkspaceManager";
import LockScreen from "@/components/LockScreen";

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [isLocked, setIsLocked] = useState(true);

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
      {/* Desktop always rendered underneath */}
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

      {/* Lock screen on top, exits upward */}
      <AnimatePresence>
        {isLocked && (
          <LockScreen onUnlock={() => setIsLocked(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

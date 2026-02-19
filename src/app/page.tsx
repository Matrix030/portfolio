"use client";

import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Waybar from "@/components/Waybar";
import WorkspaceManager from "@/components/WorkspaceManager";
import LockScreen from "@/components/LockScreen";

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const desktopRef = useRef<HTMLDivElement>(null);

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
      {/* Desktop always rendered underneath, blurred when locked */}
      <div
        ref={desktopRef}
        style={{
          width: "100%",
          height: "100%",
          filter: isLocked ? "blur(12px) brightness(0.6)" : "none",
          transition: "filter 0.5s ease",
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
            height: "calc(100% - 2.5rem)",
          }}
        >
          <WorkspaceManager activeWorkspace={activeWorkspace} skipInitialAnimation={isLocked} />
        </div>
      </div>

      {/* Lock screen on top, fades out */}
      <AnimatePresence>
        {isLocked && (
          <LockScreen onUnlock={() => setIsLocked(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

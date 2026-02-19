"use client";

import { AnimatePresence, motion } from "framer-motion";
import Desktop from "./Desktop";

const FADE_EASE: [number, number, number, number] = [0.5, 0.5, 0.75, 1.0];

function WorkspacePlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#232634",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: "#737994",
          fontSize: "0.85rem",
          fontFamily:
            '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function WorkspaceManager({
  activeWorkspace,
}: {
  activeWorkspace: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeWorkspace}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.15, ease: FADE_EASE },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.15, ease: FADE_EASE },
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        {activeWorkspace === 1 && <Desktop />}
        {activeWorkspace === 2 && (
          <WorkspacePlaceholder label="workspace 2" />
        )}
        {activeWorkspace === 3 && (
          <WorkspacePlaceholder label="workspace 3" />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

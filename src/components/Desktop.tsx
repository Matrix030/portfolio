"use client";

import { useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Window from "./Window";
import About from "./windows/About";
import Projects from "./windows/Projects";
import Experience from "./windows/Experience";
import Skills from "./windows/Skills";
import Education from "./windows/Education";

interface WindowDef {
  id: string;
  title: string;
  gridColumn: string;
  gridRow: string;
  content: ReactNode;
}

const windows: WindowDef[] = [
  {
    id: "about",
    title: "about",
    gridColumn: "1 / 5",
    gridRow: "1 / 4",
    content: <About />,
  },
  {
    id: "projects",
    title: "projects",
    gridColumn: "5 / 9",
    gridRow: "1 / 7",
    content: <Projects />,
  },
  {
    id: "experience",
    title: "experience",
    gridColumn: "9 / 13",
    gridRow: "1 / 4",
    content: <Experience />,
  },
  {
    id: "education",
    title: "education",
    gridColumn: "1 / 5",
    gridRow: "4 / 7",
    content: <Education />,
  },
  {
    id: "skills",
    title: "skills",
    gridColumn: "9 / 13",
    gridRow: "4 / 7",
    content: <Skills />,
  },
];

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState("about");
  const [introComplete, setIntroComplete] = useState(false);
  // about is always revealed; others start dimmed
  const [revealedWindows, setRevealedWindows] = useState<Set<string>>(
    new Set(["about"])
  );

  // Turn off forceActive on about after 2.8s
  useEffect(() => {
    const t = setTimeout(() => setIntroComplete(true), 2800);
    return () => clearTimeout(t);
  }, []);

  function revealWindow(id: string) {
    setRevealedWindows((prev) => new Set([...prev, id]));
  }

  const allRevealed = windows.every((w) => revealedWindows.has(w.id));

  return (
    <div
      style={{
        height: "100%",
        padding: "clamp(4px, 0.4vw, 8px)",
        background: "#232634",
        transform: "translateZ(0)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: "clamp(2px, 0.2vw, 4px)",
          height: "100%",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
      >
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            isActive={activeWindow === win.id}
            forceActive={!introComplete && win.id === "about"}
            dimmed={!revealedWindows.has(win.id)}
            onReveal={() => revealWindow(win.id)}
            onMouseEnter={() => setActiveWindow(win.id)}
            style={{
              gridColumn: win.gridColumn,
              gridRow: win.gridRow,
            }}
          >
            {win.content}
          </Window>
        ))}
      </div>

      {/* Hint text — shown until all windows revealed */}
      <AnimatePresence>
        {!allRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "calc(50% + 0.5rem)",
              left: 0,
              width: "33.3%",
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                color: "rgba(200,200,200,0.35)",
                fontSize: "0.65rem",
                fontFamily:
                  '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
                letterSpacing: "0.05em",
              }}
            >
              scroll to explore →
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect, type ReactNode } from "react";
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

// Module-level: persists across re-mounts (workspace switches), resets on full page reload
const _revealedWindows = new Set<string>(["about"]);
let _introComplete = false;

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
  const [introComplete, setIntroComplete] = useState(_introComplete);
  const [revealedWindows, setRevealedWindows] = useState<Set<string>>(
    new Set(_revealedWindows)
  );

  useEffect(() => {
    if (_introComplete) return;
    const t = setTimeout(() => {
      _introComplete = true;
      setIntroComplete(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  function revealWindow(id: string) {
    _revealedWindows.add(id);
    setRevealedWindows(new Set(_revealedWindows));
  }

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

    </div>
  );
}

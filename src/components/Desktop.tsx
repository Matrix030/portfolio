"use client";

import { useState, type ReactNode } from "react";
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

  return (
    <div
      style={{
        height: "100%",
        padding: "clamp(4px, 0.4vw, 8px)",
        background: "#232634",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: "clamp(2px, 0.2vw, 4px)",
          height: "100%",
        }}
      >
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            isActive={activeWindow === win.id}
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

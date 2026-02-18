"use client";

import { useState } from "react";
import Window from "./Window";

const windows = [
  {
    id: "about",
    title: "about",
    gridColumn: "1 / 5",
    gridRow: "1 / 4",
  },
  {
    id: "projects",
    title: "projects",
    gridColumn: "5 / 9",
    gridRow: "1 / 7",
  },
  {
    id: "experience",
    title: "experience",
    gridColumn: "9 / 13",
    gridRow: "1 / 3",
  },
  {
    id: "skills",
    title: "skills",
    gridColumn: "1 / 5",
    gridRow: "4 / 7",
  },
  {
    id: "education",
    title: "education",
    gridColumn: "9 / 13",
    gridRow: "3 / 7",
  },
];

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState("about");

  return (
    <div
      style={{
        height: "calc(100vh - 42px)",
        marginTop: 42,
        padding: 5,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          gap: 2,
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
            <span style={{ color: "#737994", fontSize: 12 }}>
              {win.title}
            </span>
          </Window>
        ))}
      </div>
    </div>
  );
}

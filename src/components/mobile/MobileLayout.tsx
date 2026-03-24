"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import About from "@/components/windows/About";
import Projects from "@/components/windows/Projects";
import Experience from "@/components/windows/Experience";
import Skills from "@/components/windows/Skills";
import Education from "@/components/windows/Education";
import MobileGitHub from "./MobileGitHub";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

const mobileWorkspaces = [
  { id: "about",      label: "About",      component: <About /> },
  { id: "projects",   label: "Projects",   component: <Projects /> },
  { id: "experience", label: "Experience", component: <Experience /> },
  { id: "skills",     label: "Skills",     component: <Skills /> },
  { id: "education",  label: "Education",  component: <Education /> },
  { id: "github",     label: "GitHub",     component: <MobileGitHub /> },
];

const variants = {
  enter: (dir: "left" | "right") => ({
    opacity: 0,
    x: dir === "left" ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
  exit: (dir: "left" | "right") => ({
    opacity: 0,
    x: dir === "left" ? -40 : 40,
    transition: { duration: 0.2 },
  }),
};

// --- Mobile Waybar ---
function MobileWaybar({
  activeIndex,
  onDotClick,
}: {
  activeIndex: number;
  onDotClick: (i: number) => void;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2.5rem",
        background: "#1a1a2e",
        borderBottom: "3px solid #e2e0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        zIndex: 100,
        boxShadow: "0 3px 0px #4a4870",
        fontFamily: FONT,
      }}
    >
      <span style={{ color: "#3B82F6", fontSize: "0.72rem", fontWeight: 800 }}>
        rgmatr1x
      </span>

      {/* Dot indicators */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {mobileWorkspaces.map((ws, i) => (
          <button
            key={ws.id}
            onClick={() => onDotClick(i)}
            style={{
              width: i === activeIndex ? 8 : 6,
              height: i === activeIndex ? 8 : 6,
              borderRadius: 2,
              background: i === activeIndex ? "#FBBF24" : "#12121e",
              border: "2px solid #e2e0f0",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.1s",
            }}
          />
        ))}
      </div>

      <span style={{ color: "#e8e5f5", fontSize: "0.72rem", fontWeight: 700 }}>{time}</span>
    </div>
  );
}

// --- Main MobileLayout ---
export default function MobileLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [showHint, setShowHint] = useState(true);
  const touchStartX = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  function navigate(dir: "left" | "right") {
    setDirection(dir);
    setActiveIndex((prev) => {
      if (dir === "left") return Math.min(prev + 1, mobileWorkspaces.length - 1);
      return Math.max(prev - 1, 0);
    });
  }

  function goTo(i: number) {
    setDirection(i > activeIndex ? "left" : "right");
    setActiveIndex(i);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) navigate("left");
    else if (diff < -50) navigate("right");
  }

  const ws = mobileWorkspaces[activeIndex];

  return (
    <>
      <MobileWaybar activeIndex={activeIndex} onDotClick={goTo} />

      {/* Content area */}
      <div
        style={{
          position: "fixed",
          top: "2.5rem",
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          background: "#0e0e1c",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: "absolute",
              inset: 0,
              padding: "0.75rem",
              overflowY: "auto",
            }}
          >
            {/* Window wrapper */}
            <div
              style={{
                background: "#1a1a2e",
                borderRadius: 8,
                border: "3px solid #e2e0f0",
                boxShadow: "4px 4px 0px #4a4870",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Title bar */}
              <div
                style={{
                  height: "1.75rem",
                  minHeight: "1.75rem",
                  background: "#3B82F6",
                  borderBottom: "3px solid #e2e0f0",
                  borderRadius: "5px 5px 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 0.75rem",
                  fontFamily: FONT,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span style={{ color: "#FBBF24", fontWeight: 800 }}>➜</span>
                  <span style={{ color: "#FFFFFF", fontSize: "0.68rem", fontWeight: 700 }}>portfolio</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.68rem" }}>:</span>
                  <span style={{ color: "#FBBF24", fontSize: "0.68rem", fontWeight: 700 }}>({ws.label.toUpperCase()})</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "#EF4444", border: "2px solid #e2e0f0" }} />
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "#FBBF24", border: "2px solid #e2e0f0" }} />
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "#22C55E", border: "2px solid #e2e0f0" }} />
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: "0.75rem", minHeight: 0, overflow: "hidden" }}>
                {ws.component}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe hint */}
      <AnimatePresence>
        {showHint && activeIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#1a1a2e",
              fontSize: "0.65rem",
              fontFamily: FONT,
              fontWeight: 700,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              zIndex: 200,
              background: "#FBBF24",
              border: "2px solid #e2e0f0",
              borderRadius: 4,
              padding: "0.3rem 0.8rem",
              boxShadow: "2px 2px 0px #4a4870",
            }}
          >
            swipe to explore →
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

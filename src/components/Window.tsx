"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HOVER_DURATION = 500; // ms
const TOTAL_BARS = 16;
const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  forceActive?: boolean;
  dimmed?: boolean;
  onReveal?: () => void;
  onMouseEnter: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Window({
  title,
  isActive,
  forceActive = false,
  dimmed = false,
  onReveal,
  onMouseEnter,
  children,
  className,
  style,
}: WindowProps) {
  const active = isActive || forceActive;
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  function startProgress() {
    startTimeRef.current = Date.now();
    function tick() {
      const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
      const pct = Math.min(100, (elapsed / HOVER_DURATION) * 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onReveal?.();
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopProgress() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTimeRef.current = null;
    setProgress(0);
  }

  useEffect(() => () => stopProgress(), []);

  function handleMouseEnter() {
    onMouseEnter();
    if (dimmed) {
      setIsHovering(true);
      startProgress();
    }
  }

  function handleMouseLeave() {
    if (dimmed) {
      setIsHovering(false);
      stopProgress();
    }
  }

  function handleClick() {
    stopProgress();
    setIsHovering(false);
    if (dimmed) onReveal?.();
  }

  const filled = Math.round((progress / 100) * TOTAL_BARS);
  const empty = TOTAL_BARS - filled;
  const bar = `[${"█".repeat(filled)}${"░".repeat(empty)}]`;
  const pctLabel = `${Math.round(progress)}%`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        cursor: dimmed ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Main window content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 8,
          background: "#1a1a2e",
          border: active ? "3px solid #3B82F6" : "3px solid #e2e0f0",
          boxShadow: active
            ? "5px 5px 0px #3B82F6"
            : "4px 4px 0px #4a4870",
          transition: "all 0.15s ease",
          overflow: "hidden",
          opacity: dimmed ? 0.45 : 1,
          filter: dimmed ? "blur(2px)" : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Terminal prompt title */}
        <div
          style={{
            padding: "0.4rem 0.75rem 0",
            fontFamily: FONT,
            fontSize: "0.68rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span style={{ color: "#22C55E", fontWeight: 700 }}>{"➜"}</span>
          {"  "}
          <span style={{ color: "#06B6D4", fontWeight: 600 }}>portfolio</span>
          <span style={{ color: "#e8e5f5" }}>:</span>
          <span style={{ color: "#A855F7", fontWeight: 600 }}>({title.toUpperCase()})</span>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: "0.4rem 0.75rem 0.75rem",
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {dimmed && isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.3rem",
              background: "rgba(14,14,28,0.7)",
              borderRadius: 8,
              border: "3px solid #e2e0f0",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <span
              style={{
                color: "#9896b8",
                fontFamily: FONT,
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                fontWeight: 700,
              }}
            >
              loading...
            </span>
            <span
              style={{
                color: "#3B82F6",
                fontFamily: FONT,
                fontSize: "0.62rem",
                letterSpacing: "0.04em",
                fontWeight: 700,
              }}
            >
              {bar}
            </span>
            <span
              style={{
                color: "#6b6890",
                fontFamily: FONT,
                fontSize: "0.58rem",
                fontWeight: 600,
              }}
            >
              {pctLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

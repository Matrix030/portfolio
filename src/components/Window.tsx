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
    // Outer wrapper: handles grid placement + events, never blurred
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
      {/* Blurred content — blur + opacity applied here so overlay escapes it */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          padding: 1,
          background: active
            ? "linear-gradient(45deg, #8caaee, #ca9ee6)"
            : "#51576d",
          boxShadow: active
            ? "0 4px 32px rgba(35,38,52,0.8), 0 0 20px rgba(140,170,238,0.15)"
            : "0 4px 32px rgba(35,38,52,0.8)",
          transition:
            "all 0.2s cubic-bezier(0.23,1,0.32,1), opacity 0.8s cubic-bezier(0.23,1,0.32,1), filter 0.8s cubic-bezier(0.23,1,0.32,1)",
          overflow: "hidden",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          opacity: dimmed ? 0.45 : 1,
          filter: dimmed ? "blur(3px)" : "none",
        }}
      >
        <div
          style={{
            background: "rgba(30,33,47,0.95)",
            borderRadius: 9,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
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
            <span style={{ color: "#a6d189" }}>{"➜"}</span>
            {"  "}
            <span style={{ color: "#99d1db" }}>portfolio</span>
            <span style={{ color: "#c6d0f5" }}>:</span>
            <span style={{ color: "#ca9ee6" }}>({title.toUpperCase()})</span>
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
      </div>

      {/* Loading overlay — sibling of blurred div, so it's never blurred */}
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
              background: "rgba(30,33,47,0.6)",
              borderRadius: 10,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <span
              style={{
                color: "#a5adce",
                fontFamily: FONT,
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
              }}
            >
              loading...
            </span>
            <span
              style={{
                color: "#8caaee",
                fontFamily: FONT,
                fontSize: "0.62rem",
                letterSpacing: "0.04em",
              }}
            >
              {bar}
            </span>
            <span
              style={{
                color: "#626880",
                fontFamily: FONT,
                fontSize: "0.58rem",
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

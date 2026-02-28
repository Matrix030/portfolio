"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const UNLOCK_EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];
const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatDate(d: Date): string {
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  return `${weekday}, ${month} ${day}`;
}

function fadeUp(delay: number) {
  return {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
  };
}

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [now, setNow] = useState(new Date());
  const debounceRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleUnlock = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    onUnlock();
  }, [onUnlock]);

  useEffect(() => {
    window.addEventListener("keydown", handleUnlock);
    window.addEventListener("click", handleUnlock);
    window.addEventListener("touchstart", handleUnlock);
    return () => {
      window.removeEventListener("keydown", handleUnlock);
      window.removeEventListener("click", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
    };
  }, [handleUnlock]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: UNLOCK_EASE } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        fontFamily: FONT,
        overflow: "hidden",
        background: "linear-gradient(135deg, #1a1c2e 0%, #232634 50%, #1e2030 100%)",
      }}
    >
      {/* Subtle radial glow behind clock */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(140,170,238,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Animated subtle grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(140,170,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(140,170,238,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {/* Avatar placeholder / icon */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #414559, #303446)",
            border: "1px solid rgba(140,170,238,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.5rem",
            boxShadow: "0 0 24px rgba(140,170,238,0.08), 0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>
            {/* Nerd font person icon */}
            
          </span>
        </motion.div>

        {/* Time */}
        <motion.div
          {...fadeUp(0.2)}
          style={{
            fontSize: "clamp(5rem, 12vw, 8.5rem)",
            color: "#c6d0f5",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textShadow: "0 0 60px rgba(140,170,238,0.2), 0 2px 0 rgba(0,0,0,0.5)",
          }}
        >
          {formatTime(now)}
        </motion.div>

        {/* Date */}
        <motion.div
          {...fadeUp(0.35)}
          style={{
            fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)",
            color: "#8caaee",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {formatDate(now)}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
          style={{
            width: "6rem",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(140,170,238,0.4), transparent)",
            margin: "0.25rem 0",
          }}
        />

        {/* Greeting */}
        <motion.div
          {...fadeUp(0.55)}
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
            color: "rgba(198,208,245,0.55)",
            letterSpacing: "0.05em",
          }}
        >
          Hey visitor, welcome back!
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 1 } }}
          style={{ marginTop: "1.5rem" }}
        >
          <motion.div
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: "0.65rem",
              color: "rgba(140,170,238,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ display: "inline-block", width: 16, height: 1, background: "rgba(140,170,238,0.4)" }} />
            press any key to continue
            <span style={{ display: "inline-block", width: 16, height: 1, background: "rgba(140,170,238,0.4)" }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom left — system info */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.9 } }}
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.2rem",
        }}
      >
        <span style={{ color: "rgba(140,170,238,0.4)", fontSize: "0.62rem", letterSpacing: "0.05em" }}>
          Linux 6.18.9-arch1-2
        </span>
        <span style={{ color: "rgba(140,170,238,0.3)", fontSize: "0.62rem" }}>
          up 2h 30m
        </span>
      </motion.div>

      {/* Bottom right — location */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.9 } }}
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.75rem",
        }}
      >
        <span style={{ color: "rgba(140,170,238,0.4)", fontSize: "0.62rem", letterSpacing: "0.05em" }}>
          New York, NY
        </span>
      </motion.div>
    </motion.div>
  );
}

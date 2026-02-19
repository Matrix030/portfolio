"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const UNLOCK_EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatDate(d: Date): string {
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const day = d.getDate();
  return `${weekday} | ${day}`;
}

function fadeUp(delay: number) {
  return {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay } },
  };
}

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [now, setNow] = useState(new Date());
  const debounceRef = useRef(false);

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Unlock handlers with 300ms debounce
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
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: UNLOCK_EASE } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.25)",
        fontFamily: '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
        overflow: "hidden",
      }}
    >

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
          gap: "0.5rem",
        }}
      >
        {/* Time */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            fontSize: "clamp(4rem, 10vw, 7rem)",
            color: "rgba(200,200,200,1.0)",
            fontWeight: 200,
            letterSpacing: "0.05em",
            lineHeight: 1,
            textShadow: "0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          {formatTime(now)}
        </motion.div>

        {/* Date */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
            color: "rgba(200,200,200,1.0)",
            fontWeight: 300,
          }}
        >
          {formatDate(now)}
        </motion.div>

        {/* Greeting */}
        <motion.div
          {...fadeUp(0.5)}
          style={{
            fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
            color: "rgba(200,200,200,0.85)",
            marginTop: "0.5rem",
          }}
        >
          Hey visitor, welcome back!
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.8 } }}
          style={{ marginTop: "2rem" }}
        >
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: "0.72rem",
              color: "rgba(200,200,200,0.4)",
            }}
          >
            press any key to continue
          </motion.span>
        </motion.div>
      </div>

      {/* Bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        <span style={{ color: "rgba(200,200,200,0.6)", fontSize: "0.72rem" }}>
          Linux 6.18.9-arch1-2
        </span>
        <span style={{ color: "rgba(200,200,200,0.6)", fontSize: "0.72rem" }}>
          up 2h 30m
        </span>
      </div>

      {/* Bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          right: "1.5rem",
        }}
      >
        <span style={{ color: "rgba(200,200,200,0.6)", fontSize: "0.72rem" }}>
          ⛅ New York, NY
        </span>
      </div>
    </motion.div>
  );
}

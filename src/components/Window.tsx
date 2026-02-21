"use client";

import { useRef } from "react";

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
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    onMouseEnter();
    if (dimmed && onReveal) {
      hoverTimer.current = setTimeout(() => {
        onReveal();
      }, 1500);
    }
  }

  function handleMouseLeave() {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }

  function handleClick() {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    if (dimmed && onReveal) onReveal();
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: 10,
        padding: 1,
        background: active
          ? "linear-gradient(45deg, #8caaee, #ca9ee6)"
          : "#51576d",
        boxShadow: active
          ? "0 4px 32px rgba(35,38,52,0.8), 0 0 20px rgba(140,170,238,0.15)"
          : "0 4px 32px rgba(35,38,52,0.8)",
        transition: "all 0.2s cubic-bezier(0.23,1,0.32,1), opacity 0.8s cubic-bezier(0.23,1,0.32,1), filter 0.8s cubic-bezier(0.23,1,0.32,1)",
        overflow: "hidden",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        opacity: dimmed ? 0.45 : 1,
        filter: dimmed ? "blur(3px)" : "none",
        cursor: dimmed ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Inner container with actual background */}
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
            fontFamily:
              '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
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
  );
}

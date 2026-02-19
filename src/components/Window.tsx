"use client";

interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  onMouseEnter: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Window({
  title,
  isActive,
  onMouseEnter,
  children,
  className,
  style,
}: WindowProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: 10,
        padding: 1,
        background: isActive
          ? "linear-gradient(45deg, #8caaee, #ca9ee6)"
          : "#51576d",
        boxShadow: "0 4px 32px rgba(35,38,52,0.8)",
        transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
        overflow: "hidden",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        ...style,
      }}
      onMouseEnter={onMouseEnter}
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

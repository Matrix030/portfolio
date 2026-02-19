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

const trafficLights = [
  { color: "#e78284", label: "close" },
  { color: "#e5c890", label: "minimize" },
  { color: "#a6d189", label: "maximize" },
];

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
          background: "rgba(48,52,70,0.95)",
          borderRadius: 9,
          width: "100%",
          height: "100%",
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
            background: "rgba(41,44,60,0.8)",
            borderBottom: "1px solid rgba(81,87,109,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0.75rem",
          }}
        >
          <span
            style={{
              color: "#c6d0f5",
              fontSize: "0.72rem",
              fontFamily:
                '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {trafficLights.map((light) => (
              <div
                key={light.label}
                style={{
                  width: "0.6rem",
                  height: "0.6rem",
                  borderRadius: "50%",
                  background: light.color,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: "0.75rem",
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

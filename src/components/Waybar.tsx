"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";


function formatClock(now: Date): string {
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const day = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  return `${weekday} | ${day} - ${h}:${m}:${s}`;
}



interface Workspace {
  id: number;
  activeIcon: string;
  inactiveIcon: string;
}

const workspaces: Workspace[] = [
  { id: 1, activeIcon: "\u2B24", inactiveIcon: "\u25CB" },
  { id: 2, activeIcon: "\u2B24", inactiveIcon: "\u25CB" },
  { id: 3, activeIcon: "\u2B24", inactiveIcon: "\u25CB" },
];

// --- CPU Module ---
const BAR_CHARS = ["\u2581", "\u2582", "\u2583", "\u2584", "\u2585", "\u2586", "\u2587", "\u2588"];

function useCpuSimulation() {
  const [cores, setCores] = useState([15, 12, 18, 10]);
  const [overall, setOverall] = useState(15);

  useEffect(() => {
    const id = setInterval(() => {
      setCores((prev) =>
        prev.map((v) =>
          Math.max(5, Math.min(95, v + (Math.random() - 0.5) * 8))
        )
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setOverall(Math.round(cores.reduce((a, b) => a + b, 0) / cores.length));
  }, [cores]);

  return { cores, overall };
}

function cpuColor(pct: number): string {
  if (pct < 50) return "#22C55E";
  if (pct < 80) return "#FBBF24";
  return "#EF4444";
}

function CpuBar({ value, prevValue }: { value: number; prevValue: number }) {
  const idx = Math.min(7, Math.floor((value / 100) * 8));
  const changed = idx !== Math.min(7, Math.floor((prevValue / 100) * 8));

  return (
    <motion.span
      animate={changed ? { opacity: [0.4, 1] } : {}}
      transition={{ duration: 0.2 }}
      style={{ color: cpuColor(value) }}
    >
      {BAR_CHARS[idx]}
    </motion.span>
  );
}

function CpuModule() {
  const { cores, overall } = useCpuSimulation();
  const prevCores = useRef(cores);

  useEffect(() => {
    prevCores.current = cores;
  });

  return (
    <Module color={cpuColor(overall)}>
      {"cpu"}{" "}
      {cores.map((c, i) => (
        <CpuBar key={i} value={c} prevValue={prevCores.current[i]} />
      ))}{" "}
      <AnimatedNumber value={overall} decimals={0} />%
    </Module>
  );
}

// --- Memory Module ---
function useMemorySimulation() {
  const [used, setUsed] = useState(7.2);

  useEffect(() => {
    const id = setInterval(() => {
      setUsed((prev) =>
        Math.max(4, Math.min(30, prev + (Math.random() - 0.5) * 0.4))
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return used;
}

function memColor(used: number): string {
  if (used < 24) return "#e8e5f5";
  if (used < 28) return "#FBBF24";
  return "#EF4444";
}

function MemoryModule() {
  const used = useMemorySimulation();
  const color = memColor(used);

  return (
    <Module color={color}>
      <motion.span
        key={Math.round(used * 10)}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.3 }}
        style={{ display: "inline-block" }}
      >
        {"mem"} <AnimatedNumber value={used} decimals={1} />G/31.3G
      </motion.span>
    </Module>
  );
}

// --- Network Module ---
function useNetworkSimulation() {
  const [bandwidth, setBandwidth] = useState(150);

  useEffect(() => {
    const id = setInterval(() => {
      setBandwidth((prev) =>
        Math.max(10, Math.min(500, prev + (Math.random() - 0.5) * 160))
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return bandwidth;
}

function NetworkModule() {
  const bandwidth = useNetworkSimulation();

  return (
    <Module color="#06B6D4">
      {"net"} <AnimatedNumber value={bandwidth} decimals={1} />
      Mbits
    </Module>
  );
}

// --- Audio Module ---
function AudioModule() {
  return (
    <Module color="#F43F5E">
      <motion.span
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
      >
        {"vol"}
      </motion.span>{" "}
      75%
    </Module>
  );
}

// --- Uptime Module ---
function UptimeModule() {
  const startTime = useRef(Date.now());
  const [elapsed, setElapsed] = useState("up 0h 0m");

  useEffect(() => {
    function update() {
      const diff = Math.floor((Date.now() - startTime.current) / 1000);
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      setElapsed(`up ${h}h ${m}m`);
    }
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <Module color="#6b6890">
      {elapsed}
    </Module>
  );
}

// --- Animated Number (spring-based) ---
function AnimatedNumber({
  value,
  decimals,
}: {
  value: number;
  decimals: number;
}) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  const display = useTransform(spring, (v) => v.toFixed(decimals));
  const [text, setText] = useState(value.toFixed(decimals));

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return unsub;
  }, [display]);

  return <>{text}</>;
}

// --- Main Waybar ---
interface WaybarProps {
  activeWorkspace: number;
  onWorkspaceChange: (n: number) => void;
}

export default function Waybar({
  activeWorkspace,
  onWorkspaceChange,
}: WaybarProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
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
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        background: "#1a1a2e",
        borderBottom: "3px solid #e2e0f0",
        fontFamily:
          '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
        fontSize: "0.6rem",
        color: "#e8e5f5",
        boxShadow: "0 3px 0px #4a4870",
      }}
    >
      {/* LEFT: Workspaces */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: 8,
          gap: 2,
        }}
      >
        {workspaces.map((ws) => {
          const isActive = ws.id === activeWorkspace;
          return (
            <button
              key={ws.id}
              onClick={() => onWorkspaceChange(ws.id)}
              style={{
                background: isActive ? "#FBBF24" : "#1a1a2e",
                border: "2px solid #e2e0f0",
                borderRadius: 4,
                padding: "0.25rem 0.4rem",
                color: isActive ? "#1a1a2e" : "#e8e5f5",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: 1,
                fontWeight: isActive ? 700 : 400,
                boxShadow: isActive ? "2px 2px 0px #4a4870" : "none",
                transition: "all 0.1s",
              }}
            >
              {ws.id}: {isActive ? ws.activeIcon : ws.inactiveIcon}
            </button>
          );
        })}
      </div>

      {/* CENTER: Clock */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            background: "#0c1f2e",
            border: "2px solid #e2e0f0",
            borderRadius: 4,
            padding: "0.2rem 0.6rem",
            color: "#e8e5f5",
            whiteSpace: "nowrap",
            fontWeight: 600,
            boxShadow: "2px 2px 0px #4a4870",
          }}
        >
          {now ? formatClock(now) : "\u00A0"}
        </div>
      </div>

      {/* RIGHT: System modules */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: 8,
          gap: 4,
        }}
      >
        <AudioModule />
        <UptimeModule />
        <NetworkModule />
        <CpuModule />
        <MemoryModule />
      </div>
    </div>
  );
}

function Module({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#1a1a2e",
        border: "2px solid #e2e0f0",
        padding: "0.2rem 0.5rem",
        color,
        borderRadius: 4,
        whiteSpace: "nowrap",
        fontSize: "0.6rem",
        lineHeight: 1,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

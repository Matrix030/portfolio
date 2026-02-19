"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  animate,
  useMotionValue,
} from "framer-motion";

const GRADUATION_DATE = new Date("2026-05-05T00:00:00").getTime();

function formatClock(now: Date): string {
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const day = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  return `${weekday} | ${day} - ${h}:${m}:${s}`;
}

function formatCountdown(now: Date): string {
  const diff = GRADUATION_DATE - now.getTime();
  if (diff <= 0) return "\uD83C\uDF93 Graduated!";
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSec % 60).padStart(2, "0");
  return `\uD83C\uDF93 ${days}d ${hours}:${mins}:${secs}`;
}

interface Workspace {
  id: number;
  activeIcon: string;
  inactiveIcon: string;
}

const workspaces: Workspace[] = [
  { id: 1, activeIcon: "\uf444", inactiveIcon: "\uf4c3" },
  { id: 2, activeIcon: "\uf444", inactiveIcon: "\uf4c3" },
  { id: 3, activeIcon: "\uf444", inactiveIcon: "\uf4c3" },
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
  if (pct < 50) return "#a6d189";
  if (pct < 80) return "#e5c890";
  return "#e78284";
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
    <Module color={cpuColor(overall)} borderRadius="0">
      {"\uf4bc"}{" "}
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
  if (used < 24) return "#c6d0f5";
  if (used < 28) return "#e5c890";
  return "#e78284";
}

function MemoryModule() {
  const used = useMemorySimulation();
  const color = memColor(used);

  return (
    <Module color={color} borderRadius="0 5px 5px 0">
      <motion.span
        key={Math.round(used * 10)}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.3 }}
        style={{ display: "inline-block" }}
      >
        {"\uf035b"} <AnimatedNumber value={used} decimals={1} />G/31.3G
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
    <Module color="#99d1db" borderRadius="0">
      {"\udb82\udd22"} <AnimatedNumber value={bandwidth} decimals={1} />
      Mbits
    </Module>
  );
}

// --- Audio Module ---
function AudioModule() {
  return (
    <Module color="#ea999c" borderRadius="5px 0 0 5px">
      <motion.span
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
      >
        {"\uf028"}
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
    <Module color="#949cbb" borderRadius="0">
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
        top: 2,
        left: 2,
        right: 2,
        height: 32,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        background: "#292c3c",
        borderRadius: 5,
        fontFamily:
          '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
        fontSize: 13,
        color: "#c6d0f5",
        boxShadow: "0 2px 8px rgba(35,38,52,0.8)",
      }}
    >
      {/* LEFT: Workspaces */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#292c3c",
          borderRadius: 5,
          margin: 5,
          marginLeft: 2,
        }}
      >
        {workspaces.map((ws) => {
          const isActive = ws.id === activeWorkspace;
          return (
            <button
              key={ws.id}
              onClick={() => onWorkspaceChange(ws.id)}
              style={{
                background: "#292c3c",
                border: "none",
                borderRadius: 5,
                padding: "0.4rem",
                color: isActive ? "#99d1db" : "#babbf1",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                lineHeight: 1,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#414559";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#292c3c";
              }}
            >
              {ws.id}: {isActive ? ws.activeIcon : ws.inactiveIcon}
            </button>
          );
        })}
      </div>

      {/* CENTER: Clock + Graduation */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#292c3c",
            borderRadius: 5,
            padding: "0.5rem 1rem",
            margin: "5px 0",
            color: "#8caaee",
            whiteSpace: "nowrap",
          }}
        >
          {now ? formatClock(now) : "\u00A0"}
        </div>
        <div
          style={{
            background: "#292c3c",
            borderRadius: 5,
            padding: "0.5rem 1rem",
            margin: "5px 0 5px 0.5rem",
            color: "#f4b8e4",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {now ? formatCountdown(now) : "\u00A0"}
        </div>
      </div>

      {/* RIGHT: System modules */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "5px 2px 5px 0",
          marginLeft: "auto",
        }}
      >
        <AudioModule />
        <UptimeModule />
        <NetworkModule />
        <CpuModule />
        <MemoryModule />
        <div style={{ width: 16, height: 16, marginLeft: 4 }} />
      </div>
    </div>
  );
}

function Module({
  color,
  borderRadius,
  children,
}: {
  color: string;
  borderRadius: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#292c3c",
        padding: "0.5rem 1rem",
        margin: "5px 0",
        color,
        borderRadius,
        whiteSpace: "nowrap",
        fontSize: 13,
        lineHeight: 1,
        transition: "color 0.4s ease",
      }}
    >
      {children}
    </div>
  );
}

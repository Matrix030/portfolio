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
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: UNLOCK_EASE } }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: "rgba(14,14,28,0.85)",
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
                        color: "#e8e5f5",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        textShadow: "4px 4px 0px #3B82F6",
                    }}
                >
                    {formatTime(now)}
                </motion.div>

                {/* Date */}
                <motion.div
                    {...fadeUp(0.4)}
                    style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
                        color: "#e8e5f5",
                        fontWeight: 700,
                    }}
                >
                    {formatDate(now)}
                </motion.div>

                {/* Greeting */}
                <motion.div
                    {...fadeUp(0.5)}
                    style={{
                        fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
                        color: "#9896b8",
                        marginTop: "0.5rem",
                        fontWeight: 600,
                        background: "#FBBF24",
                        border: "3px solid #e2e0f0",
                        borderRadius: 6,
                        padding: "0.4rem 1rem",
                        boxShadow: "3px 3px 0px #4a4870",
                    }}
                >
                    Hey visitor, welcome to my portfolio!
                </motion.div>

                {/* Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.8 } }}
                    style={{ marginTop: "2rem" }}
                >
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            fontSize: "0.72rem",
                            color: "#6b6890",
                            fontWeight: 600,
                            border: "2px solid #e2e0f0",
                            borderRadius: 4,
                            padding: "0.3rem 0.8rem",
                            background: "#1a1a2e",
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
                <span style={{ color: "#6b6890", fontSize: "0.72rem", fontWeight: 600 }}>
                    Linux 6.18.9-arch1-2
                </span>
                <span style={{ color: "#6b6890", fontSize: "0.72rem", fontWeight: 600 }}>
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
                <span style={{ color: "#6b6890", fontSize: "0.72rem", fontWeight: 600 }}>
                    New York, NY
                </span>
            </div>
        </motion.div>
    );
}

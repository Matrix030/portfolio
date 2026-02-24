"use client";

import { AnimatePresence, motion } from "framer-motion";
import DwindleDesktop from "./dwindle/DwindleDesktop";
import TechGraph from "./workspace2/TechGraph";
import GitHubActivity from "./workspace2/GitHubActivity";

const FADE_EASE: [number, number, number, number] = [0.5, 0.5, 0.75, 1.0];

function WorkspacePlaceholder({ label }: { label: string }) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: "#232634",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <span
                style={{
                    color: "#737994",
                    fontSize: "0.85rem",
                    fontFamily:
                        '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace',
                }}
            >
                {label}
            </span>
        </div>
    );
}

export default function WorkspaceManager({
    activeWorkspace,
    skipInitialAnimation,
}: {
    activeWorkspace: number;
    skipInitialAnimation?: boolean;
}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeWorkspace}
                initial={skipInitialAnimation ? false : { opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { duration: 0.15, ease: FADE_EASE },
                }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.15, ease: FADE_EASE },
                }}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >
                {activeWorkspace === 1 && <DwindleDesktop />}
                {activeWorkspace === 2 && (
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            background: "#232634",
                        }}
                    >
                        <div style={{ flex: "0 0 60%", minWidth: 0, height: "100%", position: "relative" }}>
                            <TechGraph />
                        </div>
                        <div
                            style={{
                                flex: "0 0 40%",
                                minWidth: 0,
                                height: "100%",
                            }}
                        >
                            <GitHubActivity />
                        </div>
                    </div>
                )}
                {activeWorkspace === 3 && (
                    <WorkspacePlaceholder label="Developing more!" />
                )}
            </motion.div>
        </AnimatePresence>
    );
}

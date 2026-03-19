"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';
const STORAGE_KEY = "onboarding_v1_seen";

const STEPS = [
  {
    tag: "workspaces",
    title: "three workspaces",
    body: (
      <>
        Click{" "}
        <Kbd>1</Kbd> <Kbd>2</Kbd> <Kbd>3</Kbd>
        {" "}or the dots in the top-left bar to switch between workspaces.
        Each one has a different view of my work.
      </>
    ),
    hint: "1 · 2 · 3 on your keyboard",
  },
  {
    tag: "workspace 1",
    title: "drag & rearrange windows",
    body: (
      <>
        Grab any window by its title bar and drop it onto another window
        to split and rearrange. The layout adapts automatically.{" "}
        <Dim>Q close · Tab cycle focus · F fullscreen</Dim>
      </>
    ),
    hint: "dwindle tiling layout",
  },
  {
    tag: "workspace 3",
    title: "AI-ready context",
    body: (
      <>
        Workspace{" "}
        <Kbd>3</Kbd>
        {" "}exposes <Accent>master.json</Accent> — a structured snapshot of my
        full background. Curl it and drop it into ChatGPT, Claude, or any LLM
        to ask anything about me.
      </>
    ),
    hint: "curl https://rishikesh.dev/master.json",
  },
] as const;

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#FBBF24",
        border: "2px solid #1a1a2e",
        borderRadius: 3,
        padding: "0px 5px",
        fontSize: "0.62rem",
        color: "#1a1a2e",
        fontFamily: FONT,
        lineHeight: 1.6,
        fontWeight: 700,
        boxShadow: "1px 1px 0px #1a1a2e",
      }}
    >
      {children}
    </span>
  );
}

function Dim({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#6B7280", fontWeight: 600 }}>{children}</span>;
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#22C55E", fontWeight: 700 }}>{children}</span>;
}

export default function OnboardingHint() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  }

  const current = STEPS[step];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 400,
            width: "clamp(320px, 38vw, 460px)",
            background: "#FFFFFF",
            border: "3px solid #1a1a2e",
            borderRadius: 8,
            boxShadow: "6px 6px 0px #1a1a2e",
            fontFamily: FONT,
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              height: "1.9rem",
              background: "#A855F7",
              borderBottom: "3px solid #1a1a2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 0.65rem",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#FFFFFF", fontSize: "0.62rem", fontWeight: 700 }}>
                hyprland
              </span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.62rem" }}>·</span>
              <span style={{ color: "#FBBF24", fontSize: "0.62rem", fontWeight: 700 }}>
                {current.tag}
              </span>
            </div>
            <button
              onClick={dismiss}
              style={{
                background: "#FFFFFF",
                border: "2px solid #1a1a2e",
                color: "#1a1a2e",
                cursor: "pointer",
                fontSize: "0.7rem",
                lineHeight: 1,
                padding: "1px 5px",
                borderRadius: 3,
                fontFamily: FONT,
                fontWeight: 700,
              }}
            >
              x
            </button>
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.18 } }}
              exit={{ opacity: 0, x: -8, transition: { duration: 0.12 } }}
              style={{ padding: "0.75rem 0.85rem 0.6rem" }}
            >
              <div
                style={{
                  color: "#1a1a2e",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  marginBottom: "0.4rem",
                }}
              >
                {current.title}
              </div>
              <div
                style={{
                  color: "#374151",
                  fontSize: "0.68rem",
                  lineHeight: 1.65,
                  fontWeight: 500,
                }}
              >
                {current.body}
              </div>
              {current.hint && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    background: "#F5F0E8",
                    border: "2px solid #1a1a2e",
                    borderRadius: 4,
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.6rem",
                    color: "#1a1a2e",
                    display: "inline-block",
                    fontWeight: 700,
                  }}
                >
                  {current.hint}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer: dots + button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.4rem 0.85rem 0.65rem",
            }}
          >
            {/* Step dots */}
            <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === step ? 18 : 8,
                    height: 8,
                    borderRadius: 3,
                    background: i === step ? "#3B82F6" : "#F5F0E8",
                    border: "2px solid #1a1a2e",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            {/* Next / Got it */}
            <button
              onClick={next}
              style={{
                background: step === STEPS.length - 1 ? "#22C55E" : "#FBBF24",
                border: "2px solid #1a1a2e",
                borderRadius: 4,
                padding: "0.25rem 0.75rem",
                fontSize: "0.65rem",
                color: "#1a1a2e",
                cursor: "pointer",
                fontFamily: FONT,
                fontWeight: 700,
                boxShadow: "2px 2px 0px #1a1a2e",
                transition: "all 0.1s",
              }}
            >
              {step === STEPS.length - 1 ? "got it" : "next →"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

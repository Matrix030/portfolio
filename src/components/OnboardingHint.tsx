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

// --- Small inline helpers (defined before use) ---

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#414559",
        border: "1px solid #51576d",
        borderRadius: 3,
        padding: "0px 5px",
        fontSize: "0.62rem",
        color: "#c6d0f5",
        fontFamily: FONT,
        lineHeight: 1.6,
      }}
    >
      {children}
    </span>
  );
}

function Dim({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#737994" }}>{children}</span>;
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#a6d189" }}>{children}</span>;
}

// --- Main component ---

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
            background: "rgba(41,44,60,0.97)",
            border: "1px solid #51576d",
            borderRadius: 10,
            boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
            fontFamily: FONT,
            overflow: "hidden",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              height: "1.9rem",
              background: "rgba(35,38,52,0.8)",
              borderBottom: "1px solid rgba(81,87,109,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 0.65rem",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#737994", fontSize: "0.62rem" }}>
                hyprland
              </span>
              <span style={{ color: "#51576d", fontSize: "0.62rem" }}>·</span>
              <span style={{ color: "#8caaee", fontSize: "0.62rem" }}>
                {current.tag}
              </span>
            </div>
            <button
              onClick={dismiss}
              style={{
                background: "none",
                border: "none",
                color: "#737994",
                cursor: "pointer",
                fontSize: "0.75rem",
                lineHeight: 1,
                padding: "2px 4px",
                borderRadius: 3,
                fontFamily: FONT,
              }}
            >
              ×
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
                  color: "#c6d0f5",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                {current.title}
              </div>
              <div
                style={{
                  color: "#a5adce",
                  fontSize: "0.68rem",
                  lineHeight: 1.65,
                }}
              >
                {current.body}
              </div>
              {current.hint && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    background: "rgba(65,69,89,0.5)",
                    borderRadius: 4,
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.6rem",
                    color: "#737994",
                    display: "inline-block",
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
                    width: i === step ? 16 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === step ? "#8caaee" : "#414559",
                    transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
                  }}
                />
              ))}
            </div>

            {/* Next / Got it */}
            <button
              onClick={next}
              style={{
                background: step === STEPS.length - 1 ? "rgba(140,170,238,0.15)" : "#414559",
                border: `1px solid ${step === STEPS.length - 1 ? "#8caaee" : "#51576d"}`,
                borderRadius: 5,
                padding: "0.25rem 0.75rem",
                fontSize: "0.65rem",
                color: step === STEPS.length - 1 ? "#8caaee" : "#c6d0f5",
                cursor: "pointer",
                fontFamily: FONT,
                transition: "all 0.15s",
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

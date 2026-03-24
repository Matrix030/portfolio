"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v13M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

const items = [
  {
    label: "Resume",
    icon: <IconDownload />,
    color: "#22C55E",
    bg: "#0d2518",
    action: "download" as const,
    href: "/Portfolio_Rishikesh_Gharat_Resume.pdf",
  },
  {
    label: "LinkedIn",
    icon: <IconLinkedIn />,
    color: "#3B82F6",
    bg: "#1a2545",
    action: "link" as const,
    href: "https://linkedin.com/in/rishikesh-gharat",
  },
  {
    label: "GitHub",
    icon: <IconGitHub />,
    color: "#A855F7",
    bg: "#1d1430",
    action: "link" as const,
    href: "https://github.com/Matrix030",
  },
];

const reversedItems = [...items].reverse();

export default function ContactFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [mainHovered, setMainHovered] = useState(false);

  function handleAction(item: (typeof items)[number]) {
    if (item.action === "link") {
      window.open(item.href, "_blank");
    } else {
      const a = document.createElement("a");
      a.href = item.href;
      a.download = "Portfolio_Rishikesh_Gharat_Resume.pdf";
      a.click();
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1.25rem",
        zIndex: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setHoveredLabel(null);
      }}
    >
      {/* Expandable items */}
      <AnimatePresence>
        {isOpen &&
          reversedItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{
                duration: 0.15,
                ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
                delay: i * 0.05,
              }}
              style={{ position: "relative" }}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredLabel === item.label && (
                  <motion.div
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.1 }}
                    style={{
                      position: "absolute",
                      right: "3.2rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#1a1a2e",
                      border: "2px solid #e2e0f0",
                      borderRadius: 4,
                      padding: "3px 8px",
                      fontSize: "0.65rem",
                      color: "#e8e5f5",
                      whiteSpace: "nowrap",
                      fontFamily: FONT,
                      fontWeight: 700,
                      pointerEvents: "none",
                      boxShadow: "2px 2px 0px #4a4870",
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item button */}
              <button
                onClick={() => handleAction(item)}
                onMouseEnter={() => setHoveredLabel(item.label)}
                onMouseLeave={() => setHoveredLabel(null)}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: 8,
                  background: hoveredLabel === item.label ? item.bg : "#1a1a2e",
                  border: "3px solid #e2e0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: item.color,
                  transition: "all 0.1s",
                  boxShadow: hoveredLabel === item.label
                    ? "3px 3px 0px #4a4870"
                    : "2px 2px 0px #4a4870",
                  outline: "none",
                }}
              >
                {item.icon}
              </button>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main trigger button */}
      <button
        onMouseEnter={() => setMainHovered(true)}
        onMouseLeave={() => setMainHovered(false)}
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: 8,
          background: mainHovered ? "#FBBF24" : "#1a1a2e",
          border: "3px solid #e2e0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: mainHovered ? "#1a1a2e" : "#e8e5f5",
          transition: "all 0.1s",
          boxShadow: mainHovered ? "3px 3px 0px #4a4870" : "2px 2px 0px #4a4870",
          outline: "none",
        }}
      >
        <IconMail />
      </button>
    </div>
  );
}

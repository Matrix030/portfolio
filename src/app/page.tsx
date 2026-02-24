"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Waybar from "@/components/Waybar";
import WorkspaceManager from "@/components/WorkspaceManager";
import LockScreen from "@/components/LockScreen";
import ContactFAB from "@/components/ContactFAB";
import MobileLayout from "@/components/mobile/MobileLayout";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  const desktopRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isLocked) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 3) {
        setActiveWorkspace(num);
      }
    },
    [isLocked]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#232634",
      }}
    >
      {/* Desktop always rendered underneath, blurred when locked */}
      <div
        ref={desktopRef}
        style={{
          width: "100%",
          height: "100%",
          filter: isLocked ? "blur(12px) brightness(0.6)" : "none",
          transition: "filter 0.5s ease",
        }}
      >
        {isMobile ? (
          <MobileLayout />
        ) : (
          <>
            <Waybar
              activeWorkspace={activeWorkspace}
              onWorkspaceChange={setActiveWorkspace}
            />
            <div
              style={{
                position: "absolute",
                top: "2rem",
                left: 0,
                right: 0,
                bottom: 0,
                height: "calc(100% - 2rem)",
              }}
            >
              <WorkspaceManager
                activeWorkspace={activeWorkspace}
                skipInitialAnimation={isLocked}
              />
            </div>
          </>
        )}
      </div>

      {/* Lock screen on top, fades out */}
      <AnimatePresence>
        {isLocked && (
          <LockScreen onUnlock={() => setIsLocked(false)} />
        )}
      </AnimatePresence>

      {/* Persistent contact FAB — hidden while locked */}
      {!isLocked && <ContactFAB />}
    </div>
  );
}

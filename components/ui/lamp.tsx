"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center overflow-hidden w-full h-full z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left cone */}
        <div
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, #05C3A8, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-72 w-[30rem] overflow-visible"
        >
          <div className="absolute w-full left-0 bg-[#010A13] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-[#010A13] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>
        {/* Right cone */}
        <div
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, #1EEFFF)`,
          }}
          className="absolute inset-auto left-1/2 h-72 w-[30rem]"
        >
          <div className="absolute w-40 h-full right-0 bg-[#010A13] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#010A13] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>
        {/* Background blur layer */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#010A13] blur-xl"></div>
        {/* Glow effect */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#ABFFE9] opacity-40 blur-2xl"></div>
        {/* Inner glow */}
        <div className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#05C3A8] blur-xl"></div>
        {/* Light bar */}
        <div className="absolute inset-auto z-50 h-1 w-[30rem] -translate-y-[7rem] rounded-full bg-[#1EEFFF]"></div>
        {/* Top mask */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#010A13]"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export default function LampDemo() {
  return (
    <LampContainer>
      <div></div>
    </LampContainer>
  );
}

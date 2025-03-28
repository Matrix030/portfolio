"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import SeveranceUI from "./SeveranceUI"

interface SeveranceUIInlineProps {
  title?: string
  description?: string
  height?: string | number
  className?: string
  onComplete?: (time: number) => void
}

export const SeveranceUIInline: React.FC<SeveranceUIInlineProps> = ({
  title = "Severance UI Recreation",
  description = "A recreation of the Macrodata Refinement interface from the Apple TV+ show Severance",
  height = "400px",
  className = "",
  onComplete
}) => {
  const [isActive, setIsActive] = useState(false)
  const [completionTime, setCompletionTime] = useState<number | null>(null)

  const handleComplete = (time: number) => {
    setCompletionTime(time)
    // Call the parent component's onComplete callback if provided
    if (onComplete) {
      onComplete(time)
    }
  }

  return (
    <div className={`${className} border-2 border-cyan-500/30 rounded-lg overflow-hidden bg-[#010A13]`}>
      {isActive ? (
        <div style={{ height }} className="relative overflow-hidden">
          <SeveranceUI height="100%" onComplete={handleComplete} />
        </div>
      ) : (
        <div
          style={{ height }}
          className="bg-slate-900 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800/80 transition-all"
          onClick={() => setIsActive(true)}
        >
          <div className="text-cyan-400 font-mono text-center mb-8 transform transition-transform hover:scale-105">
            <div className="text-4xl md:text-5xl mb-4 font-manifold">MACRODATA</div>
            <div className="text-xl md:text-2xl font-manifold">REFINEMENT</div>
          </div>
          <Button 
            onClick={() => setIsActive(true)}
            className="bg-cyan-700 hover:bg-cyan-600 text-white font-medium px-6 py-3 text-lg"
          >
            Start Refinement
          </Button>
        </div>
      )}
      {completionTime && (
        <div className="bg-slate-900 py-4 border-t border-cyan-500/30">
          <p className="text-center font-medium text-lg text-cyan-400 font-forma">
            Refinement completed in {(completionTime / 1000).toFixed(2)} seconds!
          </p>
        </div>
      )}
    </div>
  )
}

export default SeveranceUIInline


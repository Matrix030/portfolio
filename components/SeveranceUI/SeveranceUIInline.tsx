"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className={`${className} border-cyan-500/30`}>
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl md:text-3xl text-cyan-400">{title}</CardTitle>
        <CardDescription className="text-base md:text-lg mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isActive ? (
          <div style={{ height }} className="relative rounded-md overflow-hidden border-2 border-cyan-700/50">
            <SeveranceUI height="100%" onComplete={handleComplete} />
          </div>
        ) : (
          <div
            style={{ height }}
            className="bg-slate-900 rounded-md flex flex-col items-center justify-center cursor-pointer border-2 border-cyan-700/50 transition-all hover:border-cyan-500"
            onClick={() => setIsActive(true)}
          >
            <div className="text-cyan-400 font-mono text-center mb-8 transform transition-transform hover:scale-105">
              <div className="text-4xl md:text-5xl mb-4">MACRODATA</div>
              <div className="text-xl md:text-2xl">REFINEMENT</div>
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
          <p className="mt-6 text-center font-medium text-lg text-cyan-400">
            Refinement completed in {(completionTime / 1000).toFixed(2)} seconds!
          </p>
        )}
      </CardContent>
      <CardFooter className="text-base text-muted-foreground pt-6">
        <p>
          Click and drag to select groups of numbers. If enough selected numbers are &quot;refinable,&quot; they will be sent to
          one of the bins at the bottom. The goal is to fill all bins to 100%.
        </p>
      </CardFooter>
    </Card>
  )
}

export default SeveranceUIInline


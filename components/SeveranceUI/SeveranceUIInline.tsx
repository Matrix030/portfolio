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
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isActive ? (
          <div style={{ height }} className="relative rounded-md overflow-hidden">
            <SeveranceUI height="100%" onComplete={handleComplete} />
          </div>
        ) : (
          <div
            style={{ height }}
            className="bg-slate-900 rounded-md flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setIsActive(true)}
          >
            <div className="text-cyan-400 font-mono text-center mb-4">
              <div className="text-2xl mb-2">MACRODATA</div>
              <div className="text-sm">REFINEMENT</div>
            </div>
            <Button onClick={() => setIsActive(true)}>Start Refinement</Button>
          </div>
        )}
        {completionTime && (
          <p className="mt-4 text-center font-medium">
            Refinement completed in {(completionTime / 1000).toFixed(2)} seconds!
          </p>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          Click and drag to select groups of numbers. If enough selected numbers are "refinable," they will be sent to
          one of the bins at the bottom. The goal is to fill all bins to 100%.
        </p>
      </CardFooter>
    </Card>
  )
}

export default SeveranceUIInline


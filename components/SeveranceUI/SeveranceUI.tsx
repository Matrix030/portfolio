"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import styles from "./SeveranceUI.module.css"

// Import p5 dynamically to avoid SSR issues
const P5Wrapper = dynamic(() => import("./P5Wrapper"), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading Macrodata Refinement...</div>,
})

export interface SeveranceUIProps {
  width?: number | string
  height?: number | string
  onComplete?: (time: number) => void
  className?: string
}

export const SeveranceUI: React.FC<SeveranceUIProps> = ({
  width = "100%",
  height = "100vh",
  onComplete,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`} style={{ width, height }}>
      {isClient && <P5Wrapper onComplete={onComplete} />}
    </div>
  )
}

export default SeveranceUI


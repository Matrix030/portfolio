'use client'
import { motion } from 'framer-motion'

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace'

interface DragGhostProps {
  x: number
  y: number
  title: string
}

export default function DragGhost({ x, y, title }: DragGhostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.1 },
        scale: { duration: 0.1 },
      }}
      style={{
        position: 'fixed',
        left: x - 60,
        top: y - 14,
        width: 120,
        height: 28,
        background: '#FBBF24',
        border: '3px solid #1a1a2e',
        borderRadius: 4,
        padding: '0 0.75rem',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.7rem',
        color: '#1a1a2e',
        fontFamily: FONT,
        fontWeight: 700,
        pointerEvents: 'none',
        zIndex: 500,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        boxShadow: '3px 3px 0px #1a1a2e',
      }}
    >
      {title}
    </motion.div>
  )
}

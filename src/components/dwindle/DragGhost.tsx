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
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: [
          '0 4px 24px rgba(140,170,238,0.2)',
          '0 4px 32px rgba(140,170,238,0.4)',
          '0 4px 24px rgba(140,170,238,0.2)',
        ],
      }}
      transition={{
        opacity: { duration: 0.1 },
        scale: { duration: 0.1 },
        boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        position: 'fixed',
        left: x - 60,
        top: y - 14,
        width: 120,
        height: 28,
        background: '#292c3c',
        border: '1px solid #8caaee',
        borderRadius: 5,
        padding: '0 0.75rem',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.7rem',
        color: '#8caaee',
        fontFamily: FONT,
        pointerEvents: 'none',
        zIndex: 500,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      {title}
    </motion.div>
  )
}

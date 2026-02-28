'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import About from '@/components/windows/About'
import Projects from '@/components/windows/Projects'
import Experience from '@/components/windows/Experience'
import Skills from '@/components/windows/Skills'
import Education from '@/components/windows/Education'
import GitHubActivity from '@/components/workspace2/GitHubActivity'
import type { Bounds, Edge } from '@/lib/dwindle'

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace'

const windowContent: Record<string, React.ReactNode> = {
  about: <About />,
  projects: <Projects />,
  experience: <Experience />,
  skills: <Skills />,
  education: <Education />,
  github: <GitHubActivity />,
}

const windowTitles: Record<string, string> = {
  about: 'about.md',
  projects: 'projects.sh',
  experience: 'experience.log',
  skills: 'skills.conf',
  education: 'education.txt',
  github: 'github.live',
}

const EASE_OUT_QUINT = [0.23, 1, 0.32, 1] as [number, number, number, number]

const windowVariants = {
  initial: { opacity: 0, scale: 0.87 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_OUT_QUINT },
  },
  exit: {
    opacity: 0,
    scale: 0.87,
    transition: { duration: 0.1, ease: 'linear' as const },
  },
}

// Edge overlay geometry and labels
const edgeStyles: Record<Edge, React.CSSProperties> = {
  left:   { left: 0,   top: 0,    width: '35%',  height: '100%' },
  right:  { right: 0,  top: 0,    width: '35%',  height: '100%' },
  top:    { left: 0,   top: 0,    width: '100%', height: '35%'  },
  bottom: { left: 0,   bottom: 0, width: '100%', height: '35%'  },
}

const edgeBorder: Record<Edge, React.CSSProperties> = {
  left:   { borderLeft:   '3px solid #8caaee' },
  right:  { borderRight:  '3px solid #8caaee' },
  top:    { borderTop:    '3px solid #8caaee' },
  bottom: { borderBottom: '3px solid #8caaee' },
}

const edgeLabels: Record<Edge, string> = {
  left:   '← left',
  right:  '→ right',
  top:    '↑ top',
  bottom: '↓ bottom',
}

interface DwindleWindowProps {
  id: string
  bounds: Bounds
  isActive: boolean
  isFullscreen: boolean
  isDragging: boolean
  isDragTarget: boolean
  targetEdge: Edge | null
  isAnyDragging: boolean
  onFocus: () => void
  onClose: () => void
  onDragStart: (id: string, x: number, y: number) => void
  onDragEnter: (id: string, x: number, y: number) => void
  onDragLeave: () => void
}

export default function DwindleWindow({
  id,
  bounds,
  isActive,
  isFullscreen,
  isDragging,
  isDragTarget,
  targetEdge,
  isAnyDragging,
  onFocus,
  onClose,
  onDragStart,
  onDragEnter,
  onDragLeave,
}: DwindleWindowProps) {
  const [dotsHovered, setDotsHovered] = useState(false)

  const zIndex = isFullscreen ? 100 : isActive ? 10 : 1

  return (
    <motion.div
      layout
      layoutDependency={JSON.stringify(bounds)}
      variants={windowVariants}
      initial="initial"
      animate={
        isDragging
          ? { opacity: 0.4, scale: 0.97, transition: { duration: 0.15 } }
          : 'animate'
      }
      exit="exit"
      transition={{ layout: { duration: 0.2, ease: EASE_OUT_QUINT } }}
      onPointerEnter={(e) => {
        if (isAnyDragging) {
          if (!isDragging) onDragEnter(id, e.clientX, e.clientY)
        } else {
          onFocus()
        }
      }}
      onPointerLeave={() => {
        if (isAnyDragging && !isDragging) onDragLeave()
      }}
      style={{
        position: 'absolute',
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height,
        borderRadius: 10,
        zIndex,
        boxShadow: '0 4px 24px rgba(35,38,52,0.8)',
        boxSizing: 'border-box',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
    >
      {/* Base border — inactive */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          background: 'rgba(81,87,109,0.6)',
        }}
      />

      {/* Active gradient border — fades in on focus */}
      <motion.div
        animate={{ opacity: isActive && !isDragTarget ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT_QUINT }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #8caaee 0%, #ca9ee6 50%, #8caaee 100%)',
          backgroundSize: '200% 200%',
          pointerEvents: 'none',
        }}
      />

      {/* Active outer glow */}
      <motion.div
        animate={{ opacity: isActive && !isDragTarget ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 11,
          boxShadow: '0 0 20px rgba(140,170,238,0.2), 0 8px 32px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}
      />

      {/* Content — 1px inset exposes border layers */}
      <div
        style={{
          position: 'absolute',
          inset: 1,
          borderRadius: 9,
          overflow: 'hidden',
          background: 'rgba(35,38,52,0.97)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div
          onPointerDown={(e) => {
            if (e.button !== 0) return
            e.preventDefault()
            onFocus()
            onDragStart(id, e.clientX, e.clientY)
          }}
          style={{
            height: '1.85rem',
            flexShrink: 0,
            background: 'rgba(41,44,60,0.95)',
            borderBottom: '1px solid rgba(81,87,109,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.75rem',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          {/* Traffic lights LEFT */}
          <div
            style={{
              display: 'flex',
              gap: '0.3rem',
              alignItems: 'center',
              transition: 'opacity 0.12s',
            }}
            onMouseEnter={() => setDotsHovered(true)}
            onMouseLeave={() => setDotsHovered(false)}
          >
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onClose() }}
              title="Close"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: dotsHovered ? '#e78284' : 'rgba(231,130,132,0.6)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.15s',
              }}
            />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotsHovered ? '#e5c890' : 'rgba(229,200,144,0.4)', transition: 'background 0.15s' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotsHovered ? '#a6d189' : 'rgba(166,209,137,0.4)', transition: 'background 0.15s' }} />
          </div>

          {/* Title CENTER */}
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: isActive ? '#c6d0f5' : '#626880',
              fontSize: '0.65rem',
              fontFamily: FONT,
              userSelect: 'none',
              letterSpacing: '0.04em',
              transition: 'color 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {windowTitles[id] ?? id}
          </span>
        </div>

        {/* Content area */}
        <div
          style={{
            height: 'calc(100% - 1.85rem)',
            overflowY: 'auto',
            padding: '0.75rem',
            scrollbarWidth: 'none',
          }}
        >
          {windowContent[id] ?? null}
        </div>
      </div>

      {/* Directional edge overlay — shown when this window is the drop target */}
      {isDragTarget && targetEdge && (
        <div
          style={{
            position: 'absolute',
            ...edgeStyles[targetEdge],
            ...edgeBorder[targetEdge],
            background: 'rgba(140,170,238,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            pointerEvents: 'none',
            transition: 'all 0.1s ease',
          }}
        >
          <span
            style={{
              color: '#8caaee',
              fontSize: '0.62rem',
              fontFamily: FONT,
              userSelect: 'none',
            }}
          >
            {edgeLabels[targetEdge]}
          </span>
        </div>
      )}
    </motion.div>
  )
}

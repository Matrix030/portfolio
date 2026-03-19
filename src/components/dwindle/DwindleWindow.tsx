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

const edgeStyles: Record<Edge, React.CSSProperties> = {
  left:   { left: 0,   top: 0,    width: '35%',  height: '100%' },
  right:  { right: 0,  top: 0,    width: '35%',  height: '100%' },
  top:    { left: 0,   top: 0,    width: '100%', height: '35%'  },
  bottom: { left: 0,   bottom: 0, width: '100%', height: '35%'  },
}

const edgeBorder: Record<Edge, React.CSSProperties> = {
  left:   { borderLeft:   '4px solid #3B82F6' },
  right:  { borderRight:  '4px solid #3B82F6' },
  top:    { borderTop:    '4px solid #3B82F6' },
  bottom: { borderBottom: '4px solid #3B82F6' },
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

  // Pick a unique accent color per window for active state
  const accentColors: Record<string, string> = {
    about: '#3B82F6',
    projects: '#A855F7',
    experience: '#22C55E',
    skills: '#F97316',
    education: '#EC4899',
    github: '#06B6D4',
  }
  const accent = accentColors[id] ?? '#3B82F6'

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
        borderRadius: 8,
        zIndex,
        border: isActive ? `3px solid ${accent}` : '3px solid #1a1a2e',
        boxShadow: isActive
          ? `5px 5px 0px ${accent}`
          : '4px 4px 0px #1a1a2e',
        boxSizing: 'border-box',
        pointerEvents: isDragging ? 'none' : 'auto',
        background: '#FFFFFF',
        overflow: 'hidden',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Content area */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
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
            height: '1.75rem',
            flexShrink: 0,
            background: isActive ? accent : '#F5F0E8',
            borderBottom: '2px solid #1a1a2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.75rem',
            cursor: 'grab',
            userSelect: 'none',
            transition: 'background 0.15s',
          }}
        >
          <span
            style={{
              color: isActive ? '#FFFFFF' : '#1a1a2e',
              fontSize: '0.72rem',
              fontFamily: FONT,
              userSelect: 'none',
              fontWeight: 700,
            }}
          >
            {windowTitles[id] ?? id}
          </span>

          {/* Traffic lights */}
          <div
            style={{
              display: 'flex',
              gap: '0.35rem',
              alignItems: 'center',
              transform: dotsHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.12s',
            }}
            onMouseEnter={() => setDotsHovered(true)}
            onMouseLeave={() => setDotsHovered(false)}
          >
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onClose() }}
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: '#EF4444',
                border: '2px solid #1a1a2e',
                cursor: 'pointer',
                padding: 0,
              }}
            />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#FBBF24', border: '2px solid #1a1a2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#22C55E', border: '2px solid #1a1a2e' }} />
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            height: 'calc(100% - 1.75rem)',
            overflowY: 'auto',
            padding: '0.75rem',
            scrollbarWidth: 'none',
          }}
        >
          {windowContent[id] ?? null}
        </div>
      </div>

      {/* Directional edge overlay */}
      {isDragTarget && targetEdge && (
        <div
          style={{
            position: 'absolute',
            ...edgeStyles[targetEdge],
            ...edgeBorder[targetEdge],
            background: 'rgba(59,130,246,0.15)',
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
              color: '#3B82F6',
              fontSize: '0.62rem',
              fontFamily: FONT,
              userSelect: 'none',
              fontWeight: 700,
            }}
          >
            {edgeLabels[targetEdge]}
          </span>
        </div>
      )}
    </motion.div>
  )
}

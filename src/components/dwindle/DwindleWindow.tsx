'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import About from '@/components/windows/About'
import Projects from '@/components/windows/Projects'
import Experience from '@/components/windows/Experience'
import Skills from '@/components/windows/Skills'
import Education from '@/components/windows/Education'
import GitHubActivity from '@/components/workspace2/GitHubActivity'
import type { Bounds } from '@/lib/dwindle'

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

interface DwindleWindowProps {
  id: string
  bounds: Bounds
  isActive: boolean
  isFullscreen: boolean
  isDragging: boolean
  isDragTarget: boolean
  onFocus: () => void
  onClose: () => void
  onDragStart: (id: string, x: number, y: number) => void
  onDragEnter: (id: string) => void
}

export default function DwindleWindow({
  id,
  bounds,
  isActive,
  isFullscreen,
  isDragging,
  isDragTarget,
  onFocus,
  onClose,
  onDragStart,
  onDragEnter,
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
      onPointerEnter={() => { onFocus(); onDragEnter(id) }}
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
      {/* Base border — always visible at inactive color */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          background: isDragTarget ? '#8caaee' : '#51576d',
          transition: 'background 0.1s',
        }}
      />

      {/* Active gradient border — fades in on focus */}
      <motion.div
        animate={{ opacity: isActive && !isDragTarget ? 1 : 0 }}
        transition={{ duration: 0.15, ease: EASE_OUT_QUINT }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          background: 'linear-gradient(45deg, #8caaee, #ca9ee6)',
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
          background: isDragTarget ? 'rgba(140,170,238,0.06)' : 'rgba(48,52,70,0.85)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'background 0.1s',
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
            background: 'rgba(41,44,60,0.8)',
            borderBottom: '1px solid rgba(81,87,109,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.75rem',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              color: '#c6d0f5',
              fontSize: '0.72rem',
              fontFamily: FONT,
              userSelect: 'none',
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
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#e78284',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e5c890' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#a6d189' }} />
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

      {/* Drag target overlay */}
      {isDragTarget && (
        <div
          style={{
            position: 'absolute',
            inset: 1,
            borderRadius: 9,
            background: 'rgba(140,170,238,0.05)',
            border: '2px dashed rgba(140,170,238,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              color: '#8caaee',
              fontSize: '0.7rem',
              fontFamily: FONT,
              fontWeight: 600,
              userSelect: 'none',
            }}
          >
            swap here
          </span>
        </div>
      )}
    </motion.div>
  )
}

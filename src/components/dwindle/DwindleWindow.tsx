'use client'
import { useState } from 'react'
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

interface DwindleWindowProps {
  id: string
  bounds: Bounds
  isActive: boolean
  onFocus: () => void
  onClose: () => void
}

export default function DwindleWindow({
  id,
  bounds,
  isActive,
  onFocus,
  onClose,
}: DwindleWindowProps) {
  const [dotsHovered, setDotsHovered] = useState(false)

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: 'absolute',
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height,
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: isActive ? 10 : 1,
        padding: 1,
        background: isActive
          ? 'linear-gradient(45deg, #8caaee, #ca9ee6)'
          : '#51576d',
        boxShadow: '0 4px 24px rgba(35,38,52,0.8)',
        boxSizing: 'border-box',
      }}
    >
      {/* Inner surface */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 9,
          overflow: 'hidden',
          background: 'rgba(48,52,70,0.85)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: '1.75rem',
            flexShrink: 0,
            background: 'rgba(41,44,60,0.8)',
            borderBottom: '1px solid rgba(81,87,109,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.75rem',
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
            {/* Red — closes window */}
            <button
              onMouseDown={(e) => e.stopPropagation()}
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
            {/* Yellow — decorative */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#e5c890',
              }}
            />
            {/* Green — decorative */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#a6d189',
              }}
            />
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
    </div>
  )
}

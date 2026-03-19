'use client'
import { useState } from 'react'

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace'

interface WindowItem {
  id: string
  label: string
  icon: string
}

interface LauncherBarProps {
  availableWindows: WindowItem[]
  openWindowIds: string[]
  onOpen: (id: string) => void
  focusedId: string | null
}


export default function LauncherBar({
  availableWindows,
  openWindowIds,
  onOpen,
  focusedId,
}: LauncherBarProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 48,
        background: '#FFFFFF',
        borderTop: '3px solid #1a1a2e',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '0.5rem',
        zIndex: 100,
      }}
    >
      <span
        style={{
          color: '#6B7280',
          fontSize: '0.65rem',
          fontFamily: FONT,
          marginRight: '0.5rem',
          userSelect: 'none',
          fontWeight: 700,
        }}
      >
        windows
      </span>

      {availableWindows.map(({ id, label, icon }) => {
        const isOpen = openWindowIds.includes(id)
        const isFocused = focusedId === id
        const isHovered = hovered === id

        let bg = '#FFFFFF'
        let color = '#374151'
        const borderColor = '#1a1a2e'
        let shadow = 'none'

        if (isFocused) {
          bg = '#FBBF24'
          color = '#1a1a2e'
          shadow = '2px 2px 0px #1a1a2e'
        } else if (isOpen) {
          bg = '#F5F0E8'
          color = '#1a1a2e'
        }

        if (isHovered && !isFocused) {
          bg = '#E0F2FE'
          color = '#3B82F6'
          shadow = '2px 2px 0px #1a1a2e'
        }

        return (
          <button
            key={id}
            onClick={() => onOpen(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: 4,
              fontSize: '0.7rem',
              fontFamily: FONT,
              border: `2px solid ${borderColor}`,
              background: bg,
              color,
              cursor: 'pointer',
              transition: 'all 0.1s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 700,
              boxShadow: shadow,
            }}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        )
      })}

      <span
        style={{
          color: '#6B7280',
          fontSize: '0.6rem',
          fontFamily: FONT,
          marginLeft: 'auto',
          userSelect: 'none',
          fontWeight: 600,
          background: '#F5F0E8',
          border: '2px solid #1a1a2e',
          borderRadius: 4,
          padding: '0.2rem 0.5rem',
        }}
      >
        Q close · Tab focus · F fullscreen
      </span>
    </div>
  )
}

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

interface ButtonState {
  hovered: boolean
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
        height: 44,
        background: '#292c3c',
        borderTop: '1px solid #414559',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '0.5rem',
        zIndex: 100,
      }}
    >
      <span
        style={{
          color: '#737994',
          fontSize: '0.65rem',
          fontFamily: FONT,
          marginRight: '0.5rem',
          userSelect: 'none',
        }}
      >
        windows
      </span>

      {availableWindows.map(({ id, label, icon }) => {
        const isOpen = openWindowIds.includes(id)
        const isFocused = focusedId === id
        const isHovered = hovered === id

        // Determine colors based on state
        let bg = '#414559'
        let color = '#a5adce'
        let borderColor = '#51576d'

        if (isFocused) {
          bg = 'rgba(140,170,238,0.15)'
          color = '#8caaee'
          borderColor = '#8caaee'
        } else if (isOpen) {
          color = '#c6d0f5'
        }

        // Override with hover (if not focused)
        if (isHovered && !isFocused) {
          color = '#8caaee'
          borderColor = '#8caaee'
        }

        return (
          <button
            key={id}
            onClick={() => onOpen(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: 5,
              fontSize: '0.7rem',
              fontFamily: FONT,
              border: `1px solid ${borderColor}`,
              background: bg,
              color,
              cursor: 'pointer',
              transition: 'all 0.15s cubic-bezier(0.23,1,0.32,1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        )
      })}

      <span
        style={{
          color: '#737994',
          fontSize: '0.6rem',
          fontFamily: FONT,
          marginLeft: 'auto',
          userSelect: 'none',
        }}
      >
        Super+Space to launch • Super+Q to close
      </span>
    </div>
  )
}

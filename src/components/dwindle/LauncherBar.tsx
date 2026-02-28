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
        bottom: 4,
        left: 4,
        right: 4,
        height: 38,
        background: 'rgba(41,44,60,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 7,
        border: '1px solid rgba(81,87,109,0.5)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 0.75rem',
        gap: '0.3rem',
        zIndex: 100,
        boxShadow: '0 -1px 0 rgba(198,208,245,0.03), 0 4px 16px rgba(0,0,0,0.4)',
      }}
    >
      <span
        style={{
          color: '#414559',
          fontSize: '0.55rem',
          fontFamily: FONT,
          marginRight: '0.4rem',
          userSelect: 'none',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        ws
      </span>

      {availableWindows.map(({ id, label, icon }) => {
        const isOpen = openWindowIds.includes(id)
        const isFocused = focusedId === id
        const isHovered = hovered === id

        let bg = 'transparent'
        let color = '#51576d'
        let borderColor = 'transparent'

        if (isFocused) {
          bg = 'rgba(140,170,238,0.12)'
          color = '#8caaee'
          borderColor = 'rgba(140,170,238,0.35)'
        } else if (isOpen) {
          color = '#a5adce'
          borderColor = 'rgba(81,87,109,0.4)'
          bg = 'rgba(65,69,89,0.3)'
        }

        if (isHovered && !isFocused) {
          color = '#c6d0f5'
          borderColor = 'rgba(81,87,109,0.5)'
          bg = 'rgba(65,69,89,0.4)'
        }

        return (
          <button
            key={id}
            onClick={() => onOpen(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: '0.2rem 0.65rem',
              borderRadius: 5,
              fontSize: '0.62rem',
              fontFamily: FONT,
              border: `1px solid ${borderColor}`,
              background: bg,
              color,
              cursor: 'pointer',
              transition: 'all 0.15s cubic-bezier(0.23,1,0.32,1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ fontSize: '0.75rem', lineHeight: 1 }}>{icon}</span>
            <span>{label}</span>
            {isOpen && !isFocused && (
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#626880',
                  flexShrink: 0,
                  marginLeft: 1,
                }}
              />
            )}
          </button>
        )
      })}

      <span
        style={{
          color: '#3b3f52',
          fontSize: '0.56rem',
          fontFamily: FONT,
          marginLeft: 'auto',
          userSelect: 'none',
          letterSpacing: '0.04em',
        }}
      >
        Q close • Tab focus • F fullscreen
      </span>
    </div>
  )
}

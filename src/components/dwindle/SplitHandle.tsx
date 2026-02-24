'use client'
import { useState } from 'react'
import type { SplitInfo, Bounds } from '@/lib/dwindle'

const GAP = 4
const HIT_SIZE = 12 // wider hit area than the visual 4px gap

interface SplitHandleProps {
  split: SplitInfo
  containerBounds: Bounds
  onRatioChange: (newRatio: number) => void
}

export default function SplitHandle({ split, onRatioChange }: SplitHandleProps) {
  const [hovered, setHovered] = useState(false)
  const { node, bounds } = split
  const isHorizontal = node.direction === 'horizontal'

  // Position the handle centered over the gap between the two children
  const firstWidth = Math.floor((bounds.width - GAP) * node.ratio)
  const firstHeight = Math.floor((bounds.height - GAP) * node.ratio)
  const offset = GAP / 2 - HIT_SIZE / 2 // centers hit area on the gap

  const style: React.CSSProperties = isHorizontal
    ? {
        position: 'absolute',
        left: bounds.x + firstWidth + offset,
        top: bounds.y,
        width: HIT_SIZE,
        height: bounds.height,
        cursor: 'col-resize',
        zIndex: 50,
        background: hovered ? 'rgba(139,165,238,0.3)' : 'transparent',
        transition: 'background 0.15s',
      }
    : {
        position: 'absolute',
        left: bounds.x,
        top: bounds.y + firstHeight + offset,
        width: bounds.width,
        height: HIT_SIZE,
        cursor: 'row-resize',
        zIndex: 50,
        background: hovered ? 'rgba(139,165,238,0.3)' : 'transparent',
        transition: 'background 0.15s',
      }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    const startPos = isHorizontal ? e.clientX : e.clientY
    const startRatio = node.ratio
    const totalSize = isHorizontal ? bounds.width : bounds.height

    function onMove(ev: PointerEvent) {
      const currentPos = isHorizontal ? ev.clientX : ev.clientY
      const delta = currentPos - startPos
      onRatioChange(startRatio + delta / totalSize)
    }

    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  return (
    <div
      style={style}
      onPointerDown={handlePointerDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    />
  )
}

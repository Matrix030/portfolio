'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { computeLayout, openWindow, closeWindow, getWindowIds, getSplits, updateSplitRatio } from '@/lib/dwindle'
import type { TreeNode, Bounds } from '@/lib/dwindle'
import DwindleWindow from './DwindleWindow'

const GAP = 4
const PADDING = 5

export default function DwindleDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerBounds, setContainerBounds] = useState<Bounds>({ x: 0, y: 0, width: 0, height: 0 })
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(null)

  // Measure container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect()
      setContainerBounds({
        x: PADDING,
        y: PADDING,
        width: rect.width - PADDING * 2,
        height: rect.height - PADDING * 2
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Open about window on mount once we have bounds
  useEffect(() => {
    if (containerBounds.width > 0 && !tree) {
      const initialTree = openWindow(null, null, 'about')
      setTree(initialTree)
      setFocusedId('about')
    }
  }, [containerBounds.width])

  // Compute layout from tree
  const layout = tree ? computeLayout(tree, containerBounds, GAP) : {}
  const splits = tree ? getSplits(tree, containerBounds, GAP) : []
  const windowIds = getWindowIds(tree)

  const handleClose = useCallback((id: string) => {
    setTree(prev => closeWindow(prev, id))
    setFocusedId(prev => prev === id ? null : prev)
  }, [])

  const handleFocus = useCallback((id: string) => {
    setFocusedId(id)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#232634',
        overflow: 'hidden',
      }}
    >
      {windowIds.map(id => {
        const bounds = layout[id]
        if (!bounds) return null
        return (
          <DwindleWindow
            key={id}
            id={id}
            bounds={bounds}
            isActive={focusedId === id}
            onFocus={() => handleFocus(id)}
            onClose={() => handleClose(id)}
          />
        )
      })}
    </div>
  )
}

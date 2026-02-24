'use client'
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { computeLayout, openWindow, closeWindow, getWindowIds, getSplits, updateSplitRatio } from '@/lib/dwindle'
import type { TreeNode, Bounds } from '@/lib/dwindle'
import DwindleWindow from './DwindleWindow'
import SplitHandle from './SplitHandle'
import LauncherBar from './LauncherBar'

const GAP = 4
const PADDING = 5
const LAUNCHER_HEIGHT = 44

const AVAILABLE_WINDOWS = [
  { id: 'about',      label: 'about.md',       icon: '󰈚' },
  { id: 'projects',   label: 'projects.sh',    icon: '󰲋' },
  { id: 'experience', label: 'experience.log', icon: '󰃭' },
  { id: 'skills',     label: 'skills.conf',    icon: '󰑴' },
  { id: 'education',  label: 'education.txt',  icon: '󰑴' },
  { id: 'github',     label: 'github.live',    icon: '󰊤' },
]

export default function DwindleDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerBounds, setContainerBounds] = useState<Bounds>({ x: 0, y: 0, width: 0, height: 0 })
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const focusedIdRef = useRef<string | null>(null)
  useLayoutEffect(() => { focusedIdRef.current = focusedId }, [focusedId])

  // Measure container — exclude launcher bar height from tiling area
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect()
      setContainerBounds({
        x: PADDING,
        y: PADDING,
        width: rect.width - PADDING * 2,
        height: rect.height - PADDING * 2 - LAUNCHER_HEIGHT,
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

  const handleOpen = useCallback((id: string) => {
    setTree(prev => {
      const ids = getWindowIds(prev)
      if (ids.includes(id)) return prev
      return openWindow(prev, focusedIdRef.current, id)
    })
    setFocusedId(id)
  }, [])

  const handleUpdateRatio = useCallback((path: string, newRatio: number) => {
    setTree(prev => prev ? updateSplitRatio(prev, path, newRatio) : prev)
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
      {/* Tiled windows */}
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

      {/* Split resize handles */}
      {splits.map(split => (
        <SplitHandle
          key={split.path}
          split={split}
          containerBounds={containerBounds}
          onRatioChange={(newRatio) => handleUpdateRatio(split.path, newRatio)}
        />
      ))}

      {/* Window launcher bar */}
      <LauncherBar
        availableWindows={AVAILABLE_WINDOWS}
        openWindowIds={windowIds}
        onOpen={handleOpen}
        focusedId={focusedId}
      />
    </div>
  )
}

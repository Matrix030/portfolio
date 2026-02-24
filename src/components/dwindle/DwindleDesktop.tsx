'use client'
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  computeLayout, openWindow, closeWindow, getWindowIds,
  getSplits, updateSplitRatio, swapWindows,
} from '@/lib/dwindle'
import type { TreeNode, Bounds } from '@/lib/dwindle'
import DwindleWindow from './DwindleWindow'
import SplitHandle from './SplitHandle'
import LauncherBar from './LauncherBar'
import DragGhost from './DragGhost'

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

export const windowTitles: Record<string, string> = {
  about: 'about.md',
  projects: 'projects.sh',
  experience: 'experience.log',
  skills: 'skills.conf',
  education: 'education.txt',
  github: 'github.live',
}

type DragState = {
  sourceId: string
  ghostX: number
  ghostY: number
  targetId: string | null
}

export default function DwindleDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerBounds, setContainerBounds] = useState<Bounds>({ x: 0, y: 0, width: 0, height: 0 })
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [fullscreenId, setFullscreenId] = useState<string | null>(null)
  const [dragState, setDragState] = useState<DragState | null>(null)

  // Refs for stable closures in effects
  const focusedIdRef = useRef<string | null>(null)
  useLayoutEffect(() => { focusedIdRef.current = focusedId }, [focusedId])

  const windowIdsRef = useRef<string[]>([])
  const layoutRef = useRef<Record<string, Bounds>>({})
  const dragStateRef = useRef<DragState | null>(null)
  dragStateRef.current = dragState

  // Measure container — exclude launcher bar from tiling area
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

  // Open about window once bounds are ready
  useEffect(() => {
    if (containerBounds.width > 0 && !tree) {
      setTree(openWindow(null, null, 'about'))
      setFocusedId('about')
    }
  }, [containerBounds.width])

  // Compute layout from tree
  const layout = tree ? computeLayout(tree, containerBounds, GAP) : {}
  const splits = tree ? getSplits(tree, containerBounds, GAP) : []
  const windowIds = getWindowIds(tree)

  // Keep refs in sync every render
  windowIdsRef.current = windowIds
  layoutRef.current = layout

  // handleFocus: no-op during drag to prevent focus changes while hovering drag targets
  const handleFocus = useCallback((id: string) => {
    if (dragStateRef.current) return
    setFocusedId(id)
  }, [])

  const handleClose = useCallback((id: string) => {
    setTree(prev => closeWindow(prev, id))
    setFocusedId(prev => prev === id ? null : prev)
    setFullscreenId(prev => prev === id ? null : prev)
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

  const handleDragStart = useCallback((id: string, x: number, y: number) => {
    setDragState({ sourceId: id, ghostX: x, ghostY: y, targetId: null })
    setFocusedId(id)
  }, [])

  const handleDragEnter = useCallback((id: string) => {
    setDragState(prev => {
      if (!prev || id === prev.sourceId) return prev
      return { ...prev, targetId: id }
    })
  }, [])

  // Drag pointer tracking — runs only when drag starts/ends (not on every ghost update)
  const isDraggingAny = dragState !== null
  useEffect(() => {
    if (!isDraggingAny) return

    const onMove = (e: PointerEvent) => {
      const containerEl = containerRef.current
      if (!containerEl) return
      const rect = containerEl.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      const sourceId = dragStateRef.current?.sourceId

      // Geometric hit test against window bounds
      let newTarget: string | null = null
      for (const id of windowIdsRef.current) {
        if (id === sourceId) continue
        const b = layoutRef.current[id]
        if (b && relX >= b.x && relX <= b.x + b.width && relY >= b.y && relY <= b.y + b.height) {
          newTarget = id
          break
        }
      }

      setDragState(prev =>
        prev ? { ...prev, ghostX: e.clientX, ghostY: e.clientY, targetId: newTarget } : null
      )
    }

    const onUp = () => {
      const ds = dragStateRef.current
      setDragState(null)
      if (ds?.targetId && ds.targetId !== ds.sourceId) {
        setTree(prev => prev ? swapWindows(prev, ds.sourceId, ds.targetId!) : prev)
        setFocusedId(ds.targetId)
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDragState(null)
    }

    document.body.style.cursor = 'grabbing'
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('keydown', onKey)
    }
  }, [isDraggingAny])

  // Keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      switch (e.key.toLowerCase()) {
        case 'q': {
          const id = focusedIdRef.current
          if (id) {
            setTree(prev => closeWindow(prev, id))
            setFocusedId(prev => prev === id ? null : prev)
            setFullscreenId(prev => prev === id ? null : prev)
          }
          break
        }
        case 'tab': {
          e.preventDefault()
          const ids = windowIdsRef.current
          if (ids.length > 1) {
            const currentIndex = ids.indexOf(focusedIdRef.current ?? '')
            const nextIndex = e.shiftKey
              ? (currentIndex - 1 + ids.length) % ids.length
              : (currentIndex + 1) % ids.length
            setFocusedId(ids[nextIndex])
          }
          break
        }
        case 'f': {
          const id = focusedIdRef.current
          if (id) setFullscreenId(prev => prev === id ? null : id)
          break
        }
        case 'escape': {
          setFullscreenId(null)
          break
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const getEffectiveBounds = (id: string): Bounds => {
    if (fullscreenId === id) {
      return {
        x: 0,
        y: 0,
        width: containerBounds.width + PADDING * 2,
        height: containerBounds.height + PADDING * 2 + LAUNCHER_HEIGHT,
      }
    }
    return layout[id]
  }

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
      <AnimatePresence>
        {windowIds.map(id => {
          const bounds = getEffectiveBounds(id)
          if (!bounds) return null
          return (
            <DwindleWindow
              key={id}
              id={id}
              bounds={bounds}
              isActive={focusedId === id}
              isFullscreen={fullscreenId === id}
              isDragging={dragState?.sourceId === id}
              isDragTarget={dragState?.targetId === id && dragState.sourceId !== id}
              onFocus={() => handleFocus(id)}
              onClose={() => handleClose(id)}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
            />
          )
        })}
      </AnimatePresence>

      {/* Split handles — hidden during fullscreen or drag */}
      {!fullscreenId && !dragState && splits.map(split => (
        <SplitHandle
          key={split.path}
          split={split}
          containerBounds={containerBounds}
          onRatioChange={(newRatio) => handleUpdateRatio(split.path, newRatio)}
        />
      ))}

      <LauncherBar
        availableWindows={AVAILABLE_WINDOWS}
        openWindowIds={windowIds}
        onOpen={handleOpen}
        focusedId={focusedId}
      />

      {/* Drag ghost follows cursor */}
      {dragState && (
        <DragGhost
          x={dragState.ghostX}
          y={dragState.ghostY}
          title={windowTitles[dragState.sourceId] ?? dragState.sourceId}
        />
      )}
    </div>
  )
}

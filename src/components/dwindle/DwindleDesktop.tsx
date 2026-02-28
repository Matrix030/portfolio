'use client'
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  computeLayout, openWindow, closeWindow, getWindowIds,
  getSplits, updateSplitRatio, moveWindowToEdge,
} from '@/lib/dwindle'
import type { TreeNode, Bounds, Edge } from '@/lib/dwindle'
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
  targetEdge: Edge | null
}

function getEdgeFromPosition(bounds: Bounds, x: number, y: number): Edge {
  const distLeft   = x - bounds.x
  const distRight  = (bounds.x + bounds.width) - x
  const distTop    = y - bounds.y
  const distBottom = (bounds.y + bounds.height) - y
  const min = Math.min(distLeft, distRight, distTop, distBottom)
  if (min === distLeft)   return 'left'
  if (min === distRight)  return 'right'
  if (min === distTop)    return 'top'
  return 'bottom'
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

  // handleFocus: no-op during drag
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
    setDragState({ sourceId: id, ghostX: x, ghostY: y, targetId: null, targetEdge: null })
    setFocusedId(id)
  }, [])

  // Called from window's onPointerEnter during drag — converts client→desktop coords, computes edge
  const handleDragEnter = useCallback((id: string, clientX: number, clientY: number) => {
    const sourceId = dragStateRef.current?.sourceId
    if (!sourceId || id === sourceId) return
    const bounds = layoutRef.current[id]
    if (!bounds) return
    const containerEl = containerRef.current
    if (!containerEl) return
    const containerRect = containerEl.getBoundingClientRect()
    const relX = clientX - containerRect.left
    const relY = clientY - containerRect.top
    const edge = getEdgeFromPosition(bounds, relX, relY)
    setDragState(prev => prev ? { ...prev, targetId: id, targetEdge: edge } : null)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragState(prev => prev ? { ...prev, targetId: null, targetEdge: null } : null)
  }, [])

  // Drag pointer tracking — stable for entire drag session
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

      // Geometric hit test + edge computation in one pass
      let newTarget: string | null = null
      let newEdge: Edge | null = null

      for (const id of windowIdsRef.current) {
        if (id === sourceId) continue
        const b = layoutRef.current[id]
        if (b && relX >= b.x && relX <= b.x + b.width && relY >= b.y && relY <= b.y + b.height) {
          newTarget = id
          newEdge = getEdgeFromPosition(b, relX, relY)
          break
        }
      }

      setDragState(prev =>
        prev ? { ...prev, ghostX: e.clientX, ghostY: e.clientY, targetId: newTarget, targetEdge: newEdge } : null
      )
    }

    const onUp = () => {
      const ds = dragStateRef.current
      setDragState(null)
      if (ds?.targetId && ds.targetEdge && ds.targetId !== ds.sourceId) {
        setTree(prev =>
          prev ? moveWindowToEdge(prev, ds.sourceId, ds.targetId!, ds.targetEdge!) : prev
        )
        setFocusedId(ds.sourceId)
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
        background: '#1e2030',
        backgroundImage: 'radial-gradient(rgba(140,170,238,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflow: 'hidden',
      }}
    >
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
              isDragTarget={dragState?.targetId === id}
              targetEdge={dragState?.targetId === id ? dragState.targetEdge : null}
              isAnyDragging={isDraggingAny}
              onFocus={() => handleFocus(id)}
              onClose={() => handleClose(id)}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
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

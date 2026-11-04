import React, { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { WorkspaceFrame } from './WorkspaceFrame.tsx'

interface CurrentSession {
  getSnapshot(): { key?: string }
  subscribe(listener: () => void): () => void
}

interface PanelInfo {
  getSnapshot(): { activePanelId: string | null }
  subscribe(listener: () => void): () => void
}

interface ModernWorkspaceProps {
  current: CurrentSession
  panelInfo: PanelInfo
  enabled: boolean
  onDismiss: () => void
}

interface Bounds {
  left: number
  top: number
  width: number
  height: number
}

export function workspaceBounds(frame: Bounds, center: Bounds, chatWidth: number): Bounds | undefined {
  const available = Math.floor(center.width)
  if (available < 560 || center.height <= 0) return undefined
  const chat = Math.max(280, Math.min(chatWidth, available - 280))
  return {
    left: center.left - frame.left,
    top: center.top - frame.top,
    width: available - chat,
    height: center.height,
  }
}

/** 新版宿主的加法浮层；仅压缩会话列，不改变官方右侧栏或网格模板。 */
export function ModernWorkspace({ current, panelInfo, enabled, onDismiss }: ModernWorkspaceProps) {
  const sessionId = useSyncExternalStore(
    (listener) => current.subscribe(listener),
    () => current.getSnapshot().key,
  )
  const activePanelId = useSyncExternalStore(
    (listener) => panelInfo.subscribe(listener),
    () => panelInfo.getSnapshot().activePanelId,
  )
  const visible = enabled && activePanelId === null
  const dragCleanup = useRef<(() => void) | undefined>()
  const [bounds, setBounds] = useState<Bounds | undefined>()
  useLayoutEffect(() => () => { dragCleanup.current?.() }, [visible])
  const [chatWidth, setChatWidth] = useState(() => {
    const saved = Number(localStorage.getItem('pc.chatWidth') ?? '')
    return Number.isFinite(saved) && saved >= 280 ? saved : 360
  })

  useLayoutEffect(() => {
    if (!visible) return
    const rightbar = document.querySelector<HTMLElement>('[data-rightbar-col]')
    const frame = rightbar?.parentElement
    const centers = frame?.querySelectorAll<HTMLElement>(':scope > div[class*="centerCol"]')
    if (frame === undefined || frame === null || centers?.length !== 1) {
      onDismiss()
      return
    }
    const center = centers[0]!
    const oldPadding = center.style.getPropertyValue('padding-left')
    const oldPaddingPriority = center.style.getPropertyPriority('padding-left')
    const oldBoxSizing = center.style.getPropertyValue('box-sizing')
    const oldBoxSizingPriority = center.style.getPropertyPriority('box-sizing')
    let appliedPadding = ''
    let active = true

    const update = (): void => {
      if (!active) return
      const next = workspaceBounds(frame.getBoundingClientRect(), center.getBoundingClientRect(), chatWidth)
      if (next === undefined) {
        onDismiss()
        return
      }
      const padding = `${next.width}px`
      if (padding !== appliedPadding) {
        center.style.setProperty('padding-left', padding, 'important')
        appliedPadding = padding
      }
      center.style.setProperty('box-sizing', 'border-box', 'important')
      setBounds((previous) => previous?.left === next.left && previous.top === next.top && previous.width === next.width && previous.height === next.height ? previous : next)
    }
    const resize = new ResizeObserver(update)
    resize.observe(frame)
    resize.observe(center)
    const mutations = new MutationObserver(() => {
      if (!frame.hasAttribute('data-rightbar-collapsed')) onDismiss()
      else update()
    })
    mutations.observe(frame, { attributes: true, attributeFilter: ['data-rightbar-collapsed'] })
    window.addEventListener('resize', update)
    update()
    return () => {
      active = false
      resize.disconnect()
      mutations.disconnect()
      window.removeEventListener('resize', update)
      if (center.style.getPropertyValue('padding-left') === appliedPadding) {
        if (oldPadding === '') center.style.removeProperty('padding-left')
        else center.style.setProperty('padding-left', oldPadding, oldPaddingPriority)
      }
      if (center.style.getPropertyValue('box-sizing') === 'border-box') {
        if (oldBoxSizing === '') center.style.removeProperty('box-sizing')
        else center.style.setProperty('box-sizing', oldBoxSizing, oldBoxSizingPriority)
      }
      setBounds(undefined)
    }
  }, [visible, chatWidth, onDismiss])

  if (!visible || bounds === undefined) return null

  const onDividerDown = (event: React.PointerEvent): void => {
    event.preventDefault()
    const onMove = (move: PointerEvent): void => {
      const frame = document.querySelector<HTMLElement>('[data-rightbar-col]')?.parentElement
      const center = frame?.querySelector<HTMLElement>(':scope > div[class*="centerCol"]')
      if (center === undefined || center === null) return
      const width = Math.max(280, Math.min(900, Math.round(center.getBoundingClientRect().right - move.clientX)))
      setChatWidth(width)
      localStorage.setItem('pc.chatWidth', String(width))
    }
    const onUp = (): void => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      dragCleanup.current = undefined
    }
    dragCleanup.current?.()
    dragCleanup.current = onUp
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  return (
    <div data-testid="project-control-modern-workspace" style={{ position: 'absolute', ...bounds, pointerEvents: 'auto' }}>
      <WorkspaceFrame key={sessionId ?? 'landing'} {...(sessionId === undefined ? {} : { sessionId })} layoutMode="overlay" />
      <div data-testid="project-control-modern-divider" onPointerDown={onDividerDown} style={{ position: 'absolute', top: 0, bottom: 0, right: -4, width: 8, cursor: 'col-resize', zIndex: 20 }} />
    </div>
  )
}

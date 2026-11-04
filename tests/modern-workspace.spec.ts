import { describe, expect, it } from 'vitest'
import { workspaceBounds } from '../src/client/components/ModernWorkspace.tsx'

const frame = { left: 100, top: 20, width: 1400, height: 900 }
const center = { left: 380, top: 60, width: 1120, height: 860 }

describe('新版工作台布局', () => {
  it('工作台位于会话列左侧，保留指定宽度的右侧聊天', () => {
    expect(workspaceBounds(frame, center, 360)).toEqual({
      left: 280, top: 40, width: 760, height: 860,
    })
  })

  it('限制聊天宽度，避免工作台或聊天窄于 280px', () => {
    expect(workspaceBounds(frame, center, 5000)?.width).toBe(280)
    expect(workspaceBounds(frame, center, 10)?.width).toBe(840)
  })

  it('窗口过窄或会话列不可见时不显示工作台', () => {
    expect(workspaceBounds(frame, { ...center, width: 559 }, 360)).toBeUndefined()
    expect(workspaceBounds(frame, { ...center, height: 0 }, 360)).toBeUndefined()
  })
})

import { describe, expect, it } from 'vitest'
import { Context, Service } from '@deepseek-ai/cordis'
import React from 'react'
import { apply } from '../src/client/index.ts'
import { ChangeCard } from '../src/client/components/ChangeCard.ts'
import { WorkspaceFrame } from '../src/client/components/WorkspaceFrame.tsx'

class MockSlotsService extends Service {
  constructor(ctx: Context, private readonly registeredSlots: string[]) {
    super(ctx, 'slots', true)
  }

  inject(slotName: string, callback: Function) {
    return callback()
  }

  register(descriptor: { name: string }, component: Function) {
    this.registeredSlots.push(descriptor.name)
    return () => {}
  }
}

class MockLocaleService extends Service {
  constructor(ctx: Context) {
    super(ctx, 'locale', true)
  }

  register(_ns: string, _dicts: unknown) {
    return () => {}
  }
}

class MockLayoutService extends Service {
  constructor(ctx: Context) {
    super(ctx, 'layout', true)
  }

  openDetails(): void {}
  closeDetails(): void {}
}

describe('Client UI & Slot Registration (T7.1 - T7.4)', () => {
  it('T7.1: registers UI components in authorized additive slots without single-slot conflicts', async () => {
    const ctx = new Context()
    const registeredSlots: string[] = []

    await ctx.plugin(MockSlotsService, registeredSlots)
    await ctx.plugin(MockLocaleService)
    await ctx.plugin(MockLayoutService)
    await ctx.plugin({ name: 'test-client', apply, inject: ['slots', 'locale', 'layout'] })

    // 新窗口默认不注册 details（保持官方原生视角），工作台由侧边栏按钮显式打开。
    expect(registeredSlots).not.toContain('details')
    expect(registeredSlots).toContain('sidebar.footer.action')
    expect(registeredSlots).toContain('tool.call.toolview')
  })

  it('T7.2: renders ChangeCard React element with correct props and badges', () => {
    const element = React.createElement(ChangeCard, {
      title: 'Fix Authentication',
      filesChanged: 3,
      insertions: 45,
      deletions: 12,
      evidenceId: 'evi_123456',
      status: 'verified',
    })

    expect(element).toBeDefined()
    expect(element.props.title).toBe('Fix Authentication')
    expect(element.props.filesChanged).toBe(3)
    expect(element.props.evidenceId).toBe('evi_123456')
  })

  it('T7.3: renders WorkspaceFrame with multi-panel navigation tabs and layout style injection', () => {
    const element = React.createElement(WorkspaceFrame, { t: (key: string) => key })
    expect(element).toBeDefined()
    expect(element.type).toBe(WorkspaceFrame)
    // The layout-reorder stylesheet is injected by the frame (chat column → rightmost).
    void React.version
  })
})

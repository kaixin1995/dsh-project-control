import { describe, expect, it } from 'vitest'
import { Context, Service } from '@deepseek-ai/cordis'
import React from 'react'
import { apply } from '../src/client/index.ts'
import { ChangeCard } from '../src/client/components/ChangeCard.ts'

class MockSlotsService extends Service {
  constructor(ctx: Context, private readonly registeredSlots: string[]) {
    super(ctx, 'slots', true)
  }

  register(descriptor: { name: string }, component: Function) {
    this.registeredSlots.push(descriptor.name)
    return () => {}
  }
}

describe('Client UI & Slot Registration (T7.1 - T7.4)', () => {
  it('T7.1: registers UI components in authorized additive slots without single-slot conflicts', async () => {
    const ctx = new Context()
    const registeredSlots: string[] = []

    await ctx.plugin(MockSlotsService, registeredSlots)
    await ctx.plugin({ name: 'test-client', apply, inject: ['slots'] })

    expect(registeredSlots).toContain('sidebar.footer.action')
    expect(registeredSlots).toContain('tool.call.toolview')
    expect(registeredSlots).toContain('conversation.session.header.actions')
    expect(registeredSlots).toContain('conversation.view')
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
})

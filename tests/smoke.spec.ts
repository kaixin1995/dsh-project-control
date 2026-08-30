import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { apply } from '../src/plugin/service.ts'

describe('ProjectControl Smoke', () => {
  it('mounts service cleanly on Cordis context', async () => {
    const root = new Context()
    await root.plugin({ name: 'project-control', apply }, { enabled: true })

    expect(root.projectControl).toBeDefined()
    expect(root.projectControl.liveConfig.enabled).toBe(true)
  })
})

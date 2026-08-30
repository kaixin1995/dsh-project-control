import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { ProjectControlService } from '../src/plugin/service.ts'

describe('ProjectControl Smoke', () => {
  it('mounts service cleanly on Cordis context', async () => {
    const root = new Context()
    await root.plugin(ProjectControlService, { enabled: true })

    expect(root.projectControl).toBeDefined()
    expect(root.projectControl.config.enabled).toBe(true)
  })
})

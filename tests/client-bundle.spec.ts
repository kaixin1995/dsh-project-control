import { describe, expect, it } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))
const clientBundlePath = resolve(rootDir, '../lib/client.js')

describe('Client Bundle Packaging Contract', () => {
  it('generates lib/client.js with the mandatory __ModuleLoader__ wrapper', () => {
    expect(existsSync(clientBundlePath)).toBe(true)
    const content = readFileSync(clientBundlePath, 'utf8')
    expect(content.startsWith('window.__ModuleLoader__.load({ id: "dsh-project-control", factory: (require) => {\nvar module = { exports: {} };')).toBe(true)
    expect(content.includes('return module.exports; } });')).toBe(true)
  })
})

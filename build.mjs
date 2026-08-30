/**
 * Build script for dsh-project-control (Node ESM runtime + Browser CJS client bundle).
 */

import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

let esbuild
try {
  esbuild = await import('esbuild')
} catch {
  try {
    const rootRequire = createRequire(resolve(dirname(fileURLToPath(import.meta.url)), '../package.json'))
    esbuild = rootRequire('esbuild')
  } catch {
    const pnpmPath = resolve(dirname(fileURLToPath(import.meta.url)), '../node_modules/.pnpm/esbuild@0.25.12/node_modules/esbuild/lib/main.js')
    esbuild = await import(pathToFileURL(pnpmPath).href)
  }
}

const rootDir = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(rootDir, 'lib')
mkdirSync(outDir, { recursive: true })

const zodNodePath = resolve(rootDir, '../node_modules/.pnpm/zod@4.4.3/node_modules')

// 1. Build Host ESM bundle (lib/index.js)
// Inlines all dependencies (zod, schemastery, cosmokit) for 100% self-containment
await esbuild.build({
  entryPoints: [resolve(rootDir, 'src/index.ts')],
  outfile: resolve(outDir, 'index.js'),
  bundle: true,
  format: 'esm',
  target: 'node20',
  platform: 'node',
  nodePaths: [zodNodePath],
  alias: {
    '@deepseek-ai/schemastery': resolve(rootDir, '../vendor/schemastery/src/index.ts'),
    '@deepseek-ai/cosmokit': resolve(rootDir, '../vendor/cosmokit/src/index.ts'),
  },
  external: [
    'react',
    'react-dom',
  ],
  sourcemap: 'inline',
  logLevel: 'info',
})

// 2. Build Web Client bundle (lib/client.js)
const PLATFORM_EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-store',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-ui-primitives',
]

const banner = `window.__ModuleLoader__.load({ id: "dsh-project-control", factory: (require) => {
var module = { exports: {} };`

const footer = `return module.exports; } });`

await esbuild.build({
  entryPoints: [resolve(rootDir, 'src/client/index.ts')],
  outfile: resolve(outDir, 'client.js'),
  bundle: true,
  format: 'cjs',
  target: 'es2022',
  platform: 'browser',
  banner: { js: banner },
  footer: { js: footer },
  external: PLATFORM_EXTERNALS,
  sourcemap: 'inline',
  logLevel: 'info',
})

console.log('Successfully built dsh-project-control (Host lib/index.js & Client lib/client.js)!')

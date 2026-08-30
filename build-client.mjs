/**
 * Build script for dsh-project-control client bundle.
 * Wraps bundled CJS code into the Harness __ModuleLoader__ factory.
 */

import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

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

const isWatch = process.argv.includes('--watch')

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

const buildOptions = {
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
}

if (isWatch) {
  const ctx = await esbuild.context(buildOptions)
  await ctx.watch()
  console.log('Watching client bundle for changes...')
} else {
  await esbuild.build(buildOptions)
  console.log('Client bundle built successfully to lib/client.js')
}

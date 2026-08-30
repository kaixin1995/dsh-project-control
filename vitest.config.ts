import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { standardDecoratorPlugin } from '../vitest.shared.ts'

const dir = fileURLToPath(new URL('.', import.meta.url))
const zodPath = resolve(dir, '../node_modules/.pnpm/zod@4.4.3/node_modules/zod')

export default defineConfig({
  root: dir,
  plugins: [
    standardDecoratorPlugin(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      zod: zodPath,
    },
  },
  test: {
    include: ['tests/**/*.spec.ts', 'src/**/*.spec.ts'],
    environment: 'node',
  },
})

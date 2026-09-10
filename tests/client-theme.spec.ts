// 主题对比度引擎单测：深色模式「页签白块」事故的根因修复面。
// 不变式见 src/client/components/theme.ts 头注释。
import { describe, expect, it } from 'vitest'
import { parseColor, themeAwareText } from '../src/client/components/theme.ts'

describe('客户端主题对比度引擎', () => {
  it('parseColor 解析 hex 与 rgb()/rgba()，无法解析返回 null', () => {
    expect(parseColor('#2563eb')).toEqual([37, 99, 235])
    expect(parseColor('rgba(46, 160, 67, 0.16)')).toEqual([46, 160, 67])
    expect(parseColor('var(--dsw-alias-x)')).toBeNull()
  })

  it('themeAwareText 输出可解析的 rgb() 且确实做了对比度调整（node 按浅色路径深化）', () => {
    const out = themeAwareText('#9a6700')
    expect(out).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    // 深化方向：相对亮度不得高于输入色（在白底上更可读）。
    const [, r, g, b] = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(out)!.map(Number) as unknown as number[]
    const luminance = (rr: number, gg: number, bb: number): number => 0.2126 * rr + 0.7152 * gg + 0.0722 * bb
    expect(luminance(r, g, b)).toBeLessThanOrEqual(luminance(0x9a, 0x67, 0x00))
  })

  it('无法解析的颜色（CSS 变量）原样返回，交由宿主主题系统', () => {
    expect(themeAwareText('var(--dsw-alias-brand-primary, #2563eb)')).toBe('var(--dsw-alias-brand-primary, #2563eb)')
  })
})

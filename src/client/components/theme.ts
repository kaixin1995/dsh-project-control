/**
 * 客户端主题对比度引擎（深浅双主题共用的唯一实现）。
 *
 * 不变式（2026-09-10 深色模式「页签白块」事故后固化，全客户端必须遵守）：
 * 1. 随主题变化的强调色文字必须经 themeAwareText()：浅色主题自动深化到白底
 *    对比度 ≥4.5:1，深色主题自动提亮到深底 ≥4.5:1。须在渲染期调用（组件体内/
 *    渲染函数内），主题切换后随重渲染自动更新；禁止在模块加载期求值后存进
 *    静态样式对象。
 * 2. active 高亮背景（按钮 / 页签 / 筛选芯片等一切"选中即填色"的表面）一律用
 *    `var(--dsw-alias-button-info-fill, #2563eb)`（两个主题下都是蓝色），配白字。
 *    禁止用 --dsw-alias-brand-primary 作背景——它在深色主题是近白色，白字会被
 *    完全吞掉（本次事故根因）。
 * 3. 无法解析的颜色（CSS 变量等）原样返回：变量色交由宿主主题系统保证可读，
 *    但由此它们不得与硬编码前景色叠加使用。
 */

/** 解析 #rrggbb 或 rgb()/rgba() 颜色前三个分量为 [r, g, b]；无法解析返回 null。 */
export function parseColor(color: string): [number, number, number] | null {
  const hex = /^#([0-9a-f]{6})$/i.exec(color)
  if (hex !== null) {
    const value = Number.parseInt(hex[1], 16)
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
  }
  const functional = /^rgba?\(\s*(\d{1,3})[,\s]+(\d{1,3})[,\s]+(\d{1,3})/i.exec(color)
  if (functional !== null) {
    return [Number(functional[1]), Number(functional[2]), Number(functional[3])]
  }
  return null
}

/** WCAG 相对亮度（0=黑，1=白）。 */
export function relativeLuminance(r: number, g: number, b: number): number {
  const channel = (value: number): number => {
    const v = value / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** 深化颜色直到白底对比度 ≥4.5:1（每步向 #1f2328 混合 20%，至多 12 步）。 */
export function darkenForWhiteBackground(r: number, g: number, b: number): string {
  let red = r
  let green = g
  let blue = b
  for (let step = 0; step < 12 && relativeLuminance(red, green, blue) > 0.183; step += 1) {
    red = Math.round(red * 0.8 + 0x1f * 0.2)
    green = Math.round(green * 0.8 + 0x23 * 0.2)
    blue = Math.round(blue * 0.8 + 0x28 * 0.2)
  }
  return `rgb(${red}, ${green}, ${blue})`
}

/** 提亮颜色直到深底（#151517）对比度 ≥4.5:1（每步向 #f0f6fc 混合 20%，至多 12 步）。 */
export function lightenForDarkBackground(r: number, g: number, b: number): string {
  let red = r
  let green = g
  let blue = b
  for (let step = 0; step < 12 && relativeLuminance(red, green, blue) < 0.214; step += 1) {
    red = Math.round(red * 0.8 + 0xf0 * 0.2)
    green = Math.round(green * 0.8 + 0xf6 * 0.2)
    blue = Math.round(blue * 0.8 + 0xfc * 0.2)
  }
  return `rgb(${red}, ${green}, ${blue})`
}

/**
 * 主题自适应文字色：浅色主题深化到白底 ≥4.5:1；深色主题提亮到深底 ≥4.5:1
 * （深色字如 #57606a 直接放深底同样不可读）。所有强调色文本统一走这里。
 */
export function themeAwareText(color: string): string {
  const rgb = parseColor(color)
  if (rgb === null) return color
  if (typeof document !== 'undefined' && document.body?.hasAttribute?.('data-ds-dark-theme') === true) {
    return lightenForDarkBackground(rgb[0], rgb[1], rgb[2])
  }
  return darkenForWhiteBackground(rgb[0], rgb[1], rgb[2])
}

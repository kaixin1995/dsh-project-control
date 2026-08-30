/**
 * 零依赖单调排序 ULID（Universally Unique Lexicographically Sortable Identifier）生成器。
 * 编码格式：48 位时间戳 + 80 位随机熵，使用 Crockford Base32 编码（固定 26 字符）。
 * 保证在同一毫秒内的并发生成严格按字典序递增。
 *
 * @module dsh-project-control/domain/ulid
 */

import { randomBytes } from 'node:crypto'

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
const ENCODING_LEN = ENCODING.length

let lastTime = 0
const lastRandom = new Uint8Array(10)

/** 将时间戳转换为 Base32 字符串 */
function encodeTime(now: number, len: number): string {
  let str = ''
  for (let i = len - 1; i >= 0; i--) {
    const mod = now % ENCODING_LEN
    str = ENCODING.charAt(mod) + str
    now = (now - mod) / ENCODING_LEN
  }
  return str
}

/** 将随机字节数组转换为 Base32 字符串 */
function encodeRandom(bytes: Uint8Array): string {
  let str = ''
  // 10 字节 = 80 位 = 16 个 Base32 字符（每个 5 位）
  let buffer = 0
  let bits = 0
  for (let i = 0; i < bytes.length; i++) {
    buffer = (buffer << 8) | bytes[i]!
    bits += 8
    while (bits >= 5) {
      bits -= 5
      str += ENCODING.charAt((buffer >> bits) & 0x1f)
    }
  }
  if (bits > 0) {
    str += ENCODING.charAt((buffer << (5 - bits)) & 0x1f)
  }
  return str
}

/** 同一毫秒内自增随机熵以确保单调递增 */
function incrementRandom(): void {
  for (let i = lastRandom.length - 1; i >= 0; i--) {
    if (lastRandom[i]! < 0xff) {
      lastRandom[i]!++
      return
    }
    lastRandom[i] = 0
  }
}

/**
 * 生成严格单调递增的 ULID 字符串。
 * @param seedTime 可选的时间戳（毫秒），默认为 Date.now()
 * @returns 26 字符的 Base32 ULID 字符串
 */
export function generateUlid(seedTime: number = Date.now()): string {
  if (seedTime > lastTime) {
    lastTime = seedTime
    const rnd = randomBytes(10)
    for (let i = 0; i < 10; i++) {
      lastRandom[i] = rnd[i]!
    }
  } else {
    // 处于同一毫秒或出现时钟回拨：自增随机熵
    incrementRandom()
  }

  return encodeTime(lastTime, 10) + encodeRandom(lastRandom)
}

/**
 * 从 ULID 字符串中反解析出生成时间戳（毫秒）。
 * @param id ULID 字符串
 * @returns 时间戳毫秒数
 */
export function decodeUlidTime(id: string): number {
  if (id.length < 10) throw new Error(`Invalid ULID length: ${id}`)
  let time = 0
  for (let i = 0; i < 10; i++) {
    const char = id.charAt(i)
    const val = ENCODING.indexOf(char)
    if (val === -1) throw new Error(`Invalid Crockford Base32 character: ${char}`)
    time = time * ENCODING_LEN + val
  }
  return time
}

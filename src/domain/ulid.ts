/**
 * Zero-dependency monotonic ULID generator.
 * Encodes 48-bit timestamp + 80-bit entropy in Crockford Base32 (26 chars).
 * Strictly monotonic within the same millisecond.
 *
 * @module dsh-project-control/domain/ulid
 */

import { randomBytes } from 'node:crypto'

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
const ENCODING_LEN = ENCODING.length

let lastTime = 0
const lastRandom = new Uint8Array(10)

function encodeTime(now: number, len: number): string {
  let str = ''
  for (let i = len - 1; i >= 0; i--) {
    const mod = now % ENCODING_LEN
    str = ENCODING.charAt(mod) + str
    now = (now - mod) / ENCODING_LEN
  }
  return str
}

function encodeRandom(bytes: Uint8Array): string {
  let str = ''
  // 10 bytes = 80 bits = 16 Base32 characters (each 5 bits)
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
 * Generate a strictly monotonic ULID string.
 * @param seedTime - optional epoch timestamp (ms). Defaults to Date.now().
 */
export function generateUlid(seedTime: number = Date.now()): string {
  if (seedTime > lastTime) {
    lastTime = seedTime
    const rnd = randomBytes(10)
    for (let i = 0; i < 10; i++) {
      lastRandom[i] = rnd[i]!
    }
  } else {
    // Same millisecond or clock skew: increment entropy
    incrementRandom()
  }

  return encodeTime(lastTime, 10) + encodeRandom(lastRandom)
}

/**
 * Decode timestamp from ULID string.
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

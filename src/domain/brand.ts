/**
 * Branded string type helper for nominal typing.
 * @module dsh-project-control/domain/brand
 */

declare const brandSymbol: unique symbol

export type Branded<B extends string, T = string> = T & {
  readonly [brandSymbol]: B
}

/**
 * Creates a brand constructor / caster.
 */
export function createBrander<B extends string>() {
  return (value: string): Branded<B> => value as Branded<B>
}

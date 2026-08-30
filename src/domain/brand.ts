/**
 * 名义类型（Branded Type）辅助模块。
 * 在编译期为基础字符串附加品牌标识，防止不同业务实体的 ID 在调用时发生混用。
 *
 * @module dsh-project-control/domain/brand
 */

declare const brandSymbol: unique symbol

/**
 * 带有类型标记的名义类型定义
 */
export type Branded<B extends string, T = string> = T & {
  readonly [brandSymbol]: B
}

/**
 * 创建品牌类型构造与断言函数
 */
export function createBrander<B extends string>() {
  return (value: string): Branded<B> => value as Branded<B>
}

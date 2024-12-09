import type { IsUnion } from "./IsUnion";

/**
 * **IsNull**`<T>`
 *
 * Type utility which returns a boolean flag based on whether the given
 * type is **null**.
 *
 * Note: if `T` is a union type and one of the elements of the union
 * is `null` then this will return `boolean`.
 */
export type IsNull<T> = IsUnion<T> extends true
  ? [null] extends [T]
      ? boolean
      : false
  : [T] extends [null] ? true : false;

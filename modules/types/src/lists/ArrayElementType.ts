import type { IsEmptyContainer, TupleToUnion, Widen } from "inferred-types/types";

/**
 * **ArrayElementType**`<T>`
 *
 * Determines what type the elements in an array are.
 * ```ts
 * // string
 * type T = ArrayElementType<string[]>;
 * ```
 */
export type ArrayElementType<T extends readonly unknown[]> = IsEmptyContainer<T> extends true
  // this is an array versus a known length array
  ? [...T][0]
  : Widen<TupleToUnion<T>>;

import { IsEmptyContainer, TupleToUnion, Widen } from "inferred-types/dist/types/index";

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



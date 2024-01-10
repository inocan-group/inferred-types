import { EmptyContainer, TupleToUnion, Widen } from "src/types";

/**
 * **ArrayElementType**`<T>`
 * 
 * Determines what type the elements in an array are.
 * ```ts
 * // string
 * type T = ArrayElementType<string[]>;
 * ```
 */
export type ArrayElementType<T extends readonly unknown[]> = EmptyContainer<T> extends true
  // this is an array versus a known length array
  ? [...T][0]
  : Widen<TupleToUnion<T>>;



import { Mutable } from "../Mutable";

/**
 * Converts a Tuple type into a _union_ of the tuple elements
 * ```ts
 * const arr = [1, 3, 5] as const;
 * // 1 | 3 | 5
 * type U = TupleToUnion<typeof arr>;
 * ```
 */
export type TupleToUnion<T> = Mutable<T> extends any[] ? Mutable<T>[number] : never;

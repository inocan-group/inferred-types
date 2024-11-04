import { Keys } from "@inferred-types/types";

/**
 * Converts a Tuple type into a _union_ of the tuple elements
 *
 * ```ts
 * const arr = [1, 3, 5] as const;
 * // 1 | 3 | 5
 * type U = TupleToUnion<typeof arr>;
 * ```
 *
 * **Note:** an empty array will be converted to a `string` type.
 */
export type TupleToUnion<T> = T extends readonly unknown[]
  ? Keys<T>["length"] extends 0
    ? never
    : T[number]
  : never;


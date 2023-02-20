
import { IfLength } from "../boolean-logic/branching";
import { Keys } from "../dictionary/Keys";

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
  ? IfLength<Keys<T>, 0, string, T[number]>
  : never;

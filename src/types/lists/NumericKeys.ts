import { UnionToTuple } from "../type-conversion/UnionToTuple";

/**
 * **NumericKeys**<`TList`>
 * 
 * Will provide a readonly tuple of numeric keys for 
 * a given literal array and an empty array otherwise.
 * 
 * ```ts
 * type Arr = ["foo", "bar", "baz"];
 * // readonly ["0", "1", "2"] & (keyof Arr)[]
 * type T = NumericKeys<Arr>;
 * ```
 * 
 * **Related:** `Keys`
 */
export type NumericKeys <
  TList extends readonly any[]
> = Readonly<UnionToTuple<Readonly<{
  [K in keyof TList]: K
}[number]>>> ;


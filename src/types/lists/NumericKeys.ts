import { Narrowable } from "../literals";
import { UnionToTuple } from "../type-conversion/UnionToTuple";

/**
 * **NumericKeys**<`TList`>
 * 
 * Will provide a readonly tuple of numeric keys for 
 * a given literal array and an empty array otherwise.
 * 
 * ```ts
 * type Arr = ["foo", "bar", "baz"];
 * // readonly ["0", "1", "2"]
 * type T = NumericKeys<Arr>;
 * ```
 * 
 * **Related:** `Keys`
 */
export type NumericKeys <
  TList extends readonly Narrowable[]
> = Readonly<UnionToTuple<{
  [K in keyof TList]: K
}[number]>>;


import { IfEqual, IsEqual } from "src/types/boolean-logic/equivalency";
import { AnyObject, UnknownObject } from "./boolean-logic";
import { IfOr } from "./boolean-logic/Or";
import { AnyFunction } from "./functions";
import { Narrowable } from "./Narrowable";
import { UnionToTuple } from "./type-conversion/UnionToTuple";


/**
 * **Keys**`<TValue, [TExclude]>`
 * 
 * Provides the _keys_ of an object `TValue`. 
 *
 * - all keys will be typed as `keyof T & string`
 * - the return type is a _union type_ of all the keys
 * - Exclusions:
 *   - You may optionally express certain keys that you want to exclude
 *   - These exclusions should be represented as a union of string literals
 * - Composition:
 *    - while typically `TValue` would be an object, it can also be `readonly string[]`
 *    - in this situation, you will probably be using it to filter down the keys with the exclusion property described above.
 * ```ts
 * const t1 = { foo: 1, bar: 2 };
 * // "foo" | "bar"
 * type K = Keys<typeof t1>;
 * // "bar"
 * type K2 = Keys<typeof t1, "foo">
 * const t2 = ["foo", "bar"] as const;
 * // "foo" | "bar"
 * type K = Keys<typeof t2>;
 * ```
 */
export type Keys<
  TValue extends Narrowable,
> = IfEqual<
  Readonly<UnionToTuple<keyof TValue>>, readonly [string], 
  readonly [], 
  Readonly<UnionToTuple<keyof TValue>>
>;


/**
 * **NumericKeys**<`TList`>
 * 
 * Will provide the valid numeric keys for a readonly array.
 * 
 * **Related:** `Keys`
 */
export type NumericKeys <
  TList extends readonly any[]
> = {
  [K in keyof TList]: K
}[number];

const foo: string[] = ["foo", "bar"];
type X = NumericKeys<typeof foo>;

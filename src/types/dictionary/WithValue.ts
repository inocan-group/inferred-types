import { AnyObject } from "src/types/base-types";
import { KeysWithValue } from "./KeysWithValue";

/**
 * **WithValue**`<TObj,TValue>`
 *
 * Reduces an object's type down to only those key/value pairs where the
 * value is of type `W`.
 * ```ts
 * const foo = { a: 1, b: "hi", c: () => "hello" }
 * // { c: () => "hello" }
 * type W = WithValue<typeof foo, Function>
 * ```
 * 
 * **Related:** `WithoutValue`, `WithKeys`, `WithoutKeys`
 */
export type WithValue<
TObj extends AnyObject,
TValue,
> = Pick<TObj, KeysWithValue<TObj, TValue>>;

import { AnyObject } from "../boolean-logic";
import { ExpandRecursively } from "../literals";
import { Narrowable } from "../literals/Narrowable";
import { KeysWithoutValue } from "./KeysWithoutValue";

/**
 * **WithoutValue**
 *
 * Reduces an object's type down to only those key/value pairs where the
 * value is **NOT** of type `W`.
 * 
 * ```ts
 * const foo = { a: 1, b: "hi", c: () => "hello" }
 * // { a: 1, b: "hi" }
 * type W = WithValue<Function, typeof foo>
 * ```
 * 
 * You manually exclude keys as well by setting the optional `E` generic.
 */
export type WithoutValue<
  TObj extends AnyObject,
  TValue extends Narrowable,
> = ExpandRecursively<Pick<TObj, KeysWithoutValue<TObj,TValue>>>;

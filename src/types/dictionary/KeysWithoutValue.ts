import { AnyObject } from "src/types/base-types";
import { Narrowable } from "../literals";

/**
 * **KeysWithoutValue**`<TObj, TValue>`
 * 
 * The _keys_ on a given object `T` which _do not_ have a literal value of `W`.
 * ```ts
 * // "foo"
 * type Str = KeysWithoutValue<5, { foo: "hi"; bar: 5 }>;
 * ```
 */
export type KeysWithoutValue<
TObj extends AnyObject,
TValue extends Narrowable, 
> = {
    [K in keyof TObj]: TObj[K] extends TValue ? never : Readonly<K>;
}[keyof TObj];

import type { AnyObject, IfEqual, Narrowable } from "inferred-types/types";

/**
 * **KeysNotEqualValue**`<TObj, TValue>`
 *
 * The _keys_ on a given object `T` which _do not_ explicitly equal the type value of `W`.
 *
 * ```ts
 * // "bar"
 * type Str = KeysNotEqualValue<{ foo: 6; bar: 5 }, 5>;
 * ```
 *
 * **Related:** `KeysEqualValue`, `KeysWithoutValue`
 */
export type KeysNotEqualValue<
  TObj extends AnyObject,
  TValue extends Narrowable,
> = {
  [K in keyof TObj]: IfEqual<TObj[K], TValue, never, Readonly<K>>;
}[keyof TObj];

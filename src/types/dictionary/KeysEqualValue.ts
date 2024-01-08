import { IfEqual } from "..";

/**
 * **KeysEqualValue**`<TObj,TValue>`
 * 
 * The _keys_ on a given object `TObj` which are _equal to_ `TValue`.
 * 
 * ```ts
 * // "foo"
 * type Str = KeysEqualValue<{ foo: string; bar: 5; baz: "bye" }, string>;
 * ```
 * 
 * **Related:** `KeysWithValue`
 */
export type KeysEqualValue<TObj extends object, TWithValue> = {
  [K in keyof TObj]: TObj[K] extends readonly unknown[]
    ? IfEqual<TObj[K], TWithValue, K, never>
    : IfEqual<TObj[K], TWithValue, K, never>
}[keyof TObj];

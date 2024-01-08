import { AnyObject } from "..";

/**
 * **KeysWithValue**`<TObj,TValue>`
 * 
 * The _keys_ on a given object `TObj` which extend the value 
 * of `TValue`.
 * 
 * ```ts
 * // "foo" | "baz"
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5; baz: "bye" }, string>;
 * ```
 * 
 * **Related:** `KeysEqualValue`
 */
export type KeysWithValue<TObj extends AnyObject, TValue> = {
  [K in keyof TObj]: TObj[K] extends readonly unknown[]
    ? [TObj[K]] extends [Readonly<TValue>] ? K : never
    : [TObj[K]] extends [TValue] ? K : never
}[keyof TObj];

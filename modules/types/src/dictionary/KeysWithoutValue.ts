import type {  Dictionary } from "inferred-types/types";

/**
 * **KeysWithoutValue**`<TObj, TValue>`
 *
 * The _keys_ on a given object `T` which _do not_ extend the type value of `W`.
 *
 * ```ts
 * // "foo"
 * type T = KeysWithoutValue<{ foo: "hi"; bar: 5; baz: number }, number>;
 * ```
 */
export type KeysWithoutValue<
    TObj extends Dictionary,
    TValue
> = {
    [K in keyof TObj]: TObj[K] extends TValue ? never : Readonly<K>;
}[keyof TObj];

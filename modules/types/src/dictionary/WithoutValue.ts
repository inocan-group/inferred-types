import type {  Dictionary, ExpandRecursively, KeysWithoutValue, Mutable } from "inferred-types/types";

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
    TObj extends Dictionary,
    TValue,
> = Mutable<ExpandRecursively<
    Pick<TObj, KeysWithoutValue<TObj, TValue>>
>>;

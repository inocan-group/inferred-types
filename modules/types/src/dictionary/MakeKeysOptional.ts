import type {
    As,
    Dictionary,
    ExpandRecursively,
    IsGreaterThanOrEqual,
    Negative,
    ObjectKey,
    Slice,
    Subtract,
    WithKeys,
    WithoutKeys,
} from "inferred-types/types";

type Iterate<
    TObj extends Dictionary,
    TOptional extends readonly ObjectKey[]
> = ExpandRecursively<
    WithoutKeys<TObj, TOptional> & {
        [K in keyof WithKeys<TObj, TOptional>]?: K extends keyof TObj
            ? TObj[K]
            : never
    }
>;

type ConvertArray<
    TArr extends readonly unknown[],
    TOptional extends number
> = IsGreaterThanOrEqual<TOptional, TArr["length"]> extends true
    ? Partial<TArr>
    : Subtract<TArr["length"], TOptional> extends infer ReqNum extends number
        ? Negative<TOptional> extends infer OptNum extends number
            ? [
                Slice<TArr, 0, ReqNum>,
                Slice<TArr, OptNum>
            ] extends [
                infer ReqElements extends readonly unknown[],
                infer OptElements extends readonly unknown[]
            ]
                ? [...ReqElements, ...Partial<OptElements>]
                : never
            : never
        : never;

/**
 * **MakeKeysOptional**`<T, U>`
 *
 * Makes a set of keys on a known container `T`:
 *
 * - if `T` is a **dictionary** object then `U` should:
 *     - be a tuple of keys which you want to force
 *     to _optional_.
 *     - all other keys will be kept "as is"
 * - if `T` is an **array** then `U` should be:
 *     - in a tuple, only the _last_ items are allowed to be optional
 *     - therefore `U` is a number indicating _how many_ values should be optional
 *
 * **Related:** `MakeKeysRequired`
 */
export type MakeKeysOptional<
    T extends Dictionary | readonly unknown[],
    U extends T extends readonly unknown[] ? number : T extends  Dictionary ? readonly ObjectKey[] : never
> = T extends Dictionary
    ? Iterate<T, As<U, readonly ObjectKey[]>>
    : T extends readonly unknown[]
        ? ConvertArray<Required<T>, As<U, number>>
        : never;

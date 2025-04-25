import {
    And,
    First,
    IsGreaterThan,
    IsLessThan,
    TupleMeta
} from "inferred-types/types";


/**
 * **Flexy**`<TParams>`
 *
 * Meant to be used for parameter lists where if `TList` allows for only
 * the first parameter to be set then it widens the type to allow not only
 * the tuple but also just a singular value of the appropriate type.
 *
 * **Related:** `AsArray`
 */
export type Flexy<
    TParams extends readonly unknown[]
> = And<[
    TupleMeta<TParams>["minLength"] extends 0 | 1 ? true : false,
    IsGreaterThan<TupleMeta<TParams>["maxLength"], 0>,
    IsLessThan<TupleMeta<TParams>["minLength"], 2>
]> extends true
    ? First<TParams> | TParams
    : TParams;




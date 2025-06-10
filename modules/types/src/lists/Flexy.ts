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
    TParams extends readonly unknown[],
    TMeta extends TupleMeta<TParams> = TupleMeta<TParams>
> =  And<[
    TMeta["minLength"] extends 0 | 1 ? true : false,
    IsGreaterThan<TMeta["maxLength"], 0>,
    IsLessThan<TMeta["minLength"], 2>
]> extends true
    ? First<TParams> | TParams
    : TParams;




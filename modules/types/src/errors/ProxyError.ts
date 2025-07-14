import type { ExpandDictionary, MergeObjects } from "inferred-types/types";
import type { As } from "types/boolean-logic";
import type { TypedError } from "types/errors/Err";

/**
 * **ErrMerge**`<TError,TUtility,[TGeneric]>`
 *
 * Tests `TError` to see if it extends the Javascript `Error` class
 * and if so it proxies it forward. If it is not then TElse is returned in
 * it's place.
 */
export type ErrMerge<
    // the type being tested as an Error
    TError,
    // the type to pass through if the
    TElse extends TypedError
> = TError extends Error
    ? As<ExpandDictionary<
        MergeObjects<TElse, TError>
    >, TypedError>
    : TElse;

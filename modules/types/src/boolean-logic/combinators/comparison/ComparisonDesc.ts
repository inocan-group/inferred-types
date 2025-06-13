import {
    As,
    ComparisonLookup,
    ComparisonOperation,
    NumberLike
} from "inferred-types/types";

type Descriptors<
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"],
> = {
    sameDay: `compares two DateLike values to see if they refer to the same day.`,
    greaterThan: `checks if the passed in value(s) are greater than ${As<TParams[0], NumberLike>}.`,
    lessThan: `checks if the passed in value(s) are less than ${As<TParams[0], NumberLike>}.`,
}


/**
 * **ComparisonDesc**`<TOp,TParams>`
 *
 * Provides a description for a subset of the comparison operations.
 *
 * - when a description is _not_ available then `null` is returned
 * - the parameters being provided is important to give a fuller description
 * of the operation.
 */
export type ComparisonDesc<
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = TOp extends keyof Descriptors<TOp,TParams>
? Descriptors<TOp,TParams>[TOp]
: null;



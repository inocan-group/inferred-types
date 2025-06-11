import {
    ComparisonLookup,
    ComparisonOperation
} from "inferred-types/types";

type Descriptors<T> = {

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
    TParams extends readonly unknown[] & ComparisonLookup[TOp]
> = TOp extends keyof Descriptors<TParams>
? null
: null;

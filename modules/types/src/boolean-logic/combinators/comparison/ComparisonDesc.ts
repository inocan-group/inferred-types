import type {
    As,
    ComparisonLookup,
    ComparisonOperation,
    NumberLike
} from "inferred-types/types";

interface Descriptors<
    _TOp extends ComparisonOperation & keyof ComparisonLookup,
    TParams extends readonly unknown[],
> {
    sameDay: `compares two DateLike values to see if they refer to the same day.`;
    greaterThan: TParams extends readonly [infer First, ...unknown[]]
        ? `checks if the passed in value(s) are greater than ${As<First, NumberLike>}.`
        : string;
    lessThan: TParams extends readonly [infer First, ...unknown[]]
        ? `checks if the passed in value(s) are less than ${As<First, NumberLike>}.`
        : string;
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
    TOp extends ComparisonOperation & keyof ComparisonLookup,
    TParams extends readonly unknown[]
> = TOp extends keyof Descriptors<TOp, TParams>
    ? Descriptors<TOp, TParams>[TOp]
    : null;

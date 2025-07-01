import type {
    Compare,
    ComparisonAccept,
    ComparisonDesc,
    ComparisonLookup,
    ComparisonOperation,
    Filter
} from "inferred-types/types";

/**
 * **ComparisonFn**
 *
 * A function which take a value or a tuple of values
 * and:
 *
 * 1. return a boolean value when passed a
 */
export type ComparisonFn<
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = (
ComparisonDesc<TOp, TParams> extends string
    ? {
        kind: "Comparison Function";
        operation: TOp;
        params: TParams;
        desc: ComparisonDesc<TOp, TParams>;
    }
    : {
        kind: "Comparison Function";
        operation: TOp;
        params: TParams;
    }
) & (
    <T extends readonly ComparisonAccept<TOp>[]>(val: T) => T extends readonly unknown[]
        ? Filter<T, TOp, TParams>
        : T extends ComparisonAccept<TOp>
            ? Compare<T, TOp, TParams>
            : never
);


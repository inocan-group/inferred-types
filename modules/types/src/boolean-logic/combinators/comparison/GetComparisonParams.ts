import type {
    As,
    ComparisonLookup,
    ComparisonOperation,
    IsUnion,
    Narrowable,
} from "inferred-types/types";

/**
 * Presents the type options for entering a comparison's
 * parameters. This is meant as a convenience function
 * and allows you to not be forced to enter parameter
 * that aren't required.
 */
export type GetComparisonParamInput<
    TOp extends string
> = TOp extends ComparisonOperation
? IsUnion<TOp> extends true
    ? readonly unknown[]
: "params" extends keyof ComparisonLookup[TOp]
        ? ComparisonLookup[TOp]["params"] extends readonly unknown[]
            ? ComparisonLookup[TOp]["params"]
            : never
        : readonly unknown[]
: readonly unknown[]

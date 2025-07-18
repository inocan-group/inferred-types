import type {
    ComparisonLookup,
    ComparisonOperation,
    Narrowable
} from "inferred-types/types";

/**
 * **ComparisonAccept**`<TOp>`
 *
 * Provides the _base type_ which a comparison function will accept.
 *
 * - those operations which don't state an explicit `accept` property
 * in their definitions will be assigned the type `unknown`.
 */
export type ComparisonAccept<
    TOp extends string
> = TOp extends ComparisonOperation
? "accept" extends keyof ComparisonLookup[TOp]
        ? ComparisonLookup[TOp]["accept"]
        : Narrowable
: Narrowable;

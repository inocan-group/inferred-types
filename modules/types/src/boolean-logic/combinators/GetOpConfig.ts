import { ComparisonLookup, ComparisonMode, ComparisonOpConfig, ComparisonOperation } from "inferred-types/types";

/**
 * **GetOpConfig**`<TOp>`
 *
 * Type utility which extracts the configuration for
 * a specific comparison operation.
 */
export type GetOpConfig<
    TOp extends ComparisonOperation,
    TMode extends ComparisonMode = "design-time",
    TConfig = ComparisonLookup[TOp]
> = TConfig extends ComparisonOpConfig<TMode>
? TConfig
: never;


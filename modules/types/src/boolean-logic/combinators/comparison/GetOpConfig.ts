import type {
    ComparisonLookup,
    ComparisonOpConfig,
    ComparisonOperation,
    Err,
    ToStringLiteral
} from "inferred-types/types";

/**
 * **GetOpConfig**`<TOp>`
 *
 * Type utility which extracts the configuration for
 * a specific comparison operation.
 */
export type GetOpConfig<
    TOp extends ComparisonOperation,
    TConfig = ComparisonLookup[TOp]
> = TConfig extends ComparisonOpConfig
    ? TConfig
    : TOp extends keyof ComparisonLookup
        ? Err<
        `malformed-operation/${TOp}`,
        `The configuration for '${TOp}' was found but is malformed and does not extend the 'ComparisonOpConfig' type!`,
        { config: ToStringLiteral<TConfig> }
        >
        : Err<
        `invalid-operation/${TOp}`,
        `Tried to get configuration on '${TOp}' comparison operation but this operation is not known!`
        >;

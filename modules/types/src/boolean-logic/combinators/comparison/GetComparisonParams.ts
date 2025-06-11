import {
    AsArray,
    ComparisonLookup,
    ComparisonMode,
    ComparisonOpConfig,
    ComparisonOperation,
    Err,
    GetOpConfig,
    TupleMeta
} from "inferred-types/types";

/**
 * Presents the type options for entering a comparison's
 * parameters. This is meant as a convenience function
 * and allows you to not be forced to enter parameter
 * that aren't required.
 */
export type GetComparisonParamInput<
    TOp extends ComparisonOperation,
    TMode extends ComparisonMode = "design-time",
    TConfig extends ComparisonOpConfig<TMode> | Error = GetOpConfig<TOp, TMode>,
    TParams extends readonly unknown[] = TConfig extends ComparisonOpConfig<TMode> ? TConfig["params"] : [],
    TMeta extends TupleMeta<any> = TupleMeta<TParams>
> = TMeta["minLength"] extends 1
    ? TParams | TParams[0]
: TMeta["minLength"] extends 0
    ? TMeta["maxLength"] extends 0
        ? []
        : [] | TParams
: TParams;

/**
 * the parameters associated with a comparison can be
 * added in a _short-hand_ which the `GetComparisonParamInput`
 * utility provides but this takes whatever input is provided
 * by the caller and puts it back into a tuple based parameters
 * array.
 */
export type ComparisonInputToTuple<
    TOp extends ComparisonOperation,
    TInput
> = AsArray<TInput> extends ComparisonLookup[TOp]["params"]
? AsArray<TInput>
: never;


/**
 * To allow people using a comparison operation which
 * take NO parameters, we must have a "default value" assigned
 * and this utility will provide a default empty tuple `[]` as
 * a default if the comparison operation does not require
 * any parameters.
 */
export type ComparisonInputDefault<
    TOp extends ComparisonOperation<TMode>,
    TMode extends ComparisonMode = "design-time",
    TConfig extends ComparisonOpConfig<TMode> | Error = GetOpConfig<TOp, TMode>,
    TParams extends readonly unknown[] = TConfig extends ComparisonOpConfig<TMode> ? TConfig["params"] : [],
    TMeta extends TupleMeta<any> = TupleMeta<TParams>
> = TMeta["minLength"] extends 0
    ? []
    : Err<
        `invalid/params`,
        `The operation '${TOp}' requires parameters but none were provided!`,
        { params: TParams }
    >;

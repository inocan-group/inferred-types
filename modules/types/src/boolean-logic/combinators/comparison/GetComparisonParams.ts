import type {
    AsArray,
    ComparisonLookup,
    ComparisonOperation,
    Err,
    IsGreaterThan,
    ToStringLiteral,
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
    TParams extends readonly unknown[] = ComparisonLookup[TOp]["params"],
> = IsGreaterThan<TupleMeta<TParams>["minLength"], 1> extends true
    ? TParams
    : TupleMeta<TParams>["minLength"] extends 1
        ? TParams | TParams[0]
        : TupleMeta<TParams>["minLength"] extends 0
            ? TupleMeta<TParams>["maxLength"] extends 0
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
    TInput,
    TUsedIn extends "Filter" | "NotFilter" | "Compare" = "Compare"
> = [TInput] extends [ComparisonLookup[TOp]["params"]]
    ? TInput
    : [AsArray<TInput>] extends [ComparisonLookup[TOp]["params"]]
        ? AsArray<TInput>
        : Err<
            `invalid-parameters`,
    `The parameters added to the ${TUsedIn}<Val,'${TOp}',Params> operation were invalid!`,
    {
        expected: ComparisonLookup[TOp]["params"];
        got: ToStringLiteral<AsArray<TInput>>;
    }
        >;

/**
 * To allow people using a comparison operation which
 * take NO parameters, we must have a "default value" assigned
 * and this utility will provide a default empty tuple `[]` as
 * a default if the comparison operation does not require
 * any parameters.
 */
export type ComparisonInputDefault<
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[] = ComparisonLookup[TOp]["params"]
> = TupleMeta<TParams>["minLength"] extends 0
    ? []
    : Err<
        `invalid-parameters`,
            `The operation '${TOp}' requires a minimum of ${TupleMeta<TParams>["minLength"]} parameters but none were provided!`,
            { params: TParams }
    >;

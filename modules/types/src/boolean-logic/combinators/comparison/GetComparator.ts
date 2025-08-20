import type {
    AfterFirst,
    AsString,
    AsStringUnion,
    ComparisonOpConfig,
    ComparisonParamConvert__Unit,
    Err,
    First,
    FromInputToken,
    InputToken,
    IsUnion,
    Length,
    Slice,
    ToStringArray,
} from "inferred-types/types";

type TakeCount<
    T extends ComparisonOpConfig
> = undefined extends T["take"]
    ? T["params"]["length"] extends Required<ComparisonOpConfig["take"]>
        ? T["params"]["length"]
        : "*"
    : T["take"] extends Required<ComparisonOpConfig["take"]>
        ? T["take"]
        : never;

type Take<
    TParams extends readonly unknown[],
    TConfig extends ComparisonOpConfig,
> = TakeCount<TConfig> extends 0
    ? undefined
    : TakeCount<TConfig> extends 1
        ? First<TParams>
        : TakeCount<TConfig> extends "*"
            ? TParams
            : TakeCount<TConfig> extends number
                ? Slice<TParams, 0, TakeCount<TConfig>>
                : never;

type ConvertUnit<
    TConvert extends ComparisonParamConvert__Unit,
    TParam
> = [TConvert] extends ["stringLiteral"]
    ? [TParam] extends [string | number | boolean]
        ? `${TParam}`
        : Err<
        `invalid-conversion/${TConvert}`,
        `The '${TConvert}' conversion was used on a parameter whose type is not allowed. This operation should be used to convert strings, number, or booleans into string literals.`,
        { param: TParam }
        >
    : [TConvert] extends ["token"]
        ? [TParam] extends [InputToken]
            ? FromInputToken<TParam>
            : never
        : [TConvert] extends ["none"]
            ? TParam
            : TParam
    ;

/**
 * Called when the "convert" rule is a tuple of rules.
 */
type GetTupleComparator<
    TConvert extends readonly ComparisonParamConvert__Unit[],
    TParams extends readonly unknown[],
    TResult extends readonly unknown[] = []
> = [] extends TParams
    ? TResult
    : GetTupleComparator<
        Length<TConvert> extends 1
            ? TConvert // maintain last rule if more params than rules
            : AfterFirst<TConvert>,
        AfterFirst<TParams>,
        [
            ...TResult,
            ConvertUnit<
                First<TConvert>,
                First<TParams>
            >
        ]
    >
    ;
/**
 * **GetComparator**`<TConfig, TParams, [TMode]>`
 *
 * Uses an operations configuration to determine what the
 * Comparator type or types is.
 *
 * Takes:
 *
 * - `0` &nbsp;&nbsp;-> returns _undefined_
 * - `1` &nbsp;&nbsp;-> type after any _conversion_
 * - `2+` -> a tuple of params with all _conversions_ complete
 */
export type GetComparator<
    TConfig extends ComparisonOpConfig,
    TParams extends readonly unknown[],
> = [TConfig["convert"]] extends ["stringArray"]
    ? Take<ToStringArray<TParams>, TConfig>
    : [TConfig["convert"]] extends ["union"]
        ? Take<[TParams[number]], TConfig>
        : [TConfig["convert"]] extends ["stringUnion"]
            ? TParams extends [infer Only]
                ? IsUnion<Only> extends true
                    ? AsStringUnion<Only>
                    : [AsString<Only>]
                : Take<[ToStringArray<TParams>[number]], TConfig>
            : [TConfig["convert"]] extends ["token"]
                ? Take<{
                    [K in keyof TParams]: [TParams[K]] extends [InputToken]
                        ? FromInputToken<TParams[K]>
                        : never
                }, TConfig>
                : [TConfig["convert"]] extends ["stringLiteral"]
                    ? Take<{
                        [K in keyof TParams]: [TParams[K]] extends [string | number | boolean]
                            ? `${TParams[K]}`
                            : never
                    }, TConfig>
                    : [TConfig["convert"]] extends [readonly ComparisonParamConvert__Unit[]]
                        ? GetTupleComparator<
                            TConfig["convert"],
                            TParams
                        >
                        : Take<TParams, TConfig>;

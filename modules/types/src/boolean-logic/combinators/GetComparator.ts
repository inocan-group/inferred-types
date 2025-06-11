import {
    ComparisonMode,
    ComparisonOpConfig,
    First,
    FromInputToken,
    InputTokenLike,
    Slice,
    ToStringArray,
} from "inferred-types/types";


type TakeCount<
    T extends ComparisonOpConfig<ComparisonMode>
> = undefined extends T["take"]
    ? T["params"]["length"] extends Required<ComparisonOpConfig<any>["take"]>
            ? T["params"]["length"]
            : "*"
    : T["take"] extends Required<ComparisonOpConfig<any>["take"]>
        ? T["take"]
        : never;

type Take<
    TParams extends readonly unknown[],
    T extends ComparisonOpConfig<ComparisonMode>,
> = TakeCount<T> extends 0
? undefined
: TakeCount<T> extends 1
? First<TParams>
: TakeCount<T> extends "*"
? TParams
: TakeCount<T> extends number
    ? Slice<TParams,0,TakeCount<T>>
    : never;


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
    TConfig extends ComparisonOpConfig<TMode>,
    TParams extends readonly unknown[],
    TMode extends ComparisonMode = "design-time"
> = TConfig["convert"] extends "stringArray"
    ? Take<ToStringArray<TParams>, TConfig>
: TConfig["convert"] extends "union"
    ? Take<[TParams[number]], TConfig>
: TConfig["convert"] extends "string-union"
    ? Take<[ToStringArray<TParams>[number]], TConfig>
: TConfig["convert"] extends "token"
    ? Take<{
        [K in keyof TParams]: TParams[K] extends InputTokenLike
            ? FromInputToken<TParams[K]>
            : never
    }, TConfig>
: TConfig["convert"] extends "stringLiteral"
    ? Take<{
        [K in keyof TParams]: TParams[K] extends string | number | boolean
            ? `${TParams[K]}`
            : never
    }, TConfig>
: Take<TParams, TConfig>;


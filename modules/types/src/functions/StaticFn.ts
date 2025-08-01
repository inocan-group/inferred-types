import type {
    AsFnMeta,
    Dictionary,
    EmptyObject,
    IsEqual,
    IsNonEmptyObject,
    TypedFunction,
} from "inferred-types/types";

/**
 * **StaticFn**`<TFn>`
 *
 * Receives any function `TFn` and makes sure that it is not using
 * generics to narrow the inputs coming into the function.
 *
 * **Related:** `IsStaticFn`, `NarrowingFn`
 */
export type StaticFn<
    TFn extends TypedFunction,
> = AsFnMeta<TFn>["hasProps"] extends true
    ? AsFnMeta<TFn>["hasArgs"] extends true
        ? ((...args: AsFnMeta<TFn>["params"]) => AsFnMeta<TFn>["returns"]) & AsFnMeta<TFn>["props"]
        : (() => AsFnMeta<TFn>["returns"]) & AsFnMeta<TFn>["props"]
    : AsFnMeta<TFn>["hasArgs"] extends true
        ? (...args: AsFnMeta<TFn>["params"]) => AsFnMeta<TFn>["returns"]
        : () => AsFnMeta<TFn>["returns"];

/**
 * **AsStaticFn**`<TParams,TReturns,TProps>`
 *
 * Constructs a `StaticFn` from component aspects of
 * a function.
 *
 * **Related:** `LiteralFn`, `NarrowingFn`, `AsNarrowingFn`
 */
export type AsStaticFn<
    TParams extends readonly any[] | TypedFunction,
    TReturn = unknown,
    TProps extends Dictionary = EmptyObject,
> = TParams extends TypedFunction
    ? StaticFn<TParams>
    : TParams extends readonly any[]
        ? IsNonEmptyObject<TProps> extends true
            ? IsEqual<TParams, []> extends true
                ? (() => TReturn) & TProps
                : ((...args: TParams) => TReturn) & TProps
            : IsEqual<TParams, []> extends true
                ? () => TReturn
                : (...args: TParams) => TReturn
        : never;

import type {
    AnyFunction,
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
 * Converts generic/narrowing functions to their static equivalents:
 * - `<T extends string>(x: T) => T` becomes `(x: string) => string`
 * - Preserves intersection properties if present
 *
 * **Related:** `IsStaticFn`, `NarrowingFn`
 */
export type StaticFn<
    TFn extends AnyFunction,
> = TFn extends (...args: infer P) => infer R
    ? P["length"] extends 0
        ? () => R
        : (...args: P) => R
    : never;

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

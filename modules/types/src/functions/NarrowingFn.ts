import type {
    AnyFunction,
    Dictionary,
    EmptyObject,
    IsEqual,
    IsNarrowingFn,
    IsNonEmptyObject,
    TypedFunction,
} from "inferred-types/types";

/**
 * **NarrowingFn**`<N>`
 *
 * Produces a function which helps to narrow down to the type passed in
 * by assigning generics to all input parameters.
 *
 * ```ts
 * // <T extends string>(name: string) => string
 * type Fn1 = NarrowingFn<(name: string) => string>;
 * // <T extends number>(v: T) => T
 * type Fn2 = NarrowingFn<number>;
 * // <T extends number>(v: T) => T
 * type Fn2 = NarrowingFn<42>;
 * ```
 *
 * **Related:** `LiteralFn`, `IsNarrowingFn`
 */
export type NarrowingFn<
    TFn extends AnyFunction,
> = TFn extends TypedFunction
    ? IsEqual<Parameters<TFn>, []> extends true
        // no parameters so no change
        ? TFn
        : IsNarrowingFn<TFn> extends true
            ? TFn
            : (<T extends readonly [...Parameters<TFn>]>(...args: T) => ReturnType<TFn>)
    : NarrowingFn<TypedFunction>;

/**
 * **AsNarrowingFn**`<TParams,TReturns,TProps>`
 *
 * Constructs a `NarrowingFn` from component aspects of
 * a function.
 *
 * **Related:** `LiteralFn`, `NarrowingFn`, `AsStaticFn`
 */
export type AsNarrowingFn<
    TParams extends readonly any[] | TypedFunction,
    TReturn = unknown,
    TProps extends Dictionary = EmptyObject,
> = TParams extends TypedFunction
    ? NarrowingFn<TParams>
    : TParams extends readonly unknown[] // this is the normal call structure
        ? [IsNonEmptyObject<TProps>] extends [true]
            ? [IsEqual<TParams, []>] extends [true]
                ? (() => TReturn) & TProps
                : (<T extends readonly [...TParams]>(...args: T) => TReturn) & TProps
            : [IsEqual<TParams, []>] extends [true]
                ? () => TReturn
                : <T extends readonly [...TParams]>(...args: T) => TReturn
        : never;

import type { TypedFunction } from "inferred-types/types";

/**
 * **JustFunction**`<T>`
 *
 * Type utility which strips off any dictionary properties that may have existed
 * on the function passed in as `T` and leaves just the pure function signature.
 */
export type JustFunction<
    TFn extends TypedFunction,
> = (...args: Parameters<TFn>) => ReturnType<TFn>;

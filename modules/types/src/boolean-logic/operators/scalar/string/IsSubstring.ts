import type { As } from "inferred-types/types";

/**
 * **IsSubstring**`<TContent, TFind>`
 *
 *  type operator which validates if `TFind` is a string subset of
 * `TContent`.
 */
export type IsSubstring<
    TContent extends string,
    TFind extends string
> = As<
    TContent extends `${string}${TFind}${string}`
        ? true
        : false,
    boolean
>;

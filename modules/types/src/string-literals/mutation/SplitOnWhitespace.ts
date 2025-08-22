import type { As, IsWhitespace } from "inferred-types/types";

type Splitter<
    TContent extends string,
    TAcc extends string = "",
    TResult extends readonly string[] = []
> = TContent extends `${infer Head extends string}${infer Rest extends string}`
    ? IsWhitespace<Head> extends true
        ? TAcc extends ""
            ? Splitter<
                Rest,
                TAcc,
                TResult
            >
            : Splitter<
                Rest,
                ``,
                [...TResult, TAcc]
            >
        : Splitter<
            Rest,
        `${TAcc}${Head}`,
        TResult
        >
    : TAcc extends ""
        ? TResult
        : [...TResult, TAcc];

/**
 * **SplitOnWhitespace**`<T>`
 *
 * Splits a string into a tuple of non-whitespace strings.
 *
 * - whitespace includes spaces, tabs, and new line characters
 *
 * ```ts
 * // [ "foo", "bar" ]
 * type FooBar = SplitOnWhitespace<"   foo\tbar">;
 * ```
 *
 * **Related:** `Split`
 */
export type SplitOnWhitespace<
    TContent extends string
> = string extends TContent
    ? string[]
    : As<Splitter<TContent>, readonly string[]>;

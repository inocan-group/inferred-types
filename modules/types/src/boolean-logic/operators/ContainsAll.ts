import type { And, AsString, Contains, IsWideContainer } from "inferred-types/types";

/**
 * **ContainsAll**`<TContent, THasAll>`
 *
 * Type utility which provides a boolean response based on
 * whether _all_ of the values in `THasAll` are _contained_ by `TContent`.
 *
 * - `TContent` can be either a tuple value or a string/numeric value
 * - for _string_ content all of the substrings found in `THasAll`
 * must be found in that string
 * - all numeric content is first converted to a string literal before
 * making any comparisons.
 *
 * **Related:** `Contains`, `NarrowlyContains`
 */
export type ContainsAll<
    TContent extends string | number | readonly unknown[],
    THasAll extends readonly unknown[],
> = IsWideContainer<TContent> extends true
    ? boolean
    : And<{
        [K in keyof THasAll]: TContent extends number
            ? Contains<AsString<TContent>, THasAll[K]>
            : Contains<TContent, THasAll[K]>
    }>;

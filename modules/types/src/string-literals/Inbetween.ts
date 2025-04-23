import type { And, Concat, Contains, IsWideString, Or, StripAfter, StripBefore } from "inferred-types/types";

export type InbetweenOptions = {
    policy?: "inclusive" | "exclusive";
    noMatch?: unknown;
};

/**
 * **Inbetween**`<T,TStart,TEnd>`
 *
 * Returns the _substring_ of `T` starting at `TStart` and ending
 * with `TEnd`.
 *
 * - by default the `TStart` and `TEnd` literals will be excluded
 * from the substring returned
 * - if you want to change this default set `TOpt["policy"]` to `inclusive`
 * - If either the `TStart` or `TEnd` strings are not found in `T` then no
 * match is possible and the value of `TOpt["noMatch"]` is returned
 * - by default the `TOpt["noMatch"]` value is an empty strings
 */
export type Inbetween<
    T extends string,
    TStart extends string,
    TEnd extends string,
    TOpt extends InbetweenOptions = { noMatch: ""; policy: "exclusive" }
> = Or<[
    IsWideString<T>,
    IsWideString<TStart>,
    IsWideString<TEnd>
]> extends true
    ? string

    : And<[
        Contains<T, TStart>,
        Contains<T, TEnd>,
    ]> extends true
        ? TOpt["policy"] extends "inclusive"
            ? Concat<[
                TStart,
                StripBefore<StripAfter<T, TEnd>, TStart>,
                TEnd
            ]>

            : StripBefore<StripAfter<T, TEnd>, TStart>
        : TOpt["noMatch"];

import type { IsStringLiteral, Join, Split } from "inferred-types/types";

/**
 * **StripAfterLast**`<TStr, TBreak>`
 *
 * Receives a string `TStr` and truncates all characters in
 * the first occurrence of `TBreak` and all remaining chars.
 *
 * ### Example
 * ```ts
 * // "hello"
 * type T = StripAfter<"hello world", " ">;
 * ```
 */
export type StripAfterLast<
    TStr extends string,
    TBreak extends string,
> = IsStringLiteral<TStr> extends true
    ? IsStringLiteral<TBreak> extends true
        ? Split<TStr, TBreak, "inline"> extends readonly [...infer Front, string, string]
            ? Join<Front>
            : []

        : string
    : string;

import type { As } from "inferred-types/types";

/**
 * Optimized string-based processing without array conversion
 */
type ProcessDirect<
    TStr extends string,
    TComparator extends string,
    TInclude extends boolean = false,
    TResult extends string = "",
> = TStr extends `${infer First}${infer Rest}`
    ? First extends TComparator
        ? TInclude extends true
            ? `${TResult}${First}`
            : TResult
        : ProcessDirect<Rest, TComparator, TInclude, `${TResult}${First}`>
    : TResult;

/**
 * **RetainUntil**`<TContent,TComparator>`
 *
 * Proxies the content of `TContent` character-by-character _until_
 * a character _extends_ `TComparator`.
 *
 * ```ts
 * // "1984"
 * type Num = RetainUntil<"1984 is a number", WhiteSpace>;
 * ```
 *
 * **Related:** `RetainWhile`
 */
export type RetainUntil<
    TContent extends string,
    TComparator extends string,
    TInclude extends boolean = false,
> = string extends TContent
    ? string
    : As<ProcessDirect<TContent, TComparator, TInclude>, string>;

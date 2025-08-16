import type { AfterFirst, Chars, First } from "inferred-types/types";

type Process<
    TChars extends readonly string[],
    TOp extends "extends" | "doesNotExtend",
    TComparator extends string,
    TResponse extends string = ""
> = [] extends TChars
    ? TResponse
    : TOp extends "extends"
        ? First<TChars> extends TComparator
            ? Process<
                AfterFirst<TChars>,
                TOp,
                TComparator,
            `${TResponse}${First<TChars>}`
            >
            : TResponse
        : First<TChars> extends TComparator
            ? TResponse
            : Process<
                AfterFirst<TChars>,
                TOp,
                TComparator,
            `${TResponse}${First<TChars>}`
            >;

/**
 * **RetainWhile**`<TContent,TComparator>`
 *
 * Proxies the content of `TContent` character-by-character _until_
 * a character _does not extend_ `TComparator`.
 *
 * ```ts
 * // "1984"
 * type Num = RetainWhile<"1984 is a number", NumericChar>;
 * ```
 *
 * **Related:** `RetainUntil`
 */
export type RetainWhile<
    TContent extends string,
    TComparator extends string,
    TOp extends "extends" | "doesNotExtend" = "extends"
> = string extends TContent
    ? string
    : string extends TComparator
        ? string

        : Process<Chars<TContent>, TOp, TComparator>;

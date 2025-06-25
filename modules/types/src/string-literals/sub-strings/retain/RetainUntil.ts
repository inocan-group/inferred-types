import type { AfterFirst, Chars, First, If } from "inferred-types/types";

type Process<
    TChars extends readonly string[],
    TOp extends "is" | "not",
    TComparator extends string,
    TInclude extends boolean = false,
    TResult extends string = "",
> = [] extends TChars
    ? TResult
    : First<TChars> extends TComparator
        ? TOp extends "is"
            ? Process<
                AfterFirst<TChars>,
                TOp,
                TComparator,
                TInclude,
        `${TResult}${First<TChars>}`
            >
            : If<TInclude, `${TResult}${First<TChars>}`, TResult>
        : TOp extends "is"
            ? If<TInclude, `${TResult}${First<TChars>}`, TResult>
            : Process<
                AfterFirst<TChars>,
                TOp,
                TComparator,
                TInclude,
        `${TResult}${First<TChars>}`
            >;

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
> = Process<Chars<TContent>, "not", TComparator, TInclude>;

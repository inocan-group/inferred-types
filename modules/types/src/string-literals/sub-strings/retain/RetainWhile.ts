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
> = Process<Chars<TContent>, "is", TComparator>;

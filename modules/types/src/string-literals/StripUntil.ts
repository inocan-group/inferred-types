import type { AfterFirst, Chars, First, Shift } from "inferred-types/types";

type Process<
  TChars extends readonly string[],
  TOp extends "is" | "not",
  TComparator extends string,
  TResult extends string,
> = [] extends TChars
  ? TResult
  : First<TChars> extends TComparator
    ? TOp extends "is"
      ? Process<
        AfterFirst<TChars>,
        TOp,
        TComparator,
        Shift<TResult> extends string
          ? Shift<TResult>
          : ""
      >
      : TResult
    : TOp extends "is"
      ? TResult
      : Process<
        AfterFirst<TChars>,
        TOp,
        TComparator,
        Shift<TResult> extends string
          ? Shift<TResult>
          : ""
      >;

/**
 * **StripUntil**`<TContent,TComparator>`
 *
 * Strip characters from the start of `TContent` _until_ a
 * character extends `TComparator`.
 */
export type StripUntil<
  TContent extends string,
  TComparator extends string,
> = Process<Chars<TContent>, "not", TComparator, TContent>;

/**
 * **StripWhile**`<TContent,TComparator>`
 *
 * Strip characters from the start of `TContent` _while_ those
 * characters extend `TComparator`.
 */
export type StripWhile<
  TContent extends string,
  TComparator extends string,
> = Process<Chars<TContent>, "is", TComparator, TContent>;

import { ComparatorOperation, Compare } from "../boolean-logic";
import { AfterFirst, First, Last } from "../lists";
import { Increment } from "../numeric-literals";
import { Chars } from "./Chars";

type _FindIndexes<
  TContent extends readonly unknown[],
  TFind,
  TOp extends ComparatorOperation = "extends",
  TIdx extends number = 0,
  TResults extends readonly number[] = []
> = [] extends TContent
? TResults
: _FindIndexes<
    AfterFirst<TContent>,
    TFind,
    TOp,
    Increment<TIdx>,
    Compare<First<TContent>, TOp, TFind> extends true
      ? [
          ...TResults,
          TIdx
        ]
      : TResults
  >;


/**
 * **FindIndexes**
 *
 * Utility which returns all _indexes_ in `TContent`
 * where `TFind` is found.
 *
 * - by default, the comparision operation is "extends" but
 * you can change this with `TOp`.
 * - the content (`TContent`) can be either a string or a tuple
 *
 * **Related:** `FindFirstIndex`, `FindLastIndex`
 */
export type FindIndexes<
  TContent extends string | readonly unknown[],
  TFind,
  TOp extends ComparatorOperation = "extends"
> = TContent extends string
? _FindIndexes<
    Chars<TContent>,
    TFind,
    TOp
  >
: TContent extends readonly unknown[]
  ? _FindIndexes<TContent,TFind,TOp>
  : never;





export type FindFirstIndex<
TContent extends string | readonly unknown[],
  TFind,
  TOp extends ComparatorOperation = "extends"
> = First<FindIndexes<TContent,TFind,TOp>>;


export type FindLastIndex<
TContent extends string | readonly unknown[],
  TFind,
  TOp extends ComparatorOperation = "extends"
> = Last<FindIndexes<TContent,TFind,TOp>>;

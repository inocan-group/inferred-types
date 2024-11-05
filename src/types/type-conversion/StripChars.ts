import {  Marked } from "inferred-types/dist/constants/index";
import {
  IsWideType,
  Or,
  RemoveMarked,
  Chars,
  As,
  Concat
} from "src/types/index";

type Strip<
  TChars extends readonly string[],
  TStrip extends string
> = {
  [K in keyof TChars]: TChars[K] extends TStrip
    ? Marked
    : TChars[K]
};


type Process<
  TChars extends readonly string[],
  TStrip extends string,
> = As<RemoveMarked<Strip<TChars,TStrip>>, readonly string[]>;


/**
 * **StripChars**`<TContent,TStrip>`
 *
 * Converts a string `TContent` into a string with all
 * of the characters in `TStrip` removed.
 *
 * - `TStrip` must be a single character or a union
 * of single characters or this will throw
 * `ErrorCondition<"invalid-strip-char">`
 */
export type StripChars<
  TContent extends string,
  TStrip extends string,
> = Or<[IsWideType<TContent>, IsWideType<TStrip>]> extends true
  ? string
  : // both TContent and TStrip are literals
    Concat<Process<Chars<TContent>, TStrip>>;


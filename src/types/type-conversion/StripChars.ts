import { Constant } from "src/constants/index";
import {
  IsWideType,
  Or,
  RemoveMarked,
  Chars,
  Join
} from "src/types/index";

type Process<
  TChars extends readonly string[],
  TStrip extends string
> = RemoveMarked<{
  [K in keyof TChars]: TChars[K] extends TStrip
    ? Constant<"Marked">
    : TChars[K]
}>;

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
  : Process<Chars<TContent>, TStrip> extends readonly string[]
    ? Join<Process<Chars<TContent>, TStrip>>
    : never;


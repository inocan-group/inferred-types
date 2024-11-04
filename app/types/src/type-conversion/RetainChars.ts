import { Constant } from "@inferred-types/constants";
import {
  IsWideType,
  Or,
  RemoveMarked,
  Chars,
  Join
} from "@inferred-types/types";

type Process<
  TChars extends readonly string[],
  TRetain extends string
> = RemoveMarked<{
  [K in keyof TChars]: TChars[K] extends TRetain
    ? TChars[K]
    : Constant<"Marked">
}>;


/**
 * **RetainChars**`<TContent,TRetain>`
 *
 * Converts a string `TContent` into a string with all
 * of the characters in `TRetain` _retained_ while all
 * other characters are removed.
 */
export type RetainChars<
  TContent extends string,
  TRetain extends string,
> = Or<[IsWideType<TContent>, IsWideType<TRetain>]> extends true
  ? string
  : Process<Chars<TContent>, TRetain> extends readonly string[]
    ? Join<Process<Chars<TContent>, TRetain>>
    : never;


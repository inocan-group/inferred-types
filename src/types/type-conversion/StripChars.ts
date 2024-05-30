import { Constant } from "../../constants/Constant";
import { And, IsEqual, IsUnion, IsWideType, Or } from "../boolean-logic";
import { RemoveMarked, RemoveNever } from "../containers";
import { Throw } from "../errors";
import { Chars } from "../string-literals/Chars";
import { Join } from "../string-literals/Join";
import { UnionToTuple } from "./UnionToTuple";

type Validate<T extends string> = IsEqual<T["length"], 1>;

type ValidateEach<
  T extends readonly string[]
> = And<{
  [K in keyof T]: Validate<T[K]>
}>;

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


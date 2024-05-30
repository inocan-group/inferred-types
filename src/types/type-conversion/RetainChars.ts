import { Constant } from "../../constants/Constant";
import { And, IsEqual, IsWideType, Or } from "../boolean-logic";
import { RemoveMarked } from "../containers";
import { Chars } from "../string-literals/Chars";
import { Join } from "../string-literals/Join";

type Validate<T extends string> = IsEqual<T["length"], 1>;

type ValidateEach<
  T extends readonly string[]
> = And<{
  [K in keyof T]: Validate<T[K]>
}>;

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


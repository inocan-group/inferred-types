import {  Chars,  If, IsStringLiteral, Concat} from "src/types/index";


type Process<
  TChars extends readonly string[]
> = {
  [K in keyof TChars]: Capitalize<TChars[K]>
};

/**
 * **AllCaps**`<T>`
 * 
 * Type utility which converts all alphabetic characters to their
 * UPPERCASE variant.
 */
export type AllCaps<T extends string> = If<
  IsStringLiteral<T>,
  Chars<T> extends readonly string[]
    ? Process<Chars<T>> extends readonly string[] 
      ? Concat<Process<Chars<T>>> 
      : never
    : Chars<T>,
  string
>;

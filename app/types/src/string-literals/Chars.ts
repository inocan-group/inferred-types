import {  IsStringLiteral,  IsEqual } from "@inferred-types/types";

type Process<
  TStr extends string,
  TResult extends readonly string[] = []
> = IsStringLiteral<TStr> extends true
  ? IsEqual<TStr["length"], 0> extends true
    ? []
    : TStr extends `${infer Char}${infer Rest}`
      ? Process<
          Rest,
          [...TResult, Char]
        >
      : TResult
  : string;


/**
 * **Chars**`<TStr>`
 *
 * Takes a literal string and converts it to an array of characters.
 */
export type Chars<TStr extends string> = IsStringLiteral<TStr> extends true
  ? Process<TStr> extends readonly string[]
    ? Process<TStr>
    : never
  : readonly string[]

import type {  IsUnion, UnionToTuple, If, ToStringArray, IsStringLiteral,  AllStringLiterals, AsArray, Or, And, Throw } from "src/types/index";

type _HasChar<
  TStr extends string,
  TChars extends readonly string[],
  TOp extends "any" | "all"
> = TOp extends "any"
? Or<{
    [K in keyof TChars]: TStr extends `${string}${TChars[K]}${string}` ? true : false
  }>
: And<{
    [K in keyof TChars]: TStr extends `${string}${TChars[K]}${string}` ? true : false
  }>;


type Process<
TStr extends string,
TChars extends string | readonly string[],
TOp extends "any" | "all"
> = TChars extends string
? If<
  IsUnion<TChars>,
  UnionToTuple<TChars> extends readonly string[]
    ? Process<TStr, UnionToTuple<TChars>,TOp>
    : Process<TStr, ToStringArray<UnionToTuple<TChars>>, TOp> extends readonly string[]
      ? Process<TStr, ToStringArray<UnionToTuple<TChars>>, TOp>
      : Throw<
          "non-string-union", 
          `HasCharacters<TStr,TChars,TOp> did not return a string array as expected`,
          "HasCharacters",
          { value: Process<TStr, ToStringArray<UnionToTuple<TChars>>, TOp> }
        >,
  If<IsStringLiteral<TChars>, _HasChar<TStr,[TChars],TOp>, never >
>
: TChars extends readonly string[]
  ? _HasChar<TStr, TChars,TOp>
  : never;


/**
 * **HasCharacters**`<TStr,TChars>`
 * 
 * Boolean type utility which tests whether `TStr` has _any_ of the
 * characters in `TChars`. 
 * 
 * - If you would prefer to test for ALL characters matching then 
 * you can change `TOp` to "all".
 * 
 * **Related:** `NotCharacters`
 */
export type HasCharacters<
  TStr extends string,
  TChars extends string | readonly string[],
  TOp extends "any" | "all" = "any"
> = If<
  IsStringLiteral<TStr>,
  If<
    TChars extends string 
      ? IsStringLiteral<TChars> 
      : AllStringLiterals<AsArray<TChars>>,
    Process<TStr,TChars,TOp>,
    boolean
  >
>

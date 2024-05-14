import type {  IsUnion, UnionToTuple, IsStringLiteral,  AllStringLiterals, AsArray, Or, And } from "src/types/index";

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
  TChars extends string,
  _TOp extends "any" | "all"
> = TStr extends `${string}${TChars}${string}`
? true
: false;

type ProcessTuple<
  TStr extends string,
  TChars extends readonly string[],
  TOp extends "any" | "all"
> = TOp extends "any"
? Or<{
  [K in keyof TChars]: TStr extends `${string}${TChars[K]}${string}`
    ? true
    : false
}>
: And<{
  [K in keyof TChars]: TStr extends `${string}${TChars[K]}${string}`
    ? true
    : false
}>;

type PreProcess<
  TStr extends string,
  TChars extends string,
  TOp extends "any" | "all"
> = IsUnion<TChars> extends true
? UnionToTuple<TChars> extends readonly string[]
  ? ProcessTuple<TStr,UnionToTuple<TChars>,TOp>
  : never
: Process<TStr, TChars, TOp>;


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
> = IsStringLiteral<TStr> extends true
  ? TChars extends string 
    ? IsStringLiteral<TChars> extends true
      ? PreProcess<TStr,TChars,TOp>
      : boolean
  : TChars extends readonly string[]
    ? AllStringLiterals<AsArray<TChars>> extends true
      ? ProcessTuple<TStr, TChars, TOp>
      : boolean
    : boolean
      
  : boolean;


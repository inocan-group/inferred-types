import type { AfterFirst, First, AsArray } from "src/types/index";

type _HasChar<
  TStr extends string,
  TChars extends readonly string[],
> = [] extends TChars
? false
: TStr extends `${string}${First<TChars>}${string}`
  ? true
  : _HasChar<
      TStr,
      AfterFirst<TChars>
    >;

/**
 * **HasCharacter**`<TStr,TChars>`
 * 
 * Boolean type utility which tests whether `TStr` has the
 * character `TChars` in it. 
 * 
 * - If more than one character is provided in `TChars` then
 * the result will return **true** if _any_ of the characters
 * are present.
 * 
 * **Related:** `NotCharacters`
 */
export type HasCharacters<
  TStr extends string,
  TChars extends string | readonly string[]
> = _HasChar<TStr, AsArray<TChars>>;

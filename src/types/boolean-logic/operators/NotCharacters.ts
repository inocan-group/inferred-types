import { AfterFirst, First, AsArray } from "src/types/index";

type _NotChar<
TStr extends string,
TChars extends readonly string[]
> = [] extends TChars
? true
: TStr extends `${string}${First<TChars>}${string}`
  ? false
  : _NotChar<
      TStr,
      AfterFirst<TChars>
    >;


/**
 * **NotCharacters**`<TStr,TChars>`
 * 
 * Boolean type utility which tests that `TStr` has 
 * _none_ of the characters defined in `TChars`.
 */
export type NotCharacters<
TStr extends string,
TChars extends string | readonly string[]
> = _NotChar<TStr, AsArray<TChars>>;

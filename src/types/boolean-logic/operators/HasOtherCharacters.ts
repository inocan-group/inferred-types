import type {  
  ReplaceAll,
  IsWideType,
  TupleToUnion,
} from "src/types/index";

type Process<
  TStr extends string,
  TChars extends string,
> = ReplaceAll<TStr, TChars, ""> extends ""
? false
: true;



/**
 * **HasOtherCharacters**`<TStr,TChars>`
 * 
 * Boolean type utility which tests whether `TStr` has any
 * characters _other_ than those in `TChars`. 
 * 
 * - union types are fine for `TChars`
 * - a tuple for `TChars` behaves the same as union type
 * 
 * **Related:** `HasCharacters`
 */
export type HasOtherCharacters<
  TStr extends string,
  TChars extends string | readonly string[],
> = [IsWideType<TStr>] extends [true]
? boolean
: [TChars] extends [string]
? IsWideType<TChars> extends true
  ? boolean
  : Process<TStr,TChars>
: TChars extends readonly string[]
  ? Process<TStr,TupleToUnion<TChars>>
  : never;


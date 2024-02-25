import { Length } from "../lists/Length";
import { Shift } from "../lists/Shift";
import { Increment } from "../numeric-literals/Increment";
import { AsString } from "../type-conversion";
import { FirstChar } from "./FirstChar";

type Process<
TStr extends string,
TIndexBy extends string,
TIndexPos extends number = 0,
TResults extends readonly number[] = []
> = "" extends TStr
?  TResults
:  Process<
    Shift<TStr>,
    TIndexBy,
    Increment<TIndexPos>,
    FirstChar<TStr> extends TIndexBy
      ? [
        ...TResults,
        TIndexPos
      ]
      : TResults
  >;

export type IndexMeta = [name: string, position: number, len: number];

type ProcessWithMeta<
  TStr extends string,
  TIndexBy extends string,
  TIndexPos extends number = 0,
  TResults extends readonly IndexMeta[] = []
> = "" extends TStr
?  TResults
:  ProcessWithMeta<
    Shift<TStr>,
    TIndexBy,
    Increment<TIndexPos>,
    FirstChar<TStr> extends TIndexBy
      ? [
        ...TResults,
        [ 
          name: AsString<FirstChar<TStr>>, 
          position: TIndexPos, 
          len: Length<FirstChar<TStr>> 
        ]
      ]
      : TResults
  >;

/**
 * **IndexesOfStr**`<TStr,TIndexBy>`
 * 
 * Provides a tuple containing the numeric index positions where `TIndexBy` 
 * is found in `TStr`.
 * 
 * **Note:** you can provide a literal type or a union type for `TIndexBy`
 * 
 * **Related:** `IndexesOfStrWithMeta`
 */
export type IndexesOfStr<
  TStr extends string,
  TIndexBy extends string | readonly string[]
> = TIndexBy extends string
? Process<TStr,TIndexBy>
: never;


/**
 * **IndexesOfStrWithMeta**`<TStr,TIndexBy>`
 * 
 * Provides a list of index points where `TStr` is indexed by `TIndexBy`.
 * Each intersection results in a `NamedIndex` tuple of:
 * 
 * `[ name: string, position: number ]`
 * 
 * This utility is particularly useful when a union type is passed in
 * for the `TIndexBy` value and allows consumers to map back to the 
 * actual literal variant that provided the indexation.
 * 
 * **Related:** `IndexesOfStr`
 */
export type IndexesOfStrWithMeta<
TStr extends string,
TIndexBy extends string
> = ProcessWithMeta<TStr,TIndexBy>;


import { AnyObject, DoesExtend, IfFalse } from "../boolean-logic";
import { And } from "../boolean-logic/And";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type Extractor<
  TList extends any[] | readonly any[],
  TExtract, // what to extract
  TInverse extends boolean = false,
  TResults extends readonly any[] = []
> = [] extends TList
  ? TResults
  : IfFalse<
      TInverse,
      // normal extraction
      First<TList> extends TExtract
        ? First<TList> extends never
          ? Extractor<AfterFirst<TList>, TExtract, TInverse, TResults>
          : Extractor<AfterFirst<TList>, TExtract, TInverse, [...TResults, First<TList>]>
        : Extractor<AfterFirst<TList>, TExtract, TInverse, TResults>,
      // inverted extraction
      First<TList> extends TExtract
        ? Extractor<AfterFirst<TList>, TExtract, TInverse, TResults>
        : And<[DoesExtend<First<TList>, never>, DoesExtend<TExtract, never>]> extends true
            ? Extractor<AfterFirst<TList>, TExtract, TInverse, TResults>
            : Extractor<AfterFirst<TList>, TExtract, TInverse, [...TResults, First<TList>]>
      >;

/**
 * **RemoveNever**`<T>`
 * 
 * Type utility which removes any `never` values from an array/tuple or
 * object properties.
 */
export type RemoveNever<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? Extractor<T, never, true>
  : T extends readonly any[]
  ? readonly [...Extractor<T, never, true>]
  : T extends AnyObject
  ? any
  : never;


/**
 * **ExtractStrings**`<T>`
 * 
 * Extracts the _string_ values from arrays an objects and discards the rest.
 */
export type ExtractStrings<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? Extractor<T, string>
  : T extends readonly any[]
  ? readonly [...Extractor<T, string>]
  : T extends AnyObject
  ? any
  : never;

/**
 * **ExtractNumbers**`<T>`
 * 
 * Extracts the _numeric_ values from arrays or objects and discards the rest.
 */
export type ExtractNumbers<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? Extractor<T, number>
  : T extends readonly any[]
  ? readonly [...Extractor<T, number>]
  : T extends AnyObject
  ? any
  : never;

/**
 * **ExtractBoolean**`<T>`
 * 
 * Extracts the _boolean_ values from arrays or objects and discards the rest.
 */
export type ExtractBoolean<
T extends any[] | readonly any[] | AnyObject
> = T extends any[]
? Extractor<T, boolean>
: T extends readonly any[]
? readonly [...Extractor<T, boolean>]
: T extends AnyObject
? any
: never;

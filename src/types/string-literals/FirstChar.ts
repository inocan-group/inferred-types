import {  Split,  AsArray, AfterFirst, First, IfStringLiteral, AsString, IfString, IfNever, Chars } from "..";

type Iterate<
  TInput extends readonly string[],
  TChars extends readonly string[] = []
> = [] extends TInput
  ? TChars
  : Iterate<
      AfterFirst<TInput>,
      IfStringLiteral<
        First<TInput>,
        // first element IS a string element
        IfNever<
          Chars<First<TInput>>,
          TChars,
          [ ...TChars, First<Chars<First<TInput>>> ]
        >,
        // first element is NOT a string literal
        TChars
      >
    >;

/**
 * **FirstChar**`<TContent>`
 * 
 * Receives either a string or a tuple of strings. Based on the input
 * it is converted to:
 * 
 * - **String:** 
 *    - when a string is received it will return the first character
 * in that string as a string literal. 
 *    - when a wide string type is provided it will return the _never_ type.
 * - **Tuple<string>:** 
 *    - when a tuple of strings is received it will process
 * each element in the array independently and return each element's first
 * character
 *    - any wide strings encountered will be ignored in the returned array
 */
export type FirstChar<
  TContent extends string | readonly string[]
> = IfString<
  TContent,
  First<Split<AsString<TContent>>>,
  Iterate<AsArray<TContent>>
>;


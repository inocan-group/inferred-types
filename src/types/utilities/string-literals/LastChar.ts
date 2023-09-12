import {  
  Split,  
  AsArray, 
  AfterFirst, 
  First, 
  Last,
  IfStringLiteral, 
  AsString, 
  IfString, 
  Chars,
  IfNever
} from "src/types";

type Iterate<
  TInput extends readonly string[],
  TChars extends readonly string[] = []
> = [] extends TInput
  ? TChars
  : Iterate<
      AfterFirst<TInput>,
      IfStringLiteral<
        First<TInput>,
        // first element IS a string literal
        IfNever<
          Chars<First<TInput>>,
          TChars,
          Last<Chars<First<TInput>>> extends string
            ? [ ...TChars, Last<Chars<First<TInput>>>]
            : never
        >,
        // first element is NOT a string literal
        TChars
      >
    >;

/**
 * **LastChar**`<TContent>`
 * 
 * Receives either a string or a tuple of strings. Based on the input
 * it is converted to:
 * 
 * - **String:** 
 *    - when a string is received it will return the last character
 * in that string as a string literal. 
 *    - when a wide string type is provided it will return the _never_ type.
 * - **Tuple<string>:** 
 *    - when a tuple of strings is received it will process
 * each element in the array independently and return each element's first
 * character
 *    - any wide strings encountered will be ignored in the returned array
 */
export type LastChar<
  TContent extends string | readonly string[]
> = IfString<
  TContent,
  Last<Split<AsString<TContent>>>,
  Iterate<AsArray<TContent>>
>;


import { Split, AsArray, AfterFirst, AsString,  Concat } from "src/types/index";

type Iterate<
  TInput extends readonly string[]
> = {
  [K in keyof TInput]: TInput[K] extends string 
    ? Concat<AfterFirst<AsArray<Split<TInput[K]>>>>
    : never
};

/**
 * **RemainingChar**`<TContent>`
 * 
 * Receives either a string or a tuple of strings. Based on the input
 * it is converted to:
 * 
 * - **String:** 
 *    - when a string is received it will return the string with the first 
 * character removed
 *    - when a wide string type is provided it will return the _never_ type.
 * - **Tuple<string>:** 
 *    - when a tuple of strings is received it will process
 * each element in the array independently and return each element's _remaining characters_
 * after the first character has been removed
 *    - any wide strings encountered will be ignored in the returned array
 */
export type RemainingChars<
  TContent extends string | readonly string[]
> = TContent extends readonly string[]
  ? Iterate<AsArray<TContent>>
  : Concat<AfterFirst<AsArray<Split<AsString<TContent>>>>>;


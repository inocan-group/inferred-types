import {  
  AsArray,
  Last,
  AsString, 
  IfString,
  UnionToTuple,
  Chars, 
} from "src/types/index";

type Iterate<
  TInput extends readonly string[],
> = UnionToTuple<{
  [K in keyof TInput]: Last<AsArray<Chars<AsString<TInput[K]>>>>
}[number]>

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
 * each element in the array independently and return each element's last
 * character
 *    - any wide strings encountered will be ignored in the returned array
 */
export type LastChar<
  TContent extends string | readonly string[]
> = IfString<
  TContent,
  Last<AsArray<Chars<AsString<TContent>>>>,
  TContent extends readonly string[]
    ? Iterate<TContent>
    : never
>;


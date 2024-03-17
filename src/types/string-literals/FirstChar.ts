import {  Split, First,  AsString } from "src/types/index";


/**
 * **FirstChar**`<TContent>`
 * 
 * Receives a _string_ and is converted into:
 * 
 *    - will return the first character in a string literal.
 *    - when a wide string type is provided it will return the _never_ type.
 */
export type FirstChar<
  TContent extends string 
> = First<Split<AsString<TContent>>>;


/**
 * **FirstCharOfEach**`<TContent>`
 * 
 * Receives a tuple of strings and returns a tuple with only the
 * first character of each of the tuple elements.
 */
export type FirstCharOfEach<
  TContent extends readonly string[]
> = {
  [K in keyof TContent]: FirstChar<TContent[K]>
}

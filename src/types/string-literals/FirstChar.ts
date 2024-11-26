import {   First, Chars } from "inferred-types/types";

type Process<TContent extends string> = First<Chars<TContent>>;

type Iterate<TContent extends readonly string[]> = {
  [K in keyof TContent]: Process<TContent[K]>
}


/**
 * **FirstChar**`<TContent>`
 *
 * When `TContent` extends a _string_:
 *   - will return the first character in a string literal
 *   - returns `string` when a wide type is encountered
 *   - returns `never` when an empty string is passed in
 *
 * When `TContent` is a tuple of strings:
 *   - each item will be processed as described above
 *
 * **Related:** `LastChar`, `AfterFirstChar`
 */
export type FirstChar<
  TContent extends string | readonly string[]
> = TContent extends readonly string[]
? Iterate<TContent>
: TContent extends string
  ? string extends TContent
    ? string
    : Process<TContent>
  : never;



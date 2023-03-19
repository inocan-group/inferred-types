import { Concat, Pop, Split, Tuple } from "src/types";


/**
 * **BeforeLast**`<T>`
 *
 * Returns:
 * 
 * - the _elements_ in an **array** but excluding the last element
 * - the _characters_ in a **string** excluding the last character
 * 
 * **Related:** `Pop`, `Last`, `AfterFirst`, `First`
 */
export type BeforeLast<
  T extends Tuple | string
> = T extends string 
  ? Concat<Pop<Split<T>> & string[]>
  : Pop<T & Tuple>;



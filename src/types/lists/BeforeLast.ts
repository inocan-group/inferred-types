import {  Pop, Tuple } from "src/types/index";


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
  ? Pop<T>
  : T extends Tuple
    ? Pop<T>
    : never;



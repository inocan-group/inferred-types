import {  Handle, Pop, Tuple } from "src/types/index";


/**
 * **BeforeLast**`<T>`
 *
 * Returns:
 * 
 * - the _elements_ in an **array** but excluding the last element
 * - the _characters_ in a **string** excluding the last character
 * 
 * This behavior is _very_ much like `Pop<T>` but where `Pop<T>` will 
 * return _never_ when an empty input is passed in, this utility returns
 * the appropriate "empty" state:
 * 
 * - a tuple will return `[]`
 * - a string will return ""
 * 
 * **Related:** `Pop`, `Last`, `AfterFirst`, `First`
 */
export type BeforeLast<
  T extends Tuple | string
> = T extends string 
  ? Handle<Pop<T>, never, "">
  : T extends Tuple
    ? Handle<Pop<T>, never, []>
    : never;


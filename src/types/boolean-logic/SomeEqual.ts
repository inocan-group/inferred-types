import { IfEqual } from "./index";
import { AfterFirst, First } from "../lists";

/**
 * **SomeEqual**`<TVal, TList>`
 * 
 * A type utility which tests whether `TVal` is exactly equal to an array of values
 * stored in `TList`. Possible results are `true`, `false`. A wide `boolean` type
 * is not possible as equality operator can always be evaluated at design time.
 * 
 * **See Also:** `SomeExtends` and `IfSomeEqual`
 */
export type SomeEqual<TVal, TList extends readonly unknown[]> = [] extends TList
? false
: IfEqual<TVal, First<TList>, true, SomeEqual<TVal, AfterFirst<TList>>>;

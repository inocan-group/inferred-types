import { IfEqual , AfterFirst, First } from "inferred-types/types";

/**
 * **SomeEqual**`<TVal, TList>`
 *
 * A type utility which tests whether `TVal` is exactly equal to an array of values
 * stored in `TList`. Possible results are `true`, `false`. A wide `boolean` type
 * is not possible as equality operator can always be evaluated at design time.
 *
 * **See Also:** `SomeExtend` and `IfSomeEqual`
 */
export type SomeEqual<
TList extends readonly unknown[],
  TVal,
> = [] extends TList
? false
: IfEqual<TVal, First<TList>, true, SomeEqual<AfterFirst<TList>, TVal>>;

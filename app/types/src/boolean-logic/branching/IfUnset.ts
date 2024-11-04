import {
  IsUndefined,
  Unset
} from "@inferred-types/types";


/**
 * **IfUnset**`<TTest,TElse,[TIf]>`
 *
 * Branching utility which will proxy _any_ type through except
 * for those set with `Unset<[T]>`.
 *
 * When `Unset` is found then it will be replaced with `TElse`.
 */
export type IfUnset<
  TTest,
  TElse,
  TIf = TTest
> = TTest extends Unset
? TElse
: Exclude<TIf, Unset>;


export type IfUnsetOrUndefined<
TTest,
TElse,
TIf = TTest
> = TTest extends Unset
? TElse
: IsUndefined<TTest> extends true
? TElse
: Exclude<TIf, Unset | undefined>;

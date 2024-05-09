import {  AllLiteral, If } from "src/types/index";

/**
 * **IfWide**`<T,TRUE,FALSE>`
 * 
 * Branching utility which branches based on whether `T` is a "wide type" or not.
 */
export type IfWide<
  T, //
  TRUE,
  FALSE = T
> = If<
  AllLiteral<[T]>,
  FALSE, 
  TRUE
>;

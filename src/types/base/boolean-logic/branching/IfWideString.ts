import {  IfBoolean, IfLiteral } from "../..";

/**
 * **IfWideString**`<T,TRUE,FALSE>`
 * 
 * Type utility which maps to type `IF` when `T` is a _wide_ "string" type and 
 * maps to `ELSE` type otherwise.
 */
export type IfWideString<
  T, //
  TRUE,
  FALSE
> = IfLiteral<T, FALSE, IfBoolean<T, TRUE, FALSE>>;

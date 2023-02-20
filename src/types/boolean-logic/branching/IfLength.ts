import { Length, IfEqual, IsLiteral } from "src/types";


/**
 * **IfLength**`<TEvaluate,TLength,IF,ELSE,MAYBE>`
 * 
 * Type utility which returns type `IF` _if_ `TEvaluate` evaluates to being of 
 * a length of `TLength`. It returns type `ELSE` if it can determine the length
 * at design time and otherwise returns `MAYBE`.
 * 
 * If a _non-array_ type is passed into `TEvaluate` then utility will result `ELSE`
 * type.
 */
export type IfLength<
  TEvaluate extends unknown | unknown[] | readonly unknown[], 
  TLength extends number, 
  IF,
  ELSE,
  MAYBE = IF | ELSE
> = TEvaluate extends readonly unknown[]
  ? IsLiteral<TLength> extends true
    ? IfEqual<Length<TEvaluate>, TLength, IF, ELSE>
    : MAYBE
  : TEvaluate extends unknown[]
    ? MAYBE
    : ELSE;


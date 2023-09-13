import { Length, IfEqual, IsLiteral, Container } from "../..";


/**
 * **IfLength**`<TEvaluate,TLength,IF,[ELSE],[MAYBE]>`
 * 
 * Type utility which returns type `IF` when `TEvaluate` evaluates to being 
 * a length of `TLength`. It returns type `ELSE` if it can determine the length
 * at design time and otherwise returns `MAYBE`.
 * 
 * - the `ELSE` type will default to `TEvaluate` by default
 * - the `MAYBE` type will default to `IF | ELSE` by default
 * - If a _non-array_ type is passed into `TEvaluate` then utility will result `ELSE`
 * type.
 */
export type IfLength<
  TEvaluate extends Container, 
  TLength extends number,
  IF,
  ELSE = TEvaluate,
  MAYBE = IF | ELSE
> = TEvaluate extends readonly unknown[]
  ? IsLiteral<TLength> extends true
    ? IfEqual<Length<TEvaluate>, TLength, IF, ELSE>
    : MAYBE
  : TEvaluate extends unknown[]
    ? MAYBE
    : ELSE;

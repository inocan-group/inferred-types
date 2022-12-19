import { Length } from "src/types";
import { IfEqual, IsLiteral } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";

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
  TEvaluate extends any | any[] | readonly any[], 
  TLength extends number, 
  IF extends Narrowable,
  ELSE extends Narrowable,
  MAYBE extends Narrowable = ELSE
> = TEvaluate extends readonly any[]
  ? IsLiteral<TLength> extends true
    ? IfEqual<Length<TEvaluate>, TLength, IF, ELSE>
    : MAYBE
  : TEvaluate extends any[]
    ? MAYBE
    : ELSE;


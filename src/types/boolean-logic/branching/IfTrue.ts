import { IsTrue } from "src/types/index";

/**
 * **IfType**`<T,IF,ELSE>`
 * 
 * Type utility which checks for literal `true` value and then switches type
 * to the `IF` or `ELSE` generic types. 
 * 
 * Note: the wide _boolean_ type or any non-boolean type results in `ELSE`; 
 * if you are looking for different behavior consider `IfSoftTrue` instead.
 */
export type IfTrue<
  T,
  IF = T & true,
  ELSE = Exclude<T, true>
> = IsTrue<T> extends true ? IF : ELSE;

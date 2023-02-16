import { IsFalse } from "./IsFalse";

/**
 * **IfFalse**`<T, IF, ELSE>`
 * Type utility which checks for literal `false` value and then switches
 * the  type accordingly to the `IF` or `ELSE` types.
 * 
 * Note: the wide _boolean_ type or any non-boolean type results in false / `ELSE`; 
 * if you are looking for different behavior consider `IfSoftTrue` instead
 */
export type IfFalse<
  T,
  IF,
  ELSE,
> = IsFalse<T> extends true ? IF : ELSE;

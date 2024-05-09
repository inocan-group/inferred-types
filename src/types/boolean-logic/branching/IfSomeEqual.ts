import { SomeEqual } from "src/types/index";

/**
 * **IfSomeEqual**`<TList, TValue, IF, ELSE>`
 * 
 * A type utility which evaluates whether `TValue` is equal to any of the values in
 * `TList` and if so then it returns `IF` otherwise `ELSE`.
 * 
 * - by default `IF` is **true** and `ELSE` is **false**
 */
export type IfSomeEqual<
  TList extends readonly unknown[],
  TValue, 
  IF = true,
  ELSE = false
> = SomeEqual<TList, TValue> extends true ? IF : ELSE;

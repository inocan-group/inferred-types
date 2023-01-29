import { SomeEqual } from "./SomeEqual";
import { Narrowable } from "../literals";

/**
 * **IfSomeEqual**`<Value, CompareTo, IF, ELSE>`
 * 
 * A type utility which evaluates whether `Value` is equal to any of the values in
 * `CompareTo` and if so then it returns `IF` otherwise `ELSE`.
 */
export type IfSomeEqual<
  Value extends Narrowable, 
  CompareTo extends readonly any[],
  IF,
  ELSE
> = SomeEqual<Value, CompareTo> extends true ? IF : ELSE;

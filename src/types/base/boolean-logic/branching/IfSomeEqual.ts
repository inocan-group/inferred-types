import { SomeEqual } from "../..";

/**
 * **IfSomeEqual**`<Value, CompareTo, IF, ELSE>`
 * 
 * A type utility which evaluates whether `Value` is equal to any of the values in
 * `CompareTo` and if so then it returns `IF` otherwise `ELSE`.
 */
export type IfSomeEqual<
  Value, 
  CompareTo extends readonly unknown[],
  IF,
  ELSE
> = SomeEqual<Value, CompareTo> extends true ? IF : ELSE;

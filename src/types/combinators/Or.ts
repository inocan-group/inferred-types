import { IfTrue, NarrowlyContains } from "../boolean-logic";

/**
 * **Or**`<T>`
 *
 * Takes an array of boolean values and produces a boolean OR across these values
 */
export type Or<T extends readonly boolean[]> = NarrowlyContains<true, T> extends true
  ? true
  : NarrowlyContains<boolean, T> extends true
  ? boolean
  : false;

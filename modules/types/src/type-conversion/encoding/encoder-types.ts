/**
 * **StringEncoder**
 *
 * A base type for _string encoders_ which take a string and convert
 * to anther type of string.
 */
export type StringEncoder<R extends string = string> = <
  T extends string
>(input: T) => R

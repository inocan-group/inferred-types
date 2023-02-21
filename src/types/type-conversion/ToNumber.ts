/**
 * **ToNumber**`<T>`
 * 
 * Converts a numeric string literal to the numeric equivalent.
 * 
 * - will also receive numbers and proxy them through "as is"
 */
export type ToNumber<S extends string | number> = S extends number
  ? S
  : S extends `${infer N extends number}` 
  ? N 
  : never;


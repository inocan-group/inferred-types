import type { AsString, Tuple } from "inferred-types/types";

/**
 * **ToStringArray**`<T>`
 *
 * Receives a tuple of values and converts each item
 * into a _string_ value using the `ToString<T>` utility.
 */
export type ToStringArray<T extends Tuple> = {
  [K in keyof T]: AsString<T[K]>
} extends readonly string[]
  ? {
      [K in keyof T]: AsString<T[K]>
    }
  : never;

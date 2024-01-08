import { IfUndefined } from "..";

/**
 * **AsArray**`<T>`
 * 
 * Type utility which ensures that `T` is an array by
 * encapsulating it as a single item array if it is a
 * non-array type.
 * 
 * **Related:** `
 */
export type AsArray<T> = T extends unknown[]
  ? T
  : T extends readonly unknown[]
    ? T extends (readonly unknown[] | [readonly unknown[]])
      ? [readonly unknown[]]
      : Readonly<T>
    : IfUndefined<T, [], [T]>;

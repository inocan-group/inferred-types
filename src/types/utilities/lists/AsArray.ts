import { IfUndefined } from "src/types";

/**
 * **AsArray**`<T>`
 * 
 * Type utility which ensures that `T` is an array by
 * encapsulating it as a single item array if it is a
 * non-array type.
 */
export type AsArray<T> = T extends unknown[]
  ? T
  : T extends readonly unknown[]
    ? Readonly<T>
    : IfUndefined<T, [], [T]>;

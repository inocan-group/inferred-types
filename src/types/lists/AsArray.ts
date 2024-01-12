import { IfUndefined, Tuple } from "src/types";

/**
 * **AsArray**`<T>`
 * 
 * Type utility which ensures that `T` is an array by
 * encapsulating it as a single item array if it is a
 * non-array type.
 */
export type AsArray<T> = T extends Tuple
    ? T
    : T extends unknown[]
      ? readonly [...T]
      : IfUndefined<T,  [],  [T]>;

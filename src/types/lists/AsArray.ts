import { If,  IsUndefined, Tuple } from "src/types/index";

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
      : If<IsUndefined<T>,  [],  [T]>;

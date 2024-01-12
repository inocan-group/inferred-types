import { IfUndefined, Tuple } from "src/types";

/**
 * **AsTuple**`<T>`
 * 
 * Type utility which ensures that `T` is tuple value
 * encapsulating it as a single item array if it is a
 * non-array type.
 * 
 * **Related:** `AsArray`
 */
export type AsTuple<T> = T extends Tuple
    ? T
    : T extends unknown[]
      ? readonly [...T]
      : IfUndefined<T, readonly [], readonly [T]>;

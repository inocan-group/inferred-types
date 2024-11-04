import {  Tuple, If, IsUndefined } from "src/types/index";

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
      : If<IsUndefined<T>, readonly [], readonly [T]>;

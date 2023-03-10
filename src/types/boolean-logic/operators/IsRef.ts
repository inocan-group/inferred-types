import { IfLength, Keys } from "src/types";

/**
 * **IsRef**`<T>`
 * 
 * Boolean type utility that detects whether the type passed in
 * is a VueJS `Ref<...>` type.
 * 
 * **Note:** if `T` is a _wide_ Object type then `boolean` will be returned
 * as we can't make enough of a judgement on whether it is reference or
 * not.
 */
export type IsRef<T> = T extends { value: unknown } 
  ? IfLength<Keys<T>, 2,  true, false> // "value" and unique symbol
  : false;

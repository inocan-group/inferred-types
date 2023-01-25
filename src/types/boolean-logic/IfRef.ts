import { Keys } from "../Keys";
import { Narrowable } from "../literals/Narrowable";
import { IfLength } from "./IfLength";

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
export type IsRef<T> = T extends { value: any } 
  ? IfLength<Keys<T>, 2,  true, false> // "value" and unique symbol
  : false;

/**
 * **IfRef**`<T,IF,ELSE,[MAYBE]>`
 * 
 * Conditional type utility that reacts to whether `T` _is_ or _is not_ a
 * VueJS `Ref` type.
 */

export type IfRef<
  T,
  IF extends Narrowable,
  ELSE extends Narrowable,
  MAYBE extends Narrowable = IF | ELSE
> = IsRef<T> extends true ? IF : IsRef<T> extends false ? ELSE : MAYBE;

import { Narrowable } from "../Narrowable";
import { UnionToTuple } from "../type-conversion/UnionToTuple";
import { IfLength } from "./IfLength";

/**
 * **IsUnion**`<T>`
 * 
 * Type utility which returns a boolean flag indicating whether the 
 * given `T` is typed as a _union_ type.
 */
export type IsUnion<T> = IfLength<UnionToTuple<T>, 1, false, true>;


/**
 * **IfUnion**`<T,IF,ELSE>`
 * 
 * Type branching utility based on whether type `T` is a union type
 */
export type IfUnion<
  T,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsUnion<T> extends true ? IF : ELSE;
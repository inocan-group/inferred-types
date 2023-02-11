import { UnionToTuple } from "../type-conversion/UnionToTuple";
import { IfLength } from "./IfLength";

/**
 * **IsUnion**`<T>`
 * 
 * Type utility which returns a boolean flag indicating whether the 
 * given `T` is typed as a _union_ type.
 */
export type IsUnion<T> = IfLength<
  UnionToTuple<T>, 
  1, 
  false, 
  IfLength<UnionToTuple<T>, 0, false, true>
>;

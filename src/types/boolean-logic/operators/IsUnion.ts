import { UnionToTuple } from "src/types/type-conversion";
import { IfLength, IfNever } from "src/types/boolean-logic";

/**
 * **IsUnion**`<T>`
 * 
 * Type utility which returns a boolean flag indicating whether the 
 * given `T` is typed as a _union_ type.
 */
export type IsUnion<T> = IfNever<T, never, IfLength<
  UnionToTuple<T>, 
  1, 
  false, 
  IfLength<UnionToTuple<T>, 0, false, true>
>>;

import { UnionToTuple , IsNever,  IsEqual } from "src/types/index";


/**
 * **IsUnion**`<T>`
 * 
 * Type utility which returns a boolean flag indicating whether the 
 * given `T` is typed as a _union_ type.
 */
export type IsUnion<T> = [IsNever<UnionToTuple<T>>] extends [true]
? false
: IsEqual<T, boolean> extends true
? false
: UnionToTuple<T>["length"] extends 1
  ? false
  : true;



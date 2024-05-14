import { UnionToTuple , IsNever, IsWideType } from "src/types/index";

type ProcessLength<
  T extends number
> = T extends 1
  ? false
  : T extends 0
  ? false
  : true;

/**
 * **IsUnion**`<T>`
 * 
 * Type utility which returns a boolean flag indicating whether the 
 * given `T` is typed as a _union_ type.
 */
export type IsUnion<T> = [IsNever<UnionToTuple<T>>] extends [true]
? false
: [IsWideType<T>] extends [true]
? false
: UnionToTuple<T> extends readonly unknown[]
  ? UnionToTuple<T>["length"] extends number
    ? ProcessLength<UnionToTuple<T>["length"]>
    : never
  : false;

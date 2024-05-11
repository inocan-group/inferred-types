import {  If, IsUnion, RetainWideTypes, UnionToTuple } from "../..";


type Process<T> = UnionToTuple<T> extends readonly unknown[]
? RetainWideTypes<UnionToTuple<T>>["length"] extends UnionToTuple<T>["length"]
  ? true
  : false
: never;

/**
 * **IsWideUnion**`<T>`
 * 
 * Boolean utility which checks whether `T` is both a _union type_
 * and that it's elements are all considered _wide types_.
 * 
 * **Related:** `IsNonLiteralUnion`
 */
export type IsWideUnion<
  T> = If<
  IsUnion<T>,
  Process<T>,
  false
>

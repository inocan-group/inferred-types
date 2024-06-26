import {  
  IsUnion, 
  IsWideType, 
  UnionToTuple 
} from "src/types/index";

type Process<
  T extends readonly unknown[]
> = {
  [K in keyof T]: IsWideType<T[K]>
}

/**
 * **IsWideUnion**`<T>`
 * 
 * Boolean utility which checks whether `T` is both a _union type_
 * and that it's elements are all considered _wide types_.
 * 
 * **Related:** `IsNonLiteralUnion`
 */
export type IsWideUnion<T> = [IsUnion<T>] extends [true]
? [Process<UnionToTuple<T>>] extends [readonly true[]]
  ? true
  : false
: false;

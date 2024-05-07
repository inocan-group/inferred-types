/* eslint-disable @typescript-eslint/no-explicit-any */
import {   AfterFirst, And, DoesExtend, First, If, IfNever, IfOr,  IsArray,  IsBoolean,  IsBooleanLiteral,  IsEqual, IsTuple, IsUnion, KV,  Not,  ObjectKey,  Or,  UnionToTuple } from "src/types/index";


type IsWide<T> = IfNever<
  T,
  false,
  IfOr<
    [
      IsEqual<T,string>, IsEqual<T,number>, IsEqual<T,object>,
      And<[ IsBoolean<T>, Not<IsBooleanLiteral<T>>]>,
      And<[ IsArray<T>, Not<IsTuple<T>>]>, 
      And<[ 
        DoesExtend<T,KV>, 
        Or<[ IsEqual<keyof T, never>, DoesExtend<ObjectKey, keyof T> ]> 
      ]>
    ],
    true,
    false
  >
>


type IsWideUnion<
  T extends readonly unknown[],
> = [] extends T
? true
: If<
  IsWide<First<T>>,
  IsWideUnion<AfterFirst<T>>,
  false
>

/**
 * **IsWideType**`<T>`
 * 
 * Identifies types which are "wide" (and have a narrow variant):
 * 
 * - string, number, and boolean types
 * - `string[]`, `number[]` array types
 * - union types who's elements are all wide too
 * 
 * **Note:** types such as `null` and `undefined` are **not** considered
 * wide.
 */
export type IsWideType<T> = 
IfNever<
  T,
  false,
  IsUnion<T> extends true
    ? IsWideUnion<UnionToTuple<T>> extends true
      ? true
      : false
    : IsWide<T>
>;



/* eslint-disable @typescript-eslint/no-explicit-any */
import {  ErrorCondition,   IfNever,  IsArray,    IsEqual,   IsObjectLiteral, IsTuple, IsWideUnion,  KV, ProxyError, Throw } from "src/types/index";

type IsWide<T> = 
[IsEqual<T, boolean>] extends [true]
    ? true
  : [IsEqual<T, object>] extends [true]
    ? true
  : [IsEqual<T, KV>] extends [true]
    ? true
  : [IsEqual<T, string>] extends [true]
    ? true
  : [IsEqual<T, number>] extends [true]
    ? true
  : [IsEqual<T, symbol>] extends [true]
    ? true
  : [IsArray<T>] extends [true]
    ? [IsTuple<T>] extends [false]
      ? true
      : false
  : T extends KV
    ? IsObjectLiteral<T> extends true
      ? false
      : true
  : IsWideUnion<T> extends true
      ? true
  : false;


type InvalidNever = Throw<
  "invalid-never",
  `The value of T when calling IsWideType<T> was "never" which makes the comparison invalid! If you want prefer to instead allow this condition then set the TNever generic to true or false depending on your preferred outcome`,
  "IsWideType",
  { library: "inferred-types"}
>

/**
 * **IsWideType**`<T, [TNever]>`
 * 
 * Identifies types which are "wide" (and have a narrow variant):
 * 
 * - string, number, and boolean types
 * - `string[]`, `number[]` array types
 * - does _not_ include wide union types; use `IsWideUnion` for this
 * 
 * **Note:** 
 * - types such as `null` and `undefined` are **not** considered
 * wide.
 * - If the `T` passed in is _never_ the result of this operation is
 * ErrorCondition<"invalid-never"> but this can be made into whatever
 * you like by setting the `TNever` generic.
 * - If an ErrorCondition is in `T` then it will be bubbled up
 */
export type IsWideType<
  T,
  TNever = InvalidNever
> = IfNever<
  T,
  TNever,
  [IsWide<T>] extends [true]
      ? true
      : [T] extends [ErrorCondition]
        ? ProxyError<T, "IsWideType">
        : false
>;



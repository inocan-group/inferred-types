/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject, Keys, AfterFirst, First, Length, IsEqual, IfOr, IsEmptyObject, IfObjectLiteral } from "src/types";

type Values<
  TObj extends AnyObject,
  TKeys extends PropertyKey,
  TResults extends readonly any[] = []
> = 

//
Length<TKeys> extends 0
  ? TResults
  : ValuesAcc<
      TObj,
      AfterFirst<TKeys>,
      [
        ...TResults, 
        First<TKeys> extends keyof TObj
          ? TObj[First<TKeys>]
          : never
      ]
    >;





/**
 * **ObjValues**`<T>`
 * 
 * Type utility which converts an object to a tuple of _values_.
 * 
 * - if the object is an object literal, it will convert to a readonly array
 * - if not a literal, type will be approximated where possible or default to `any[]`.
 * - please note that the array's _order_ is **not** guaranteed as an object's properties
 * has no order.
 */
export type ObjValues<
  T extends AnyObject
> = IfOr<
  [IsEqual<T,{}>, IsEqual<T,[]>, IsEmptyObject<T>],
  readonly [],
  IfObjectLiteral<
    T,
    Values<
      T, 
      AsPropertyKeyK<Keys<T>>
    >,
    T
  >
>;

/* eslint-disable @typescript-eslint/ban-types */
import { AnyObject, Keys,  IsEqual, IfOr, IsEmptyObject, IfObjectLiteral, AsRecord } from "src/types/index";

type Values<
  TObj extends AnyObject,
  TKeys extends readonly PropertyKey[]
> = {
  [K in keyof TKeys]: K extends keyof TObj ? TObj[K] : never
}


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
      Keys<AsRecord<T>>
    >,
    T
  >
>;

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject,IfEqual, IfLength, IfLiteral, Keys, AfterFirst, First, Length, Reverse, IfEmptyContainer, IsEqual, IfOr } from "src/types";

type ValuesAcc<
  TObj extends AnyObject,
  TKeys extends readonly PropertyKey[],
  TResults extends readonly any[] = []
> = //
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
 * Type utility which converts an object to an array of values.
 * 
 * - if the object is an object literal, it will convert to a readonly array
 * - if not a literal, type will be approximated where possible or default to `any[]`.
 * - please note that the array's _order_ is **not** guaranteed as an object's properties
 * has no order.
 * 
 * **Related:** `Values`
 */
export type ObjValues<
  T extends AnyObject
> = IfOr<
  [IsEqual<T,{}>, IsEqual<T,[]>],
  readonly [],
  IfLiteral<
    T,
    // 
    IfEmptyContainer<
      T, 
      readonly [],
      Readonly<Reverse<ValuesAcc<T, Keys<T>>>>
    >,
    IfEqual<
      Record<string, string>, 
      string[],
      IfEqual<
        Record<string, number>,
        number[],
        IfEqual<
          Record<string, boolean>,
          boolean[],
          IfLength<Keys<T>, 0, readonly [], unknown[]>,
          unknown[]
        >
      >
    >
  >
>;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject } from "../base-types";
import {  IfEqual, IfLength, IfLiteral } from "../boolean-logic";
import { Keys } from "../dictionary/Keys";
import { AfterFirst, First } from "../lists";

type ValuesAcc<
  TObj extends AnyObject,
  TKeys extends readonly (keyof TObj)[],
  TResults extends readonly any[] = []
> = [] extends TKeys
  ? TResults
  : ValuesAcc<
      TObj,
      AfterFirst<TKeys>,
      readonly [...TResults, TObj[First<TKeys>]]
    >;

/**
 * **ObjValues**`<T>`
 * 
 * Type utility which converts an object to an array of values.
 * 
 * - if the object is an object literal, it will convert to a readonly array
 * - if not a literal, type will be approximated where possible or default to `any[]`.
 * 
 * **Related:** `Values`
 */
export type ObjValues<
  T extends AnyObject
> = IfLiteral<
  T,
  IfLength<Keys<T>, 0, readonly [], Readonly<ValuesAcc<T, Keys<T> & readonly (keyof T)[]>>>,
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
>;

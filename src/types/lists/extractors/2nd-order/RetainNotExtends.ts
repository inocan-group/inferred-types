
import { AnyObject } from "src/types/base-types";
import { Narrowable } from "src/types/literals";
import { KvDict, ObjectToKvDict } from "src/types/type-conversion";
import {  RetainFromList, KvDictExtractor } from "../RetainFromList";

/**
 * **RetainNotExtends**`<TList,TCompareTo>`
 * 
 * Type utility which filters the list `TList` and retains any elements
 * which _do not extend_ `CompareTo`.
 */
export type RetainNotExtends<
  TList extends unknown[] | readonly unknown[] | AnyObject,
  TCompareTo extends Narrowable
> = TList extends unknown[]
? RetainFromList<TList, "does-not-extend", TCompareTo>
: TList extends readonly unknown[]
  ? Readonly<RetainFromList<TList, "does-not-extend", TCompareTo>>
  : TList extends AnyObject
    ? ObjectToKvDict<TList> extends readonly KvDict[]
      ? KvDictExtractor<ObjectToKvDict<TList>, TCompareTo, "retain">
      : never
    : never;

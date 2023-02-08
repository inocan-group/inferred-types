import { AnyObject } from "../../../../types/boolean-logic";
import { Narrowable } from "../../../../types/literals/Narrowable";
import { KvDict } from "../../../../types/type-conversion/KvDict";
import { ObjectToKvDict } from "../../../../types/type-conversion/ObjectToKvDict";
import {  RetainFromList, KvDictExtractor } from "../RetainFromList";

/**
 * **RetainNotExtends**`<TList,TCompareTo>`
 * 
 * Type utility which filters the list `TList` and retains any elements
 * which _do not extend_ `CompareTo`.
 */
export type RetainNotExtends<
  TList extends any[] | readonly any[] | AnyObject,
  TCompareTo extends Narrowable
> = TList extends any[]
? RetainFromList<TList, "does-not-extend", TCompareTo>
: TList extends readonly any[]
  ? Readonly<RetainFromList<TList, "does-not-extend", TCompareTo>>
  : TList extends AnyObject
    ? ObjectToKvDict<TList> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TList>, TCompareTo, "retain">
      : never
    : never;

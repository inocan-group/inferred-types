import { AnyObject } from "src/types/boolean-logic";
import { Narrowable } from "src/types/literals/Narrowable";
import { KvDict } from "src/types/type-conversion/KvDict";
import { ObjectToKvDict } from "src/types/type-conversion/ObjectToKvDict";
import { ArrExtractor, KvDictExtractor } from "./extractor";

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
? ArrExtractor<TList, TCompareTo, "retain">
: TList extends readonly any[]
  ? readonly [...ArrExtractor<TList, TCompareTo, "retain">]
  : TList extends AnyObject
    ? ObjectToKvDict<TList> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TList>, TCompareTo, "retain">
      : never
    : never;

import { AnyObject } from "src/types/boolean-logic";
import { Narrowable } from "src/types/literals/Narrowable";
import { KvDict } from "src/types/type-conversion/KvDict";
import { ObjectToKvDict } from "src/types/type-conversion/ObjectToKvDict";
import { ArrExtractor, KvDictExtractor } from "./extractor";

/**
 * **RemoveNotExtends**`<TList, TCompare>`
 * 
 * Type utility which takes an list `TList` and removes all elements
 * which _do not extend_ `TCompare`.
 */
export type RemoveNotExtends<
  TList extends any[] | readonly any[] | AnyObject,
  TCompareTo extends Narrowable
> = TList extends any[]
? ArrExtractor<TList, TCompareTo, "remove">
: TList extends readonly any[]
  ? readonly [...ArrExtractor<TList, TCompareTo, "remove">]
  : TList extends AnyObject
    ? ObjectToKvDict<TList> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TList>, TCompareTo, "remove">
      : never
    : never;

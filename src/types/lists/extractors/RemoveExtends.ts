import { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "../../../types";
import { ArrExtractor, KvDictExtractor } from "./extractor";

/**
 * **RemoveExtends**`<TIterable, TCompare>`
 * 
 * Type utility which takes an iterable `TIterable` and removes all elements
 * which _extend_ `TCompare`.
 */
export type RemoveExtends<
  TIterable extends any[] | readonly any[] | AnyObject,
  TCompare extends Narrowable
> = TIterable extends any[]
? ArrExtractor<TIterable, TCompare, "remove">
: TIterable extends readonly any[]
  ? readonly [...ArrExtractor<TIterable, TCompare, "remove">]
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TIterable>, "remove">
      : never
    : never;

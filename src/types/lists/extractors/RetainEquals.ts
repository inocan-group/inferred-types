import { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "../../../types";
import { NarrowArrExtractor, NarrowObjExtractor } from "./extractor";

/**
 * **RetainEquals**`<TIterable, TCompare>`
 * 
 * Type utility which takes an iterable `TIterable` and removes all elements
 * except those which _equal_ `TCompare`.
 */
export type RetainEquals<
  TIterable extends any[] | readonly any[] | AnyObject,
  TCompare extends Narrowable
> = TIterable extends any[]
? NarrowArrExtractor<TIterable, TCompare, "retain">
: TIterable extends readonly any[]
  ? readonly [...NarrowArrExtractor<TIterable, TCompare, "retain">]
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? NarrowObjExtractor<ObjectToKvDict<TIterable>, "retain">
      : never
    : never;

import type { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "../../../types";
import { NarrowArrExtractor, NarrowObjExtractor } from "./extractor";

/**
 * **RemoveEquals**`<TIterable, TCompare>`
 * 
 * Type utility which takes an iterable `TIterable` and removes all elements
 * which _equal_ `TCompare`.
 */
export type RemoveEquals<
  TIterable extends any[] | readonly any[] | AnyObject,
  TCompare extends Narrowable
> = TIterable extends any[]
? NarrowArrExtractor<TIterable, TCompare, "remove">
: TIterable extends readonly any[]
  ? readonly [...NarrowArrExtractor<TIterable, TCompare, "remove">]
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? NarrowObjExtractor<ObjectToKvDict<TIterable>, "remove">
      : never
    : never;

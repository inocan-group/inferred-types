import { AnyObject } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";
import { KvPair } from "src/types/type-conversion/KvToObject";
import { ObjectToKv } from "src/types/type-conversion/ObjectToKv";
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
    ? ObjectToKv<TIterable> extends readonly KvPair<any, any>[]
      ? NarrowObjExtractor<ObjectToKv<TIterable>, "retain">
      : never
    : never;

import { AnyObject } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";
import { KvPair } from "src/types/type-conversion/KvToObject";
import { ObjectToKv } from "src/types/type-conversion/ObjectToKv";
import { ArrExtractor, ObjExtractor } from "./extractor";

/**
 * **RetainExtends**`<TIterable, TBase>`
 * 
 * Type utility which takes an _iterable_ `TIterable` and removes all elements
 * except those which _extend_ `TBase`.
 */
export type RetainExtends<
TIterable extends any[] | readonly any[] | AnyObject,
TCompare extends Narrowable
> = TIterable extends any[]
? ArrExtractor<TIterable, TCompare, "retain">
: TIterable extends readonly any[]
? readonly [...ArrExtractor<TIterable, TCompare, "retain">]
  : TIterable extends AnyObject
    ? ObjectToKv<TIterable> extends readonly KvPair<any, any>[]
      ? ObjExtractor<ObjectToKv<TIterable>, "retain">
      : never
    : never;
  
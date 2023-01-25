import { AnyObject } from "types/boolean-logic";
import { Narrowable } from "types/literals/Narrowable";
import { KvPair } from "types/type-conversion/KvToObject";
import { ObjectToKv } from "types/type-conversion/ObjectToKv";
import { ArrExtractor, ObjExtractor } from "./extractor";

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
    ? ObjectToKv<TIterable> extends readonly KvPair<any, any>[]
      ? ObjExtractor<ObjectToKv<TIterable>, "remove">
      : never
    : never;

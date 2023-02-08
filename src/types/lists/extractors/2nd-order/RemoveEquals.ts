import type { AnyObject , Narrowable , KvDict , ObjectToKvDict, NarrowObjExtractor } from "../../..";
import {  RemoveFromList } from "../RemoveFromList";

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
? RemoveFromList<TIterable, "equals", TCompare>
: TIterable extends readonly any[]
  ? Readonly<RemoveFromList<TIterable, "equals", TCompare>>
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? NarrowObjExtractor<ObjectToKvDict<TIterable>, "remove">
      : never
    : never;

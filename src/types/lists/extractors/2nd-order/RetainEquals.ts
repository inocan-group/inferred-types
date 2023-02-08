import { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "../../..";
import { RetainFromList, NarrowObjExtractor } from "../RetainFromList";

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
? RetainFromList<TIterable, "equals", TCompare>
: TIterable extends readonly any[]
  ? Readonly<RetainFromList<TIterable, "equals", TCompare>>
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? NarrowObjExtractor<ObjectToKvDict<TIterable>, "retain">
      : never
    : never;

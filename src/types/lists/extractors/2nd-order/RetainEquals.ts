import { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "src/types";
import { RetainFromList, NarrowObjExtractor } from "../RetainFromList";

/**
 * **RetainEquals**`<TIterable, TCompare>`
 * 
 * Type utility which takes an iterable `TIterable` and removes all elements
 * except those which _equal_ `TCompare`.
 */
export type RetainEquals<
  TIterable extends unknown[] | readonly unknown[] | AnyObject,
  TCompare extends Narrowable
> = TIterable extends unknown[]
? RetainFromList<TIterable, "equals", TCompare>
: TIterable extends readonly unknown[]
  ? Readonly<RetainFromList<TIterable, "equals", TCompare>>
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict[]
      ? NarrowObjExtractor<ObjectToKvDict<TIterable>, "retain">
      : never
    : never;

import { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "../../../types";
import { ArrExtractor, KvDictExtractor } from "./extractor";

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
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TIterable>, "retain">
      : never
    : never;
  
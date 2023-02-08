import { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "../../..";
import { RetainFromList, KvDictExtractor } from "../RetainFromList";

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
? RetainFromList<TIterable, "extends", TCompare>
: TIterable extends readonly any[]
? Readonly<RetainFromList<TIterable, "extends", TCompare>>
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TIterable>, "retain">
      : never
    : never;
  
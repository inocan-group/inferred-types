import { AnyObject , Narrowable , KvDict , ObjectToKvDict } from "src/types";
import { RetainFromList, KvDictExtractor } from "../RetainFromList";

/**
 * **RetainExtends**`<TIterable, TBase>`
 * 
 * Type utility which takes an _iterable_ `TIterable` and removes all elements
 * except those which _extend_ `TBase`.
 */
export type RetainExtends<
TIterable extends unknown[] | readonly unknown[] | AnyObject,
TCompare extends Narrowable
> = TIterable extends unknown[]
? RetainFromList<TIterable, "extends", TCompare>
: TIterable extends readonly unknown[]
? Readonly<RetainFromList<TIterable, "extends", TCompare>>
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict[]
      ? KvDictExtractor<ObjectToKvDict<TIterable>, "retain">
      : never
    : never;
  
import { AnyObject , Narrowable , KvDict , ObjectToKvDict, KvDictExtractor } from "../../..";
import { RemoveFromList } from "../RemoveFromList";

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
? RemoveFromList<TIterable, "extends", TCompare>
: TIterable extends readonly any[]
  ? Readonly<RemoveFromList<TIterable, "extends", TCompare>>
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TIterable>, "remove">
      : never
    : never;

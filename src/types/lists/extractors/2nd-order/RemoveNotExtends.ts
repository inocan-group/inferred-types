import type { 
  AnyObject, 
  Narrowable, 
  KvDict, 
  ObjectToKvDict,
  RemoveFromList,
  KvDictExtractor
} from "src/types";

/**
 * **RemoveNotExtends**`<TList, TCompare>`
 * 
 * Type utility which takes an list `TList` and removes all elements
 * which _do not extend_ `TCompare`.
 */
export type RemoveNotExtends<
  TList extends unknown[] | readonly unknown[] | AnyObject,
  TCompareTo extends Narrowable
> = TList extends unknown[]
? RemoveFromList<TList, "does-not-extend", TCompareTo>
: TList extends readonly unknown[]
  ? Readonly<RemoveFromList<TList, "does-not-extend", TCompareTo>>
  : TList extends AnyObject
    ? ObjectToKvDict<TList> extends readonly KvDict[]
      ? KvDictExtractor<ObjectToKvDict<TList>, TCompareTo, "remove">
      : never
    : never;

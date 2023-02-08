import type { 
  AnyObject, 
  Narrowable, 
  KvDict, 
  ObjectToKvDict,
  RemoveFromList,
  KvDictExtractor
} from "../../../../types";

/**
 * **RemoveNotExtends**`<TList, TCompare>`
 * 
 * Type utility which takes an list `TList` and removes all elements
 * which _do not extend_ `TCompare`.
 */
export type RemoveNotExtends<
  TList extends any[] | readonly any[] | AnyObject,
  TCompareTo extends Narrowable
> = TList extends any[]
? RemoveFromList<TList, "does-not-extend", TCompareTo>
: TList extends readonly any[]
  ? Readonly<RemoveFromList<TList, "does-not-extend", TCompareTo>>
  : TList extends AnyObject
    ? ObjectToKvDict<TList> extends readonly KvDict<any, any>[]
      ? KvDictExtractor<ObjectToKvDict<TList>, TCompareTo, "remove">
      : never
    : never;

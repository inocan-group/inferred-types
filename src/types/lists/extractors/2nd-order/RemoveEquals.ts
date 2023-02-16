import type { 
  AnyObject , 
  Narrowable , 
  KvDict , 
  ObjectToKvDict, 
  NarrowObjExtractor,
  RemoveFromList,
  Tuple
} from "src/types";

/**
 * **RemoveEquals**`<TIterable, TCompare>`
 * 
 * Type utility which takes an iterable `TIterable` and removes all elements
 * which _equal_ `TCompare`.
 */
export type RemoveEquals<
  TIterable extends Tuple | AnyObject,
  TCompare extends Narrowable
> = TIterable extends unknown[]
? RemoveFromList<TIterable, "equals", TCompare>
: TIterable extends readonly unknown[]
  ? Readonly<RemoveFromList<TIterable, "equals", TCompare>>
  : TIterable extends AnyObject
    ? ObjectToKvDict<TIterable> extends readonly KvDict[]
      ? NarrowObjExtractor<ObjectToKvDict<TIterable>, "remove">
      : never
    : never;

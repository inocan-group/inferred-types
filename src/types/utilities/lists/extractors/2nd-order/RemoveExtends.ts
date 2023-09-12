import { AnyObject , Narrowable ,  RemoveFromList, WithoutValue } from "src/types";

/**
 * **RemoveExtends**`<TIterable, TCompare>`
 * 
 * Type utility which takes an iterable `TIterable` and removes all elements
 * which _extend_ `TCompare`.
 */
export type RemoveExtends<
  TIterable extends unknown[] | readonly unknown[] | AnyObject,
  TCompare extends Narrowable
> = TIterable extends unknown[]
? RemoveFromList<TIterable, "extends", TCompare>
: TIterable extends readonly unknown[]
  ? Readonly<RemoveFromList<TIterable, "extends", TCompare>>
  : TIterable extends AnyObject
    ? WithoutValue<TIterable, TCompare>
    : never;

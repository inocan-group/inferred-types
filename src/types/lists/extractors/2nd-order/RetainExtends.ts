import {  KV, Narrowable ,  RetainFromList, WithValue,  } from "src/types/index";

/**
 * **RetainExtends**`<TIterable, TBase>`
 * 
 * Type utility which takes an _iterable_ `TIterable` and removes all elements
 * except those which _extend_ `TBase`.
 */
export type RetainExtends<
TIterable extends unknown[] | readonly unknown[] | KV,
TCompare extends Narrowable
> = TIterable extends unknown[]
? RetainFromList<TIterable, "extends", TCompare>
: TIterable extends readonly unknown[]
? Readonly<RetainFromList<TIterable, "extends", TCompare>>
  : TIterable extends KV
    ? WithValue<TIterable, TCompare>
    : never;
  
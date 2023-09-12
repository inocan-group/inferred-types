import { AnyObject , Narrowable , RetainFromList,  Container, KeysEqualValue } from "src/types";

/**
 * **RetainEquals**`<TIterable, TCompare>`
 * 
 * Type utility which takes an iterable `TIterable` and removes all elements
 * except those which _equal_ `TCompare`.
 */
export type RetainEquals<
  TIterable extends Container,
  TCompare extends Narrowable
> = TIterable extends unknown[]
? RetainFromList<TIterable, "equals", TCompare>
: TIterable extends readonly unknown[]
  ? Readonly<RetainFromList<TIterable, "equals", TCompare>>
  : TIterable extends AnyObject
    ? Pick<TIterable, KeysEqualValue<TIterable, TCompare>>
    : never;

import type { 
  AnyObject, 
  Narrowable, 
  RemoveFromList,
  Container,
  KeysWithoutValue
} from "src/types";

/**
 * **RemoveNotExtends**`<TList, TCompare>`
 * 
 * Type utility which takes an list `TList` and removes all elements
 * which _do not extend_ `TCompare`.
 */
export type RemoveNotExtends<
  TContainer extends Container,
  TCompareTo extends Narrowable
> = TContainer extends unknown[]
? RemoveFromList<TContainer, "does-not-extend", TCompareTo>
: TContainer extends readonly unknown[]
  ? Readonly<RemoveFromList<TContainer, "does-not-extend", TCompareTo>>
  : TContainer extends AnyObject
    ? Pick<TContainer, KeysWithoutValue<TContainer, TCompareTo>>
    : never;

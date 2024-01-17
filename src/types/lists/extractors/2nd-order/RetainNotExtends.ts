
import { AnyObject , Narrowable , RetainFromList, WithoutValue } from "src/types/index";


/**
 * **RetainNotExtends**`<TList,TCompareTo>`
 * 
 * Type utility which filters the list `TList` and retains any elements
 * which _do not extend_ `CompareTo`.
 */
export type RetainNotExtends<
  TList extends unknown[] | readonly unknown[] | AnyObject,
  TCompareTo extends Narrowable
> = TList extends unknown[]
? RetainFromList<TList, "does-not-extend", TCompareTo>
: TList extends readonly unknown[]
  ? Readonly<RetainFromList<TList, "does-not-extend", TCompareTo>>
  : TList extends AnyObject
    ? WithoutValue<TList, TCompareTo>
    : never;

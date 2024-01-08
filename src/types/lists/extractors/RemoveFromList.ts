import { 
  FilterOps,
  AfterFirst,
  First
, Narrowable , And, DoesExtend, IsEqual, IsNotEqual } from "../..";

/**
 * **RemoveNotExtends**`<TList,TCompareTo>`
 */
type RemoveNotExtends<
  TList extends unknown[] | readonly unknown[],
  TCompareTo, // what to extract
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TResults
  : And<[ DoesExtend<First<TList>, TCompareTo>, IsNotEqual<First<TList>, never>]> extends true
    ? RemoveNotExtends<AfterFirst<TList>, TCompareTo, [...TResults, First<TList>]>
    : RemoveNotExtends<AfterFirst<TList>, TCompareTo,  TResults>;

/**
 * **RemoveExtends**`<TList,TCompareTo>
 */
type RemoveExtends<
  TList extends unknown[] | readonly unknown[],
  TCompareTo, // what to extract
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TResults
  : First<TList> extends TCompareTo
    ? RemoveExtends<AfterFirst<TList>, TCompareTo,  TResults>
    : RemoveExtends<AfterFirst<TList>, TCompareTo,  [...TResults, First<TList>]>;

/**
 * **RemoveEquals**`<TList,TCompareTo>`
 */
type RemoveEquals<
TList extends unknown[] | readonly unknown[],
TCompareTo, // what to extract
TResults extends readonly unknown[] = []
> = [] extends TList
? TResults
: IsEqual<First<TList>, TCompareTo> extends true
  ? RemoveEquals<AfterFirst<TList>, TCompareTo, TResults>
  : RemoveEquals<AfterFirst<TList>, TCompareTo, [...TResults, First<TList>]>;

/**
 * **RemoveNotEqual**`<TList,TCompareTo,TOp>`
 */
type RemoveNotEqual<
  TList extends unknown[] | readonly unknown[],
  TCompareTo, // what to extract
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TResults
  : IsNotEqual<First<TList>, TCompareTo> extends true
    ? RemoveNotEqual<AfterFirst<TList>, TCompareTo, TResults>
    : RemoveNotEqual<AfterFirst<TList>, TCompareTo, [...TResults, First<TList>]>;

/**
 * **RemoveFromList**`<TList,TComparator,TCompareTo>`
 * 
 * A multifaceted type utility which reduces `TList` to a subset based on:
 * 
 * - each element in `TList` is compared to `TCompareTo`
 * - the `TOp` let's you determine whether a _match_ should "retain" or "remove" the value
 * - the `TComparator` let's you choose the logical operation to use for matching and defaults to `extends`. Logical operations available include:
 *    - `equals`, `not-equal`
 *    - `extends`, `does-not-extend`
 * - by default `TNever` is set to "remove" but can be set to "retain" if so desired
 */
export type RemoveFromList<
  TList extends unknown[] | readonly unknown[],
  TComparator extends FilterOps,
  TCompareTo extends Narrowable,
> = TList extends unknown[]
// array
? TComparator extends "extends"
  ? RemoveExtends<TList, TCompareTo>
  : TComparator extends "does-not-extend"
    ? RemoveNotExtends<TList, TCompareTo>
    : TComparator extends "equals"
      ? RemoveEquals<TList, TCompareTo>
      : TComparator extends "not-equal"
        ? RemoveNotEqual<TList, TCompareTo>
        : never
// readonly array
: TComparator extends "extends"
? Readonly<RemoveExtends<TList, TCompareTo>>
: TComparator extends "does-not-extend"
  ? Readonly<RemoveNotExtends<TList, TCompareTo>>
  : TComparator extends "equals"
    ? Readonly<RemoveEquals<TList, TCompareTo>>
    : TComparator extends "not-equal"
      ? Readonly<RemoveNotEqual<TList, TCompareTo>>
      : never;

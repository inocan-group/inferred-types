/* eslint-disable no-use-before-define */

import { 
  And, 
  DoesExtend, 
  IfArray, 
  IsEqual, 
  IsNotEqual, 
  SomeEqual,
  TupleToUnion,
  FilterOps,
  Narrowable,
  AfterFirst,
  First,
  NotEqual
} from "../..";

type Unionize<T> = T extends readonly unknown[] ? TupleToUnion<T> : T;

/**
 * **RetainFromList**`<TList,TComparator,TCompareTo>`
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
export type RetainFromList<
  TList extends unknown[] | readonly unknown[],
  TComparator extends FilterOps,
  TCompareTo extends Narrowable
> = TList extends unknown[]
// readonly list
? TComparator extends "extends(unionize)"
  ? RetainExtends<TList, Unionize<TCompareTo>>
: TComparator extends "extends"
  ? RetainExtends<TList, TCompareTo>
: TComparator extends "does-not-extend"
  ? RetainNotExtends<TList, TCompareTo>
: TComparator extends "does-not-extend(unionize)"
  ? RetainNotExtends<TList, Unionize<TCompareTo>>
: TComparator extends "equals"
  ? RetainEquals<TList, TCompareTo>
: TComparator extends "not-equal"
  ? RetainNotEqual<TList, TCompareTo>
  : never
// tuple; not explicitly readonly
: TComparator extends "extends(unionize)"
? Readonly<RetainExtends<TList, Unionize<TCompareTo>>>
: TComparator extends "extends"
? Readonly<RetainExtends<TList, TCompareTo>>
: TComparator extends "does-not-extend(unionize)"
? Readonly<RetainNotExtends<TList, Unionize<TCompareTo>>>
: TComparator extends "does-not-extend"
? Readonly<RetainNotExtends<TList, TCompareTo>>
: TComparator extends "equals"
? Readonly<RetainEquals<TList, TCompareTo>>
: TComparator extends "not-equal"
? Readonly<RetainNotEqual<TList, TCompareTo>>
: never;

/**
 * **RetainNotExtends**`<TList,TCompareTo>`
 */
type RetainNotExtends<
  TList extends unknown[] | readonly unknown[],
  TCompareTo, // what to extract
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TResults
  : First<TList> extends TCompareTo
    ? RetainNotExtends<AfterFirst<TList>, TCompareTo,  TResults>
    : RetainNotExtends<AfterFirst<TList>, TCompareTo,  
        [...TResults, First<TList>]
      >;

/**
 * **RetainExtends**`<TList,TCompareTo>`
 */
type RetainExtends<
  TList extends unknown[] | readonly unknown[],
  TCompareTo, // what to extract
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TResults
  : And<[DoesExtend<First<TList>, TCompareTo>, NotEqual<First<TList>, never>]> extends true
    ? RetainExtends<AfterFirst<TList>, TCompareTo,  [...TResults, First<TList>]>
    : RetainExtends<AfterFirst<TList>, TCompareTo,  TResults>;
   
    // Or<[ 
    //   And<[IsArray<TCompareTo>, SomeEqual<TCompareTo & readonly any[], First<TList>>]>,
    //   And<[Not<IsArray<TCompareTo>>, IsEqual<TCompareTo, First<TList>>]>
    // ]> extends true 


/**
 * **RetainEquals**`<TList,TCompareTo>`
 */
type RetainEquals<
  TList extends unknown[] | readonly unknown[],
  TCompareTo, // what to extract
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TResults
  : First<TList> extends never
    ? RetainEquals<AfterFirst<TList>, TCompareTo, TResults>
    : IfArray<
      TCompareTo,
      // TCompareTo is an array
      SomeEqual<First<TList>, TCompareTo & unknown[]> extends true
        ? RetainEquals<AfterFirst<TList>, TCompareTo, [...TResults, First<TList>]>
        : RetainEquals<AfterFirst<TList>, TCompareTo, TResults>,
      // TCompareTo is not an array
      IsEqual<First<TList>, TCompareTo> extends true
        ? RetainEquals<AfterFirst<TList>, TCompareTo, [...TResults, First<TList>]>
        : RetainEquals<AfterFirst<TList>, TCompareTo, TResults>
    >;

/**
 * **RetainNotEqual**`<TList,TCompareTo,TOp>`
 */
type RetainNotEqual<
  TList extends unknown[] | readonly unknown[],
  TCompareTo, // what to extract
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TResults
  : IsNotEqual<First<TList>, TCompareTo> extends true
  ? RetainNotEqual<
      AfterFirst<TList>, TCompareTo, 
      [...TResults, First<TList>]
    >
  : RetainNotEqual<
      AfterFirst<TList>, TCompareTo, 
      TResults
    >;

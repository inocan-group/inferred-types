/* eslint-disable no-use-before-define */
import { 
  FilterOps,
  ExtractorOp,
  AfterFirst,
  First
} from "../index";

import { Narrowable } from "../../literals";
import { 
  And, 
  DoesExtend, 
  IfArray, 
  IfEqual,  
  IsEqual, 
  IsNotEqual, 
  SomeEqual 
} from "../../boolean-logic";
import { KvDict, KvDictToObject, TupleToUnion } from "../../type-conversion";
import { NotEqual } from "@type-challenges/utils";

type Unionize<T> = T extends readonly any[] ? TupleToUnion<T> : T;

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
  TList extends any[] | readonly any[],
  TComparator extends FilterOps,
  TCompareTo extends Narrowable
> = TList extends any[]
// readonly list
? TComparator extends "extends"
  ? RetainExtends<TList, Unionize<TCompareTo>>
  : TComparator extends "does-not-extend"
    ? RetainNotExtends<TList, Unionize<TCompareTo>>
    : TComparator extends "equals"
      ? RetainEquals<TList, TCompareTo>
      : TComparator extends "not-equal"
        ? RetainNotEqual<TList, TCompareTo>
        : never
// tuple; not explicitly readonly
: TComparator extends "extends"
      ? Readonly<RetainExtends<TList, Unionize<TCompareTo>>>
      : TComparator extends "does-not-extend"
        ? Readonly<RetainNotExtends<TList, Unionize<TCompareTo>>>
        : TComparator extends "equals"
          ? Readonly<RetainEquals<TList, TCompareTo>>
          : TComparator extends "not-equal"
            ? Readonly<RetainNotEqual<TList, TCompareTo>>
            : never;

/**
 * **RetainNotExtends**`<TList,TCompareTo>`
 */
type RetainNotExtends<
  TList extends any[] | readonly any[],
  TCompareTo, // what to extract
  TResults extends readonly any[] = []
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
  TList extends any[] | readonly any[],
  TCompareTo, // what to extract
  TResults extends readonly any[] = []
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
  TList extends any[] | readonly any[],
  TCompareTo, // what to extract
  TResults extends readonly any[] = []
> = [] extends TList
  ? TResults
  : First<TList> extends never
    ? RetainEquals<AfterFirst<TList>, TCompareTo, TResults>
    : IfArray<
      TCompareTo,
      SomeEqual<First<TList>, TCompareTo & any[]> extends true
        ? RetainEquals<AfterFirst<TList>, TCompareTo, [...TResults, First<TList>]>
        : RetainEquals<AfterFirst<TList>, TCompareTo, TResults>,
      IsEqual<First<TList>, TCompareTo> extends true
        ? RetainEquals<AfterFirst<TList>, TCompareTo, [...TResults, First<TList>]>
        : RetainEquals<AfterFirst<TList>, TCompareTo, TResults>
    >;

/**
 * **RetainNotEqual**`<TList,TCompareTo,TOp>`
 */
type RetainNotEqual<
  TList extends any[] | readonly any[],
  TCompareTo, // what to extract
  TResults extends readonly any[] = []
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

/**
 * **KvDictExtractor**`<TKv, TCompareTo, TOp>`
 * 
 * Receives an tuple of `KvDict` definitions and then either _removes_ or _retains_ (based
 * on `TOp`) those elements which extends `TCompareTo`.
 * 
 * - `TOp` must be "remove" or "retain"
 */
export type KvDictExtractor<
  TKv extends readonly KvDict<any,any>[],
  TCompareTo,
  TOp extends ExtractorOp = "remove",
  TResults extends readonly KvDict<any, any>[] = []
> = [] extends TKv
  ? KvDictToObject<TResults>
  : IfEqual<
      TOp, "retain",
      // retain operation
      First<TKv>["value"] extends TCompareTo
        ? First<TKv>["value"] extends never
          ? KvDictExtractor<AfterFirst<TKv>, TCompareTo, TOp, TResults>
          : KvDictExtractor<AfterFirst<TKv>, TCompareTo, TOp, [...TResults, First<TKv>]>
        : KvDictExtractor<AfterFirst<TKv>, TCompareTo, TOp, TResults>,
      // remove operation
      First<TKv>["value"] extends TCompareTo
        ? KvDictExtractor<AfterFirst<TKv>, TCompareTo, TOp, TResults>
        : And<[DoesExtend<First<TKv>["value"], never>, DoesExtend<TCompareTo, never>]> extends true
          ? KvDictExtractor<AfterFirst<TKv>, TCompareTo, TOp, TResults>
          : KvDictExtractor<AfterFirst<TKv>, TCompareTo, TOp, [...TResults, First<TKv>]>
    >;

/**
 * **NarrowObjExtractor**`<TKv, TExtract, TOp, TResults>`
 */
export type NarrowObjExtractor<
  TKv extends readonly KvDict<any,any>[],
  TExtract,
  TOp extends ExtractorOp = "remove",
  TResults extends readonly KvDict<any, any>[] = []
> = [] extends TKv
  ? KvDictToObject<TResults>
  : IfEqual<
      TOp, "retain",
      // retain operation
      IsEqual<First<TKv>["value"], TExtract> extends true
        ? First<TKv>["value"] extends never
          ? KvDictExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
          : KvDictExtractor<AfterFirst<TKv>, TExtract, TOp, [...TResults, First<TKv>]>
        : KvDictExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>,
      // remove operation
      IsEqual<First<TKv>["value"], TExtract> extends true
        ? KvDictExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
        : And<[DoesExtend<First<TKv>["value"], never>, DoesExtend<TExtract, never>]> extends true
          ? KvDictExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
          : KvDictExtractor<AfterFirst<TKv>, TExtract, TOp, [...TResults, First<TKv>]>
    >;

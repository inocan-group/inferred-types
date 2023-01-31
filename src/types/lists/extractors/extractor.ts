import { KvDictToObject } from "src/types/type-conversion/KvDictToObject";
import { DoesExtend, IfEqual, IsEqual , And , KvDict } from "../../../types";
import { AfterFirst } from "../AfterFirst";
import { First } from "../First";

export type ExtractorOp = "retain" | "remove";

/**
 * **ArrExtractor**`<TList,TCompareTo,TOp>`
 * 
 * Retains or removes items in a list based on whether elements in
 * `TList` _extend_ `TCompareTo`.
 */
export type ArrExtractor<
  TList extends any[] | readonly any[],
  TCompareTo, // what to extract
  TOp extends ExtractorOp = "remove",
  TResults extends readonly any[] = []
> = [] extends TList
  ? TResults
  : IfEqual<
      TOp, "retain",
      // retain operation
      First<TList> extends TCompareTo
        ? First<TList> extends never
          ? ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>
          : ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, [...TResults, First<TList>]>
        : ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>,
      // remove operation
      First<TList> extends TCompareTo
        ? ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>
        : And<[DoesExtend<First<TList>, never>, DoesExtend<TCompareTo, never>]> extends true
            ? ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>
            : ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, [...TResults, First<TList>]>
      >;

/**
 * **NarrowArrExtractor**`<TList,TCompareTo,TOp>`
 * 
 * Retains or removes items in a list based on whether elements in
 * `TList` _equals_ `TCompareTo`.
 */
export type NarrowArrExtractor<
  TList extends any[] | readonly any[],
  TCompareTo, // what to extract
  TOp extends ExtractorOp = "remove",
  TResults extends readonly any[] = []
> = [] extends TList
  ? TResults
  : IfEqual<
      TOp, "retain",
      // retain operation
      IsEqual<First<TList>, TCompareTo> extends true
        ? First<TList> extends never
          ? ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>
          : ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, [...TResults, First<TList>]>
        : ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>,
      // remove operation
      IsEqual<First<TList>,TCompareTo> extends true
        ? ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>
        : And<[DoesExtend<First<TList>, never>, DoesExtend<TCompareTo, never>]> extends true
          ? ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, TResults>
          : ArrExtractor<AfterFirst<TList>, TCompareTo, TOp, [...TResults, First<TList>]>
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

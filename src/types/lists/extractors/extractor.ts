import { DoesExtend, IfEqual, IsEqual } from "src/types/boolean-logic";
import { And } from "src/types/boolean-logic/And";
import { KvPair, KvToObject } from "src/types/type-conversion/KvToObject";
import { AfterFirst } from "../AfterFirst";
import { First } from "../First";

export type ExtractorOp = "retain" | "remove";


export type ArrExtractor<
  TList extends any[] | readonly any[],
  TExtract, // what to extract
  TOp extends ExtractorOp = "remove",
  TResults extends readonly any[] = []
> = [] extends TList
  ? TResults
  : IfEqual<
      TOp, "retain",
      // retain operation
      First<TList> extends TExtract
        ? First<TList> extends never
          ? ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>
          : ArrExtractor<AfterFirst<TList>, TExtract, TOp, [...TResults, First<TList>]>
        : ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>,
      // remove operation
      First<TList> extends TExtract
        ? ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>
        : And<[DoesExtend<First<TList>, never>, DoesExtend<TExtract, never>]> extends true
            ? ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>
            : ArrExtractor<AfterFirst<TList>, TExtract, TOp, [...TResults, First<TList>]>
      >;

export type NarrowArrExtractor<
  TList extends any[] | readonly any[],
  TExtract, // what to extract
  TOp extends ExtractorOp = "remove",
  TResults extends readonly any[] = []
> = [] extends TList
  ? TResults
  : IfEqual<
      TOp, "retain",
      // retain operation
      IsEqual<First<TList>, TExtract> extends true
        ? First<TList> extends never
          ? ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>
          : ArrExtractor<AfterFirst<TList>, TExtract, TOp, [...TResults, First<TList>]>
        : ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>,
      // remove operation
      IsEqual<First<TList>,TExtract> extends true
        ? ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>
        : And<[DoesExtend<First<TList>, never>, DoesExtend<TExtract, never>]> extends true
          ? ArrExtractor<AfterFirst<TList>, TExtract, TOp, TResults>
          : ArrExtractor<AfterFirst<TList>, TExtract, TOp, [...TResults, First<TList>]>
      >;

/**
 * **ObjExtractor**`<TKv, TExtract, TOp, TResults>`
 */
export type ObjExtractor<
  TKv extends readonly KvPair<any,any>[],
  TExtract,
  TOp extends ExtractorOp = "remove",
  TResults extends readonly KvPair<any, any>[] = []
> = [] extends TKv
  ? KvToObject<TResults>
  : IfEqual<
      TOp, "retain",
      // retain operation
      First<TKv>["value"] extends TExtract
        ? First<TKv>["value"] extends never
          ? ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
          : ObjExtractor<AfterFirst<TKv>, TExtract, TOp, [...TResults, First<TKv>]>
        : ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>,
      // remove operation
      First<TKv>["value"] extends TExtract
        ? ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
        : And<[DoesExtend<First<TKv>["value"], never>, DoesExtend<TExtract, never>]> extends true
          ? ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
          : ObjExtractor<AfterFirst<TKv>, TExtract, TOp, [...TResults, First<TKv>]>
    >;

/**
 * **NarrowObjExtractor**`<TKv, TExtract, TOp, TResults>`
 */
export type NarrowObjExtractor<
  TKv extends readonly KvPair<any,any>[],
  TExtract,
  TOp extends ExtractorOp = "remove",
  TResults extends readonly KvPair<any, any>[] = []
> = [] extends TKv
  ? KvToObject<TResults>
  : IfEqual<
      TOp, "retain",
      // retain operation
      IsEqual<First<TKv>["value"], TExtract> extends true
        ? First<TKv>["value"] extends never
          ? ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
          : ObjExtractor<AfterFirst<TKv>, TExtract, TOp, [...TResults, First<TKv>]>
        : ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>,
      // remove operation
      IsEqual<First<TKv>["value"], TExtract> extends true
        ? ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
        : And<[DoesExtend<First<TKv>["value"], never>, DoesExtend<TExtract, never>]> extends true
          ? ObjExtractor<AfterFirst<TKv>, TExtract, TOp, TResults>
          : ObjExtractor<AfterFirst<TKv>, TExtract, TOp, [...TResults, First<TKv>]>
    >;

import { Marked } from "inferred-types/constants";
import type {
    Compare,
    ComparisonAccept,
    ComparisonLookup,
    ComparisonOperation,
    GetComparisonParamInput,
    RemoveMarked,
} from "inferred-types/types";

type ProcessFalsyRecursive<
    TList extends readonly unknown[],
    TResult extends readonly unknown[] = []
> = TList extends readonly [infer THead, ...infer TTail]
    ? [THead] extends [null]
        ? ProcessFalsyRecursive<TTail, [...TResult, THead]>
        : [THead] extends [undefined] 
            ? ProcessFalsyRecursive<TTail, [...TResult, THead]>
            : [THead] extends [false]
                ? ProcessFalsyRecursive<TTail, [...TResult, THead]>
                : [THead] extends [0]
                    ? ProcessFalsyRecursive<TTail, [...TResult, THead]>
                    : [THead] extends [""]
                        ? ProcessFalsyRecursive<TTail, [...TResult, THead]>
                        : ProcessFalsyRecursive<TTail, TResult>
    : TResult;

type Process<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = TOp extends "falsy"
    ? ProcessFalsyRecursive<TList>
    : RemoveMarked<{
        [K in keyof TList]: Compare<TList[K], TOp, TParams> extends true
            ? TList[K]
            : Marked
    }>;

/**
 * **Filter**`<TList, TOp, TFilter>`
 *
 * Allows a known tuple `TList` to be reduced to just those elements which
 * _extend_ type `TFilter`.
 *
 * - `TFilter` can be single value, an array of values, or even no values at all
 * - the number of parameters is dictated by the operation
 * - if _either_ zero or one parameters are required you may also just
 * express the first parameter outside of array syntax.
 *
 * **Related:** `NotFilter`
 *
 * ```ts
 * // [1,2,3]
 * type Num = Filter<[1,2,3,"foo","bar"], "extends", number>;
 * ```
 */
export type Filter<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends GetComparisonParamInput<TOp>
> = Process<
    TList,
    TOp,
    TParams
>;



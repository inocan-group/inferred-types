import type {
    Compare,
    RemoveNever,
    ComparisonOperation,
    ComparisonLookup,
    ComparisonAccept,
    GetComparisonParamInput,
    ComparisonInputDefault,
    ComparisonInputToTuple,
    Err
} from "inferred-types/types";



type Process<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = RemoveNever<{
    [K in keyof TList]: Compare<TList[K], TOp, TParams> extends true
        ? never
        : TList[K]
}>;


/**
 * **NotFilter**`<TList, TOp, TFilter>`
 *
 * Performs the same task as `Filter` but with the opposite results.
 *
 * - when elements are evaluated to `true` on their comparison operation
 * they are _removed_
 *
 * **Related:** `Filter`
 *
 * ```ts
 * // ["foo","bar"]
 * type NotNum = NotFilter<[1,2,3,"foo","bar"], "extends", number>;
 * ```
 */
export type NotFilter<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends GetComparisonParamInput<TOp> | Error = ComparisonInputDefault<TOp>
> = [TParams] extends [Error]
? TParams
: [ComparisonInputToTuple<TOp, TParams>] extends [ComparisonLookup[TOp]["params"]]

? Process<
    TList,
    TOp,
    ComparisonInputToTuple<TOp, TParams>
>

: [ComparisonInputToTuple<TOp, TParams>] extends [Error]
    ? ComparisonInputToTuple<TOp, TParams>
    : Err<
        `invalid-filter`,
        `The filter operation '${TOp}' received invalid parameters!`
    >;



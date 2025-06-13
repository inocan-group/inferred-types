import type {
    Compare,
    RemoveNever,
    ComparisonOperation,
    ComparisonLookup,
     ComparisonInputToTuple,
     GetComparisonParamInput,
     ComparisonAccept,
     Err,
     ComparisonInputDefault,
} from "inferred-types/types";



type Process<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = RemoveNever<{
    [K in keyof TList]: Compare<TList[K], TOp, TParams> extends true
        ? TList[K]
        : never
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


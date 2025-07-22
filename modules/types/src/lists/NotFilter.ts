import { Marked } from "inferred-types/constants";
import type {
    Compare,
    ComparisonAccept,
    ComparisonLookup,
    ComparisonOperation,
    RemoveMarked,
    RemoveNever
} from "inferred-types/types";

type Process<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = RemoveMarked<{
    [K in keyof TList]: [Compare<TList[K], TOp, TParams>] extends [false]
            ? TList[K]
            : Marked
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
        TParams extends ComparisonLookup[TOp]["params"]
> = Process<
    TList,
    TOp,
    TParams
>;



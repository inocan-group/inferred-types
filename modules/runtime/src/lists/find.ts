import type {
    FindFunction,
    Narrowable,
    ComparisonLookup,
    ComparisonOperation
} from "inferred-types/types";
import { compare } from "inferred-types/runtime";



/**
 * **find**(op, ...params) => (value) => el | undefined
 *
 * A higher order function that allows _finding_ an element in a list
 * while preserving any available type information.
 */
export function find<
    const TOp extends ComparisonOperation,
    const TParams extends ComparisonLookup[TOp]["params"] & readonly Narrowable[]
>(
    op: TOp,
    ...params: TParams
): FindFunction<TOp, TParams> {
    return (list) => {
        return list.find(
            i => compare(op, params)(i)
        ) as ReturnType<FindFunction<TOp,TParams>>
    }
}

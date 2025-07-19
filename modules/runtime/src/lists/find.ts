import type {
    As,
    ComparisonAccept,
    ComparisonOperation,
    Find,
    FindFunction,
    GetComparisonParamInput,
    Suggest
} from "inferred-types/types";
import { compare } from "runtime/combinators";
import { err } from "runtime/errors";
import { isComparisonOperation } from "runtime/type-guards/comparison";

/**
 * **find**(op, ...params) => (value) => el | undefined
 *
 * A higher order function that allows _finding_ an element in a list
 * while preserving any available type information.
 */
export function find<
    const TOp extends Suggest<ComparisonOperation>,
    const TParams extends GetComparisonParamInput<TOp>
>(
    op: TOp,
    ...params: TParams
): FindFunction<TOp,TParams> {
    if(isComparisonOperation(op)) {
        return <const TList extends readonly ComparisonAccept<As<TOp, string>>[]>(
            list: TList
        ): Find<TList,TOp,TParams> => {
                    return list.find(
                    i => {
                        const comparator = compare(
                            op,
                            ...params
                        );

                        return comparator(i) as any;
                    }
                ) as unknown as Find<TList,As<TOp, string>,TParams>
            }
    }

    return err("invalid-operation") as unknown as FindFunction<TOp,TParams>;
}


import type {
    As,
    ComparisonAccept,
    ComparisonOperation,
    Find,
    GetComparisonParamInput,
    Suggest
} from "inferred-types/types";
import { compare, err } from "inferred-types/runtime";
import { isComparisonOperation } from "runtime/type-guards/comparison";

/**
 * **find**(op, ...params) => (value) => el | undefined
 *
 * A higher order function that allows _finding_ an element in a list
 * while preserving any available type information.
 */
export function find<
    const TOp extends Suggest<ComparisonOperation>,
    const TParams extends GetComparisonParamInput<As<TOp, ComparisonOperation>>
>(
    op: TOp,
    ...params: TParams
) {
    if(isComparisonOperation(op)) {
        return <const TList extends readonly ComparisonAccept<As<TOp, ComparisonOperation>>[]>(list: TList): Find<
                    TList,
                    As<TOp, ComparisonOperation>,
                    TParams
                > => {
                    return list.find(
                    i => {
                        const comparator = compare(op, ...params);

                        return comparator(i);
                    }
                ) as Find<
                    TList,
                    As<TOp, ComparisonOperation>,
                    TParams
                >
            }
    }

    throw err("invalid-operation")
}

const a = find("startsWith", "foo")(["bar", "foobar", 42]);



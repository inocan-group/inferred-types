import type {
    ComparisonOperation,
    Every,
    GetComparisonParams,
    Narrowable,
    ObjectKey,
    Values
} from "inferred-types/types";
import { filter, valuesOf } from "inferred-types/runtime";

export function every<
    const TOp extends ComparisonOperation,
    const TComparator extends GetComparisonParams<TOp>
>(
    op: TOp,
    comparator: TComparator
) {
    return <
        const TContainer extends Record<ObjectKey, N> | readonly N[],
        const N extends Narrowable,
    >(value: TContainer) => {
        const list = valuesOf(value);

        return list.every(i => filter(i, op, comparator)) as Every<Values<TContainer>, TOp, TComparator>;
    };
}

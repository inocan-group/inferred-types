import type {
    ComparisonAccept,
    ComparisonLookup,
    ComparisonOperation,
    Filter,
    FilterFn,
} from "inferred-types/types";
import {
    compare,
} from "inferred-types/runtime";


type Lookup = ComparisonLookup;


function filterFn<
    const TOp extends ComparisonOperation,
    const TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    params: TParams
): FilterFn<TOp,TParams> {
    return <const TList extends readonly ComparisonAccept<TOp>[]>(list: TList) => {
        return (
            list.filter((item) => {
                const result = compare(op, params)(item as any) as unknown as boolean;

                return result === true;
            })
        ) as Filter<
            TList,
            TOp,
            TParams
        >;
    };
}

/**
 * **filter**`(op, ...[params])` => (comparator) => boolean
 *
 * A set of filter functions which provide strong (and narrow)
 * typing support.
 *
 * - The first call sets up the filter operation and returns a
 * function which can be used as a filter
 * - the second call (aka, the actual filter function) will accept
 * either a singular element or an array of elements.
 *      - when passed a singular value it will return a boolean value
 *      which is determined at design time where possible
 *      - when passed a tuple then the filtered tuple is passed back
 *      and is typed at designed time where possible
 *
 * **Related:** `retain()`
 */
export function filter<
    const TOp extends ComparisonOperation,
    const TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    ...params: TParams
) {
    return filterFn(op, params);
}

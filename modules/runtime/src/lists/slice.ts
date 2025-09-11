import type { Narrowable, Slice, SliceArray } from "inferred-types/types";
import { isNumber } from "inferred-types/runtime";

/**
 * **slice**`(list, start, [length])`
 *
 * Runtime utility to slice an array while maintaining strong
 * types.
 *
 * - There are mild variations from the Javascript slice syntax:
 *     - the second (optional) parameter is "length" instead of index position
 *       - this makes using it much easier in most cases
 *     - you can use a _negative index_ for **start**
 */
export function slice<
    const TList extends readonly N[],
    N extends Narrowable,
    TStart extends number,
    TLen extends number | undefined,
>(
    list: TList,
    start: TStart,
    length: TLen = undefined as TLen,
) {
    const sliced: readonly unknown[] = isNumber(length)
        ? list.slice(start, length)
        : list.slice(start)

    return sliced as unknown as TLen extends number ? SliceArray<TList,TStart,TLen> : SliceArray<TList,TStart>
}



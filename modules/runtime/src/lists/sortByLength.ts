import type { SortByLength } from "inferred-types/types";

/**
 * sortByLength**`(arr)`
 *
 * Sorts the elements in the array from _longest_ to _shortest_
 * while maintaining literal types if provided..
 */
export function sortByLength<const T extends readonly string[]>(
    arr: T
): SortByLength<T> {
    const sorted = [...arr].sort((a, b) => b.length - a.length);

    return sorted as SortByLength<T>;
}

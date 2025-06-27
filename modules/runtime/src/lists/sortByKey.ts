import type {
    As,
    Dictionary,
    IsUnionArray,
    Narrowable,
    ObjectKey,
    SortByKey,
    SortByKeyOptions,
    UnionArrayToTuple
} from "inferred-types/types";

import { asArray } from "inferred-types/runtime";

/**
 * **sortByKey**`(items, key, config)`
 *
 * Sorts a tuple of Dictionary-based objects by the
 * specified key of these items.
 *
 * - you can pin to `start` or `end` of the tuple.
 */
export function sortByKey<
    T extends readonly Dictionary<ObjectKey, N>[],
    K extends ObjectKey,
    C extends SortByKeyOptions<CO>,
    CO extends ObjectKey,
    N extends Narrowable,
>(
    items: T,
    key: K,
    config: C
) {
    const o: { start: Narrowable[]; end: Narrowable[] } = {
        start: config.start ? asArray(config.start) : [],
        end: config.end ? asArray(config.end) : [],
    };

    const start = o.start.map((k) => {
        return items.find(i => i[key] === k);
    }) as any[];
    const end = o.end.map((k) => {
        return items.find(i => i[key] === k);
    }) as any[];

    const taken = [
        ...start,
        ...end
    ].map(i => i[key]) as any[];

    const remaining = items.filter(
        i => !taken.includes(i[key])
    ) as any[];

    return [
        ...start,
        ...remaining,
        ...end
    ] as unknown as SortByKey<
        T,
        K,

        As<{
            start: IsUnionArray<C["start"]> extends true
                ? UnionArrayToTuple<C["start"]>
                : C["start"];
            end: IsUnionArray<C["end"]> extends true
                ? UnionArrayToTuple<C["end"]>
                : C["end"];
        }, SortByKeyOptions>

    >;
}

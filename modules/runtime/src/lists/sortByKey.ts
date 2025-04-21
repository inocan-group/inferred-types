import {
    Dictionary,
    Narrowable,
    ObjectKey,
    SortByKey,
    SortByKeyOptions
} from "inferred-types/types";
import { asArray } from "inferred-types/runtime";

export function sortByKey<
    T extends readonly Dictionary<ObjectKey, N>[],
    K extends ObjectKey,
    C extends SortByKeyOptions<N>,
    N extends Narrowable
>(
    items: T,
    key: K,
    config: C
) {
    const o: { start: Narrowable[], end: Narrowable[] } = {
        start: config.start ? asArray(config.start) : [],
        end: config.end ? asArray(config.end) : [],
    }

    const start = items.filter(i =>  o.start.includes(i[key]) );
    const end = items.filter(i =>  o.end.includes(i[key]) );

    const taken = [
        ...start,
        ...end
    ].map(i => i.key) as N[] & ObjectKey[];

    const remaining = items.filter(
        i => taken.includes(i.key)
    );

    return [
        ...start,
        ...remaining,
        ...end
    ] as unknown as SortByKey<T, K, C>
}

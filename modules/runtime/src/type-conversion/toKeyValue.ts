import type {
    Narrowable,
    NarrowObject,
    ToKv,
    SortByKey,
    SortByKeyOptions,
    MergeObjects,
    As,
    Dictionary,
} from "inferred-types/types";
import { asArray, keysOf } from "inferred-types/runtime";

/**
 * **toKeyValue**`(obj)` -> tuple
 *
 * Converts an object into a tuple of `KeyValue` objects.
 *
 * - a Tuple representation benefits from two main things:
 *    - ensured **order**
 *    - it is an **iterable** structure
 * - narrow types are preserved whereever possible
 * - you may optionally position certain key's at the "top"
 * or "bottom" of the stack by using the sort callback.
 *
 * ```ts
 * // [
 * //   { key: "id", value: 123},
 * //   { key: "foo", value: 1 },
 * //   { key: "bar", value: 2 },
 * // ]
 * const rec = toKeyValue({foo: 1, bar: 2, id: 123 }, o => o.toTop("id"));
 * ```
 */
export function toKeyValue<
    TObj extends NarrowObject<O>,
    O extends Narrowable,
    S extends Narrowable,
    TSort extends SortByKeyOptions<S> | undefined = undefined,
    TSorted = SortByKey<
        ToKv<TObj>, "key",
        TSort extends undefined
            ? { start: [], end: []}
            : MergeObjects<{ start: [], end: [] }, As<TSort, Dictionary>>
    >
>(
    obj: TObj,
    sort: TSort = undefined as TSort,
): TSorted {
    const kv = keysOf(obj).map(
        k => ({ key: k, value: obj[k]})
    );

    const s = {
        start: sort?.start ? asArray(sort.start) : undefined,
        end: sort?.end ? asArray(sort?.end) : undefined,
    } satisfies SortByKeyOptions

    const start: readonly any[] = kv.filter(
        i =>  s.start?.includes(i["key"])
    );
    const end: readonly any[] = kv.filter(
        i =>  s.end?.includes(i["key"])
    );
    const taken = [
        ...start.map(i => i.key),
        ...end.map(i => i.key)
    ];
    const remaining = kv.filter(
        i => taken.includes(i.key) ? false : true
    )

    return [
        ...start,
        ...remaining,
        ...end
    ] as unknown as TSorted
}

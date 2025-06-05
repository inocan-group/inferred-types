import type {
    As,
    Dictionary,
    MergeObjects,
    Narrowable,
    NarrowObject,
    ObjectKey,
    SortByKey,
    SortByKeyOptions,
    ToKv,
} from "inferred-types/types";
import { asArray, keysOf, sortByKey } from "inferred-types/runtime";

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
    S extends ObjectKey,
    TSort extends SortByKeyOptions<S> | undefined = undefined,
    TSorted = SortByKey<
        ToKv<TObj>,
        "key",
        TSort extends undefined
            ? { start: []; end: [] }
            : MergeObjects<{ start: []; end: [] }, As<TSort, Dictionary>>
    >
>(
    obj: TObj,
    sort?: TSort,
): TSorted {
    const kv = keysOf(obj).map(
        k => ({ key: k, value: obj[k] })
    );

    const s = {
        start: sort?.start ? asArray(sort.start) : undefined,
        end: sort?.end ? asArray(sort?.end) : undefined,
    } satisfies SortByKeyOptions;

    return sortByKey(kv, "key", s) as unknown as TSorted;
}

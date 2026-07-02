import type {
    ObjectKey,
    ObjectKeys,
    SortByKey,
    SortByKeyOptions,
    ToKv,
} from "inferred-types/types";
import { sortByKey } from "inferred-types/runtime";

type KeyOfKv<TObj extends object> = ToKv<TObj>[number] extends {
    key: infer K extends PropertyKey;
}
    ? Extract<K, ObjectKey>
    : never;

type SortConfig<
    K extends PropertyKey,
    TSort extends SortByKeyOptions<K> | undefined,
> = TSort extends undefined
    ? { start: []; end: [] }
    : {
        start: TSort extends { start: infer S } ? S : [];
        end: TSort extends { end: infer E } ? E : [];
    };

/**
 * **toKeyValue**`(obj)` -> tuple
 *
 * Converts an object into a tuple of `KeyValue` objects.
 *
 * - a Tuple representation benefits from two main things:
 *    - ensured **order**
 *    - it is an **iterable** structure
 * - narrow types are preserved wherever possible
 * - you may optionally position certain key's at the "top"
 * or "bottom" of the stack by using the sort callback.
 *
 * ```ts
 * // [
 * //   { key: "id", value: 123},
 * //   { key: "foo", value: 1 },
 * //   { key: "bar", value: 2 },
 * // ]
 * const rec = toKeyValue({foo: 1, bar: 2, id: 123 }, { start: "id" });
 * ```
 */
export function toKeyValue<
    const TObj extends object,
    K extends KeyOfKv<TObj> = KeyOfKv<TObj>,
    const TSort extends SortByKeyOptions<K> | undefined = undefined,
    TSorted = SortByKey<
        ToKv<TObj>,
        "key",
        SortConfig<K, TSort>
    >
>(
    obj: TObj,
    sort?: TSort,
): TSorted {
    /**
     * an unsorted tuple of `KeyValue`'s
     */
    const kv = (Object.keys(obj) as ObjectKeys<TObj>).map(
        k => ({ key: k, value: obj[k as keyof TObj], required: true })
    );

    return sortByKey(kv, "key", sort || {}) as unknown as TSorted;
}

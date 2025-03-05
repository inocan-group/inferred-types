import type {
    AnyObject,
    EmptyObject,
    KeyValue,
    Narrowable,
    NarrowObject,
    Sort,
    SortOptions,
    StringKeys,
    ToKv,
} from "inferred-types/types";
import { sort } from "inferred-types/runtime";

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
 * const rec = toKeyValue({foo: 1, bar: 2, id: 123 }, o => o.toTop("id"));
 * ```
 */
export function toKeyValue<
    T extends NarrowObject<N> | AnyObject,
    N extends Narrowable,
    TSort extends SortOptions<StringKeys<T>, StringKeys<T>> = EmptyObject,
>(
    obj: T,
    opt?: <S extends SortOptions>(cb: S) => void,
) {
    const natural = Object.keys(obj);
    const sorted = opt
        ? sort(natural, opt)
        : natural;
    const tuple: KeyValue[] = [];

    for (const k of sorted) {
        tuple.push({ key: k, value: obj[k as keyof typeof obj] });
    }

    return tuple as unknown as Sort<
        ToKv<T>,
    Omit<TSort, "offset"> & Record<"offset", "key">
    >;
}

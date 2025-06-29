import type {
    Dictionary,
    FromKv,
    KeyValue,
    Narrowable,
} from "inferred-types/types";

/**
 * **fromKeyValue**`(keyValueTuple)`
 *
 * Converts a `KeyValue` tuple into an object.
 */
export function fromKeyValue<
    T extends readonly KeyValue<K, N>[],
    K extends string,
    N extends Narrowable,
>(kvs: T) {
    const obj: Dictionary = {};

    for (const kv of kvs) {
        obj[kv.key] = kv.value;
    }

    return obj as unknown as FromKv<T>;
}

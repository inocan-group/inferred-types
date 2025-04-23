import type {
    KeysWithError,
    Narrowable,
    ObjectKey
} from "inferred-types/types";
import { keysOf } from "inferred-types/runtime";

/**
 * **keysWithError**`(obj)`
 *
 * Returns a list of _keys_ where the passed in object is
 */
export function keysWithError<
    T extends Record<K, V>,
    K extends ObjectKey,
    V extends Narrowable
>(obj: T) {
    const keys = keysOf(obj).filter((k) => {
        return obj[k] instanceof Error;
    }) as KeysWithError<T>;

    return keys;
}

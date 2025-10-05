import type {
    As,
    Dictionary,
    Keys,
    ObjectKey,
} from "inferred-types/types";
import { isArray } from "inferred-types/runtime";

/**
 * **keysOf**(container)
 *
 * Provides a read-only array of the _keys_ that a Dictionary contains.
 *
 * **Note:** this function is aware of Ref<T> types from VueJS and will return
 * `readonly ["value"]` as the keys array when detected rather than reporting
 * on props like `__v_isRef`, etc.
 */
export function keysOf<
    const TObj extends Dictionary
>(
    container: TObj,
) {
    const keys: unknown = (
        isArray(container)
            ? Object.keys(container).map(i => Number(i))
            : Object.keys(container)
    );

    return keys as As<Keys<TObj>, Array<keyof TObj & ObjectKey>>;
}

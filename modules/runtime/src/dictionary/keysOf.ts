import type {
    As,
    Keys,
    Narrowable,
    NarrowObject,
    ObjectKey,
} from "inferred-types/types";
import { isArray, isVueRef } from "inferred-types/runtime";

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
    TObj extends NarrowObject<N>,
    N extends Narrowable
>(
    container: TObj,
) {
    const keys: unknown = (
        isVueRef(container)
            ? ["value"]
            : isArray(container)
                ? Object.keys(container).map(i => Number(i))
                : Object.keys(container)
    );

    return keys as unknown as As<Keys<TObj>, Array<keyof TObj & ObjectKey>>;
}

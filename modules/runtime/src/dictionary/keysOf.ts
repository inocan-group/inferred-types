import type {
    As,
    Keys,
    Narrowable,
    NarrowContainer,
    ObjectKey,
} from "inferred-types/types";
import { isVueRef } from "inferred-types/runtime";

/**
 * **keysOf**(container)
 *
 * Provides a read-only array of the _keys_ of an object contains.
 *
 * **Note:** this function is aware of Ref<T> types from VueJS and will return
 * `readonly ["value"]` as the keys array when detected rather than reporting
 * on props like `__v_isRef`, etc.
 */
export function keysOf<
    TObj extends NarrowContainer<N>,
    N extends Narrowable
>(
    container: TObj,
) {
    const keys: unknown = (
        isVueRef(container)
            ? ["value"]
            : Object.keys(container)
    );

    return keys as As<Keys<TObj>, Array<keyof TObj & ObjectKey>>
}



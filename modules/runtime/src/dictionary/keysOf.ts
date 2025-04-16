import type {
    Container,
    NumericKeys,
    SKeys,
    Tuple,
} from "inferred-types/types";
import { isVueRef } from "inferred-types/runtime";

/**
 * **keysOf**(container)
 *
 * Provides a read-only array of the _keys_ of an object (or array) contains.
 *
 * **Note:** this function is aware of Ref<T> types from VueJS and will return
 * `readonly ["value"]` as the keys array when detected rather than reporting
 * on props like `__v_isRef`, etc.
 */
export function keysOf<
    TContainer extends Container,
>(
    container: TContainer,
) {
    const keys: unknown = (
        isVueRef(container)
            ? ["value"]
            : Array.isArray(container)
                ? Object.keys(container).map(i => Number(i))
                : Object.keys(container)
    );
    return keys as TContainer extends Tuple
        ? NumericKeys<TContainer>
        : TContainer extends object
            ? SKeys<TContainer>
            : never;
}

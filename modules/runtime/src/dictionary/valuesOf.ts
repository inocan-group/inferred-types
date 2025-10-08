import type { Mutable, Narrowable, ObjectKey, Values, Dictionary } from "inferred-types/types";
import { isArray, isDictionary } from "inferred-types/runtime";

/**
 * **valuesOf**(container) -> values[]
 *
 * Runtime utility to convert an object or an array into a tuple of
 * values while preserving as much type information as
 * possible.
 *
 * **Note:** an _array_ is simply proxied through "as is"
 */
export function valuesOf<
    const TContainer extends Record<ObjectKey, N> | readonly N[],
    const N extends Narrowable,
>(val: TContainer) {
    let values: any[] = [];
    if (isArray(val)) {
        values = val;
    } else if (isDictionary(val)) {
        for (const k of Object.keys(val)) {
            values.push(val[k as keyof typeof val]);
        }
    }

    return values as TContainer extends readonly unknown[]
        ? Mutable<TContainer>
        : TContainer extends Dictionary
            ? Values<TContainer>
            : never;
}

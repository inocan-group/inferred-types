import type {
    Dictionary,
    Immutable,
    Narrowable,
    NarrowObject
} from "inferred-types/types";
import { isArray, keysOf } from "inferred-types/runtime";

/**
 * **freeze**`(container)`
 *
 * Deeply freezes a container (runtime) while using the `Immutable` utility to
 * deeply disallow mutable operations in the type system.
 */
export function freeze<
    T extends NarrowObject<N> | readonly N[],
    N extends Narrowable
>(obj: T & Dictionary) {
    const output: any = isArray(obj) ? [] : {};

    for (const key of keysOf(obj)) {
        const value = obj[key as keyof typeof obj];

        output[key] = typeof value === "object"
            ? freeze(value as NarrowObject<Narrowable> | readonly Narrowable[])
            : output[key];
    }

    Object.freeze(output);

    return output as Immutable<T>;
}

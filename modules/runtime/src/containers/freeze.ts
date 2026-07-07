import type {
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
>(obj: T): Immutable<T> {
    const output: any = isArray(obj) ? [] : {};

    for (const key of keysOf(obj as NarrowObject<N>)) {
        const value = obj[key as keyof typeof obj];

        output[key] = typeof value === "object"
            ? freeze(value as NarrowObject<N> | readonly N[])
            : value;
    }

    Object.freeze(output);

    return output as Immutable<T>;
}

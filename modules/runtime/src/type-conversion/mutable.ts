import type { Mutable, Narrowable } from "inferred-types/types";

/**
 * converts a readonly value into a mutable one without giving up narrow types.
 */
export function mutable<T extends Narrowable | readonly Narrowable[]>(value: T): Mutable<T> {
    return value as Mutable<T>;
}

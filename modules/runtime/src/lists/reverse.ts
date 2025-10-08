import type { Narrowable, Reverse } from "inferred-types/types";

/**
 * **reverse**(list)
 *
 * Allows reversing the order of a readonly array and preserving the types.
 */
export function reverse<
    const T extends readonly N[],
    const N extends Narrowable
>(list: T): Reverse<T> {
    return [...list].reverse() as Reverse<T>;
}

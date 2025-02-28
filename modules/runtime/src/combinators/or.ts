import type { Or } from "inferred-types/types";

/**
 * **or**(conditions) -> boolean
 *
 * If you have a discrete list of boolean values then you can use this
 * function to perform a logical OR operation on them.
 */
export function or<TList extends readonly boolean[]>(...conditions: TList) {
    const values: unknown = conditions.includes(true);

    return values as Or<TList>;
}

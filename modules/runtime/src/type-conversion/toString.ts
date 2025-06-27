import type { Narrowable, NarrowObject, Scalar, ToJson, ToJsonOptions } from "inferred-types/types";

/**
 * **toString**`(val)`
 *
 * Converts a value into a _string_ representation of that value.
 *
 * **Related:** `toJSON()`
 */
export function toString<
    T extends Exclude<Scalar, symbol> | NarrowObject<N> | readonly N[],
    N extends Narrowable,
    O extends ToJsonOptions = { quote: "\""; encode: false }
>(
    val: T,
    _options: O = { quote: "\"", encode: false } as O
): ToJson<T, O> {
    return JSON.stringify(val) as unknown as ToJson<T, O>;
}

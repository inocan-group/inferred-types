import type {
    Narrowable,
    NarrowObject,
    Scalar,
    ToJson,
    ToJsonOptions
} from "inferred-types/types";

/**
 * **toJSON**`(val)`
 *
 * Converts the passed in value to a strongly typed string
 * literal representation.
 *
 * **Related:** `jsonValues()`
 */
export function toJSON<
    T extends Exclude<Scalar, symbol> | NarrowObject<N> | readonly N[],
    N extends Narrowable,
    O extends ToJsonOptions = { quote: "\""; encode: false }
>(
    val: T,
    _options: O = { quote: "\"", encode: false } as O
): ToJson<T, O> {
    return JSON.stringify(val) as unknown as ToJson<T, O>;
}

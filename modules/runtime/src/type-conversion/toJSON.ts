import type {
    Narrowable,
    NarrowObject,
    Scalar,
    ToJson,
    ToJsonArray,
    ToJsonOptions
} from "inferred-types/types";

/**
 * **toJSON**`(val)`
 *
 * Converts a string value to a strongly typed JSON value
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

export function toJsonArray<
    T extends readonly unknown[]
>(
    ...elements: T
) {
    return elements as unknown as ToJsonArray<T>;
}


import type { EachAsString, Narrowable } from "inferred-types/types";
import { asString } from "inferred-types/runtime";

/**
 * **eachAsString**`(...tuple) -> readonly string[]`
 *
 * Converts every element of a tuple into a _string_ representation.
 */
export function eachAsString<
    T extends readonly N[],
    N extends Narrowable,
>(...tuple: T) {
    return tuple.map(
        i => asString(i),
    ) as EachAsString<T>;
}

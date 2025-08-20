import type { DefineTuple } from "inferred-types/types";
import { toStringLiteral } from "inferred-types/runtime";

/**
 * **fromDefineTuple**`(defn)`
 *
 * Takes in a `DefineTuple` type and converts it to the _type_
 * it represents.
 *
 * **Note:**
 * - the runtime **value** will be converted to a **string**
 * definition of the tuple token (if it wasn't already a string variant)
 * - the _type_ will be whatever type the provided `DefineTuple` _defined_
 */
export function fromDefineTuple<T extends DefineTuple>(defn: T) {
    return (
        toStringLiteral(defn)
    ) as unknown as T;
}

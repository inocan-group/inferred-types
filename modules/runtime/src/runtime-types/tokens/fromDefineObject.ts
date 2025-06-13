import type { DefineObject, FromDefineObject } from "inferred-types/types";
import { toStringLiteral } from "inferred-types/runtime";

/**
 * Takes an `DefineObject` definition and:
 *
 * - converts it to a string-based `InputToken` representation at runtime
 * - converts the _type_ to be the type this token is representing.
 */
export function fromDefineObject<
    T extends DefineObject
>(defn: T) {
    return toStringLiteral(
        defn,
        { tokensAllowed: true }
    ) as unknown as FromDefineObject<T>;
}

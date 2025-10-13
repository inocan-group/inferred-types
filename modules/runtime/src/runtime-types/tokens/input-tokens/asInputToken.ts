import type { InputToken } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { fromInputToken, isArray, isDictionary, isString, toStringLiteral__Object } from "inferred-types/runtime";

/**
 * **asInputToken**`(token) -> string`
 *
 * Takes an input token(string or otherwise) and returns it as a string token.
 *
 * **Note:** until the runtime type parser is finished this will not produce
 * a runtime errors when an invalid token is passed in but the _type_ will
 * be set because it benefits from type utilities which are already in place.
 */
export function asInputToken<const T extends InputToken>(token: T) {
    return (
        isString(token)
            ? token
            : isDictionary(token)
                ? toStringLiteral__Object(token)
                : isArray(token)
                    ? fromInputToken(token)
                    : Never
    );
}

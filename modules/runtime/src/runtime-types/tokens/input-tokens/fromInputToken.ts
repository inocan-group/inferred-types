import type {
    FromInputToken,
    InputToken,
} from "inferred-types/types";
import {
    err,
    isDefineObject,
    isDefineTuple,
    isInputToken__String,
    toStringToken
} from "inferred-types/runtime";

/**
 * **fromInputToken**`(token)`
 *
 * takes both string and _non-string_ representations of an `InputToken`
 * and ensures that they are converted to their _string-literal_ form
 * and the _type_ is converted to the _type_ which the token
 * represents.
 *
 * - if you'd prefer the _type_ to remain as the string literal representing
 * the token then use `asInputToken()` instead.
 * - Note: like `asInputToken()`, a string token passed in will have the string
 * literal trimmed to remove unnecessary whitespace. From a token standpoint the
 * whitespace doesn't matter but to move toward a more tidy and uniform set of
 * tokens we take this measure mainly for aesthetics.
 */
export function fromInputToken<
    T extends InputToken
>(
    token: T
) {
    return (
        isInputToken__String(token)
            ? token.trim()
            : isDefineObject(token)
                ? toStringToken(token) // convert to string based definition of an object
                : isDefineTuple(token)
                    ? toStringToken(token)
                    : err("invalid-token", `The input token provided was invalid!`, { token })
    ) as unknown as FromInputToken<T>;
}

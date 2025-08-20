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
 * **asInputToken**`(token)`
 *
 * takes both string and _non-string_ representations of an input token
 * (defined by `InputTokenLike`) and ensures that they are converted to
 * their _string-literal_ form.
 *
 *
 */
export function fromInputToken<
    T extends InputToken
>(
    token: T
) {
    return (
        isInputToken__String(token)
            ? token
            : isDefineObject(token)
                ? toStringToken(token) // convert to string based definition of an object
                : isDefineTuple(token)
                    ? toStringToken(token)
                    : err("invalid-token", `The input token provided was invalid!`, { token })
    ) as unknown as FromInputToken<T>;
}

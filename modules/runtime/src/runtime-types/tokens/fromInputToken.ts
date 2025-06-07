import type {
    Err,
    FromStringInputToken,
    InputTokenSuggestions,
    InputTokenLike,
    FromInputToken
} from "inferred-types/types";
import {
    err,
    isInputToken__String,
    isInputToken__Object,
    isInputToken__Tuple,
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
    T extends InputTokenSuggestions
>(
    token: T
) {


    return (
        isInputToken__String(token)
            ? token
        : isInputToken__Object(token)
            ? toStringToken(token) // convert to string based definition of an object
        : isInputToken__Tuple(token)
            ? toStringToken(token)
        : err("invalid-token", `The input token provided was invalid!`, { token })
    ) as unknown as FromInputToken<T>


}



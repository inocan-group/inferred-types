import type { Err, InputToken } from "inferred-types/types";
import { asString, asTypedError, isInputTokenLike, isString } from "inferred-types/runtime";

/**
 * **toOutputToken**`(input)`
 *
 * Converts "input tokens" into "output tokens":
 *
 * - The conversion process for _string based_ input tokens is simply a matter of:
 *      - adding a surrounding delimiter characters to the input token (e.g., "<<", and ">>"), and then
 *      - encoding the text inside string based variables so that the following characters are
 *        encoded:
 *          - spaces
 *          - quotes (single qoutes, double quotes, and grave markers)
 * - In addition to accepting _string_ tokens as input, input tokens allow for:
 *      - dictionaries of the format `IT_ObjectLiteralDefinition` (aka, `Record<string,string-token>`)
 *      - a _tuple_ of string tokens
 *
 * All `OutputToken` representations are string-based and serializable; for non-string based inputs
 * it will need to convert first into a string based representation of the input token and then go through the
 * same conversion process described above to make into a finalized `OutputToken`.
 *
 * **Note:**
 * - if an invalid input token is passed in, this function will _return_ a `TypedError` of the type/subtype of `invalid-token/
 * input-token`
 *
 * **Related:** `isInputToken()`, `isOutputToken()`, `fromOutputToken()`
 */
export function toOutputToken<T extends InputToken>(input: T): string | Err<`invalid-token/input-token`> {
    return isInputTokenLike(input)
        ? isString(input)
            ? "<<string>>"
            : "<<shit>>"
            // ? `<<'${input}'>>`
            // : isObject(input)
            //     ? toJSON(input)
            //     : isArray(input)
            //         ? toJsonArray(input)
            //         : ""
        : asTypedError("invalid-token/input-token", `The input token -- ${asString(input)} -- is not a valid InputToken and therefore can not be converted!`);
}

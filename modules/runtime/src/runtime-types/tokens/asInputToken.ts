import type {
    Err,
    FromStringInputToken,
    InputTokenSuggestions
} from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **asInputToken**`(token)`
 *
 * Attempts to convert a `InputTokenLike` token into a validated `InputToken`.
 *
 * - Returns a `invalid-token/*` error if unable to parse the token
 */
export function asInputToken<
    T extends InputTokenSuggestions,
    E extends string
>(token: T): InputTokenSuggestions | Err<`invalid-token/${E}`> {
    return (
        isString(token)
        ? token.trim() as unknown as FromStringInputToken<T>
        : "string" as any
    ) as unknown as InputTokenSuggestions | Err<`invalid-token/${E}`>
    ;
}

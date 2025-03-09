import type {
    Err,
    FromInputToken,
    InputToken,
    InputTokenLike
} from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **asInputToken**`(token)`
 *
 * Attempts to convert a `InputTokenLike` token into a validated `InputToken`.
 *
 * - Returns a `invalid-token/*` error if unable to parse the token
 */
export function asInputToken<T extends InputTokenLike, E extends string>(token: T): InputToken | Err<`invalid-token/${E}`> {
    return isString(token)
        ? token.trim() as unknown as FromInputToken<T>
        : "string" as any
    ;
}

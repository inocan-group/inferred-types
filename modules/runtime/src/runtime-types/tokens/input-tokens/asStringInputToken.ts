import type { InputToken } from "inferred-types/types";
import {
    isDefineObject,
    toStringLiteral
} from "inferred-types/runtime";

/**
 * **toStringToken**`(token)`
 *
 * Proxies through any existing string tokens while making sure
 * that `InputToken__Object` and `InputToken__Tuple` are converted
 * to string representations.
 */
export function toStringToken<
    T extends InputToken
>(token: T) {
    if (isDefineObject(token)) {
        return toStringLiteral(token, { tokensAllowed: true });
    }
}

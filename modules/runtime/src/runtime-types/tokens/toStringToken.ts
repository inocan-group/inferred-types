import type { InputTokenLike } from "inferred-types/types";
import {
    isInputToken__Object,
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
    T extends InputTokenLike
>(token: T) {
    if (isInputToken__Object(token)) {
        return toStringLiteral(token, { tokensAllowed: true });
    }
}

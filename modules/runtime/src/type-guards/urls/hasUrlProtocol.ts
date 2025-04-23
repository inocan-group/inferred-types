import type { NetworkProtocol } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **hasUrlProtocol**`(test, [protocols])`
 *
 * A type guard which tests whether the passed in `test` is a string
 * which starts with an explicit network protocol defined.
 */
export function hasUrlProtocol<P extends readonly NetworkProtocol[] = readonly ["http", "https"]>(
    test: unknown,
    protocols?: P
) {
    protocols = (
        protocols || ["http", "https"]
    ) as P;

    if (isString(test)) {
        return protocols.some(p => test.startsWith(p));
    }
    else {
        return false;
    }
}

import type { Shape } from "inferred-types/types";
import { stripTrailing } from "inferred-types/runtime";

/**
 * **getTokenData**`(token)`
 *
 * Given a `Shape` token, this function will extract the
 * data parameters from the token.
 */
export function getTokenData<T extends Shape>(token: T): string[] {
    const [_name, ...rest] = stripTrailing(token, ">>").split("::");

    return rest;
}

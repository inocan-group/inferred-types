import type { StripSurround, Trim } from "inferred-types/types";
import { stripLeading, stripTrailing } from "inferred-types/runtime";

/**
 * **stripParenthesis**`(val)`
 *
 * A runtime utility which strips leading and trailing whitespace as well
 * as any leading or trailing parenthesis characters.
 */
export function stripParenthesis<
    T extends string,
>(val: T) {
    return stripTrailing(stripLeading(val.trim(), "("), ")").trim() as unknown as Trim<StripSurround<Trim<T>, "(" | ")">>;
}

import type { Trim } from "inferred-types/types";
import { stripLeading, stripTrailing } from "inferred-types/runtime";

type StripParenthesis<T extends string> = Trim<T> extends infer S extends string
    ? S extends `(${infer Inner})`
        ? Trim<Inner>
        : S extends `(${infer Inner}`
            ? Trim<Inner>
            : S extends `${infer Inner})`
                ? Trim<Inner>
                : S
    : never;

/**
 * **stripParenthesis**`(val)`
 *
 * A runtime utility which strips leading and trailing whitespace as well
 * as any leading or trailing parenthesis characters.
 */
export function stripParenthesis<
    T extends string,
>(val: T) {
    return stripTrailing(stripLeading(val.trim(), "("), ")").trim() as unknown as StripParenthesis<T>;
}

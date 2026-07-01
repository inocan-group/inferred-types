import type { Err } from "inferred-types/types";
import { isError } from "inferred-types/runtime";

/**
 * **hasErrorConditions**`(list)`
 *
 * Type guard which checks whether the passed in list/tuple contains at least
 * one _error condition_.
 *
 * An error condition is either:
 *
 * - a real `Error` instance (including the `Err<...>` errors produced by `err()`), or
 * - an error-condition object produced by `createErrorCondition()` (marked with `__kind: "Error"`).
 */
export function hasErrorConditions<
    T extends readonly unknown[],
>(list: T): list is T & readonly [...unknown[], Err<string>] {
    return list.some(
        i => isError(i)
            || (
                typeof i === "object"
                && i !== null
                && "__kind" in i
                && (i as { __kind?: unknown }).__kind === "Error"
            ),
    );
}

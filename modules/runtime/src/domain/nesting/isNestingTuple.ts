import type { NestingTuple } from "inferred-types/types";
import { isArray, isNestingKeyValue, isString, isUndefined } from "inferred-types/runtime";

/**
 * type-guard which validates that `val` is a `NestingTuple`
 *
 * Supports both:
 * - Simple form: `[start[], end[]]` (2 elements)
 * - Hierarchical form: `[start[], end[], nextLevel]` (3 elements)
 *
 * **Related:** `IsNestingTuple<T>`
 */
export function isNestingTuple(val: unknown): val is NestingTuple {
    if (!isArray(val) || (val.length !== 2 && val.length !== 3)) {
        return false;
    }

    // Validate first element (start tokens)
    if (!isArray(val[0]) || !val[0].every(isString)) {
        return false;
    }

    // Validate second element (end tokens)
    const validEnd = (isArray(val[1]) && val[1].every(isString)) || isUndefined(val[1]);
    if (!validEnd) {
        return false;
    }

    // If 3-element tuple, validate third element (nextLevel config)
    // The next level config can be a NestingKeyValue or another NestingTuple
    // For simplicity, we'll accept it if it's an object or array (recursive check would be complex)
    if (val.length === 3) {
        const nextLevel = val[2];
        // Accept object (NestingKeyValue) or array (NestingTuple) or empty object
        return (
            (typeof nextLevel === "object" && nextLevel !== null)
            && (isNestingKeyValue(nextLevel) || isNestingTuple(nextLevel))
        );
    }

    return true;
}

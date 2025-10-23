import type { Unique } from "inferred-types/types";

/**
 * Helper to check if two values are the same, with special handling for NaN
 */
function isSameValue(a: unknown, b: unknown): boolean {
    // Handle NaN specially since NaN !== NaN
    if (typeof a === "number" && typeof b === "number" && Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }
    return a === b;
}

/**
 * **unique.by**`<K>(deref, ...values)`
 *
 * Deduplicate objects by a specific property key.
 *
 * @param deref - The property key to use for deduplication
 * @param values - The objects to deduplicate
 * @returns Array with unique objects (first occurrence kept)
 *
 * @example
 * ```ts
 * const items = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Alice Clone" }
 * ];
 * const result = unique.by("id", ...items);
 * // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
 * ```
 */
function uniqueBy<
    const K extends PropertyKey,
    const T extends readonly any[]
>(
    deref: K,
    ...values: T
): Unique<T, K extends string | number ? K : never> {
    const seen = new Set<unknown>();
    const result: any[] = [];

    for (const item of values) {
        const key = item[deref];

        // Use isSameValue for comparison to handle NaN
        let isUnique = true;
        for (const seenKey of seen) {
            if (isSameValue(key, seenKey)) {
                isUnique = false;
                break;
            }
        }

        if (isUnique) {
            seen.add(key);
            result.push(item);
        }
    }

    return result as Unique<T, K extends string | number ? K : never>;
}

/**
 * **unique**`(...values)`
 *
 * Runtime utility which removes duplicate values from a set.
 *
 * - For primitive values, uses value equality
 * - For objects
 *      - uses reference equality
 *      - if you use the `unique.by()` function you can compare object by
 *      key offset.
 * - Special handling for NaN (treated as equal to itself)
 *
 * @param values - The values to deduplicate
 * @returns Array with unique values (first occurrence kept)
 *
 * @example
 * ```ts
 * // [1, 2, 3]
 * const result = unique(1, 2, 3, 2, 1);
 *
 * const obj1 = { id: 1 };
 * const obj2 = { id: 2 };
 * // [obj1, obj2]
 * const result2 = unique(obj1, obj2, obj1);
 * ```
 */
export function unique<const T extends readonly any[]>(
    ...values: T
): Unique<T> {
    const result: any[] = [];

    for (const value of values) {
        // Check if value is already in result
        let found = false;
        for (const existing of result) {
            if (isSameValue(value, existing)) {
                found = true;
                break;
            }
        }

        if (!found) {
            result.push(value);
        }
    }

    return result as Unique<T>;
}

// Attach the .by method
unique.by = uniqueBy;



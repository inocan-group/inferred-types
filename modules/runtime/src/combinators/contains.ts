import type { Contains, Narrowable } from "inferred-types/types";

/**
 * **contains**`(content, comparator)`
 *
 * Runtime equivalent of the type-level `Contains` utility.
 *
 * Checks whether `content` contains `comparator`:
 * - When `content` is a string or number, it checks if `comparator` exists as a substring
 * - When `content` is an array, it checks if any element matches `comparator`
 * - When `comparator` is an array (union), it checks if any comparator element matches
 */
export function contains<
    const TContent extends (string | number) | readonly N[],
    const TComparator extends N | readonly N[],
    N extends Narrowable
>(
    content: TContent,
    comparator: TComparator
): Contains<TContent, TComparator> {
    // Helper to check if a value matches a comparator
    const valueMatches = (value: unknown, comp: unknown): boolean => {
    // Direct equality check
        if (value === comp)
            return true;

        // Type constructor checks (for things like String, Number, Boolean)
        if (comp === String)
            return typeof value === "string";
        if (comp === Number)
            return typeof value === "number";
        if (comp === Boolean)
            return typeof value === "boolean";

        // Special handling for null/undefined
        if (comp === null)
            return value === null;
        if (comp === undefined)
            return value === undefined;

        return false;
    };

    // If content is string or number, check substring
    if (typeof content === "string" || typeof content === "number") {
        const contentStr = String(content);

        // If comparator is array (union), check if any element is substring
        if (Array.isArray(comparator)) {
            return comparator.some((comp: unknown) => contentStr.includes(String(comp))) as Contains<TContent, TComparator>;
        }

        // Otherwise check if comparator is substring
        return contentStr.includes(String(comparator)) as Contains<TContent, TComparator>;
    }

    // If content is array
    else if (Array.isArray(content)) {
    // If comparator is array (union), check if any element of content matches any comparator
        if (Array.isArray(comparator)) {
            return content.some((item: unknown) =>
                comparator.some((comp: unknown) => valueMatches(item, comp))
            ) as Contains<TContent, TComparator>;
        }

        // Otherwise check if any element matches comparator
        return content.some((item: unknown) => valueMatches(item, comparator)) as Contains<TContent, TComparator>;
    }

    // This should never be reached given the type constraints, but TypeScript needs it
    else {
        return false as Contains<TContent, TComparator>;
    }
}

import type { Contains, Narrowable } from "inferred-types/types";

type Stringify<T> = T extends string
    ? T
    : T extends number
        ? `${T}`
        : never;

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
    const TContent extends string | number,
    const TComparator extends string | number,
>(
    content: TContent,
    comparator: TComparator
): `${TContent}` extends `${string}${Stringify<TComparator>}${string}` ? true : false;

export function contains<
    const TContent extends readonly (string | number)[],
    const TComparator extends string | number,
>(
    content: TContent,
    comparator: TComparator
): Extract<TContent[number], TComparator> extends never ? false : true;

export function contains<
    const TContent extends string | number,
    const TComparator extends Narrowable,
>(
    content: TContent,
    comparator: TComparator
): Contains<TContent, TComparator>;

export function contains<
    const TContent extends string | number,
    const TComparator extends readonly Narrowable[],
>(
    content: TContent,
    comparator: TComparator
): Contains<TContent, TComparator>;

export function contains<
    const TContent extends readonly Narrowable[],
    const TComparator extends Narrowable,
>(
    content: TContent,
    comparator: TComparator
): Contains<TContent, TComparator>;

export function contains<
    const TContent extends readonly Narrowable[],
    const TComparator extends readonly Narrowable[],
>(
    content: TContent,
    comparator: TComparator
): Contains<TContent, TComparator>;

export function contains(
    content: string | number | readonly Narrowable[],
    comparator: Narrowable | readonly Narrowable[]
): boolean {
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
            return comparator.some((comp: unknown) => contentStr.includes(String(comp)));
        }

        // Otherwise check if comparator is substring
        return contentStr.includes(String(comparator));
    }

    // If content is array
    else if (Array.isArray(content)) {
    // If comparator is array (union), check if any element of content matches any comparator
        if (Array.isArray(comparator)) {
            return content.some((item: unknown) =>
                comparator.some((comp: unknown) => valueMatches(item, comp))
            );
        }

        // Otherwise check if any element matches comparator
        return content.some((item: unknown) => valueMatches(item, comparator));
    }

    // This should never be reached given the type constraints, but TypeScript needs it
    else {
        return false;
    }
}

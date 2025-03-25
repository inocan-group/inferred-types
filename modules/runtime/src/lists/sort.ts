import type {
    As,
    FromInputToken,
    InputToken,
    InputTokenSuggestions,
    Narrowable,
    Sort,
    SortOptions,
} from "inferred-types/types";

type From<S extends RuntimeSort> = {
    first: S["first"] extends readonly InputTokenSuggestions[]
        ? {
            [K in keyof S["first"]]: S["first"][K] extends InputToken
                ? FromInputToken<S["first"][K]>
                : never
        }
        : [];
    last: S["last"] extends readonly InputTokenSuggestions[]
        ? {
            [K in keyof S["last"]]: S["last"][K] extends InputToken
                ? FromInputToken<S["last"][K]>
                : never
        }
        : [];
    offset: S["offset"];
};

export type RuntimeSort<
    F extends readonly InputTokenSuggestions[] = InputTokenSuggestions[],
    S extends readonly InputTokenSuggestions[] = InputTokenSuggestions[]
> = {
    first?: F;
    last?: S;
    offset?: string;
};

export function sort<
    T extends readonly N[],
    N extends Narrowable,
    S extends RuntimeSort<any, any>
>(
    tuple: T,
    sort: S,
) {
    const _first: unknown[] = [];
    const _rest: unknown[] = [];
    const _last: unknown[] = [];

    // Extract values to be placed first and last
    const firstValues = sort.first || [];
    const lastValues = sort.last || [];
    const offset = sort.offset;

    // Process each item in the tuple
    for (const item of tuple) {
        // Check if this item should be placed first
        if (shouldBePlacedFirst(item, firstValues, offset)) {
            _first.push(item);
        }
        // Check if this item should be placed last
        else if (shouldBePlacedLast(item, lastValues, offset)) {
            _last.push(item);
        }
        // Otherwise, it goes in the middle
        else {
            _rest.push(item);
        }
    }

    // Combine the arrays in the correct order
    return [..._first, ..._rest, ..._last] as unknown as Sort<T, As<From<S>, SortOptions>>;
}

// Helper function to check if an item should be placed first
function shouldBePlacedFirst(item: unknown, firstValues: readonly any[], offset?: string): boolean {
    if (firstValues.length === 0)
        return false;

    for (const value of firstValues) {
        // If we have an offset, compare the property value
        if (offset && typeof item === "object" && item !== null) {
            const objItem = item as Record<string, unknown>;
            if (objItem[offset] === value)
                return true;
        }
        // For string tokens like "String(bar)", extract the actual value
        else if (typeof value === "string" && value.includes("(") && value.includes(")")) {
            const match = value.match(/(\w+)\((.+)\)/);
            if (match) {
                const [, type, val] = match;
                if (type === "String" && typeof item === "string" && item === val)
                    return true;
                if (type === "Number" && typeof item === "number" && item === Number(val))
                    return true;
            }
        }
        // Direct comparison
        else if (item === value) {
            return true;
        }
    }

    // For type-based sorting (e.g., first: [string])
    if (!offset) {
        for (const value of firstValues) {
            if (typeof value === "string" && value === "string" && typeof item === "string")
                return true;
            if (typeof value === "string" && value === "number" && typeof item === "number")
                return true;
        }
    }

    return false;
}

// Helper function to check if an item should be placed last
function shouldBePlacedLast(item: unknown, lastValues: readonly any[], offset?: string): boolean {
    if (lastValues.length === 0)
        return false;

    for (const value of lastValues) {
        // If we have an offset, compare the property value
        if (offset && typeof item === "object" && item !== null) {
            const objItem = item as Record<string, unknown>;
            if (objItem[offset] === value)
                return true;
        }
        // For string tokens like "String(bar)", extract the actual value
        else if (typeof value === "string" && value.includes("(") && value.includes(")")) {
            const match = value.match(/(\w+)\((.+)\)/);
            if (match) {
                const [, type, val] = match;
                if (type === "String" && typeof item === "string" && item === val)
                    return true;
                if (type === "Number" && typeof item === "number" && item === Number(val))
                    return true;
            }
        }
        // Direct comparison
        else if (item === value) {
            return true;
        }
    }

    // For type-based sorting (e.g., last: [string])
    if (!offset) {
        for (const value of lastValues) {
            if (typeof value === "string" && value === "string" && typeof item === "string")
                return true;
            if (typeof value === "string" && value === "number" && typeof item === "number")
                return true;
        }
    }

    return false;
}

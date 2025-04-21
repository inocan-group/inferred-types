import type {
    As,
    FromStringInputToken,
    InputTokenSuggestions,
    Narrowable,
} from "inferred-types/types";

type From<S extends RuntimeSort> = {
    first: S["first"] extends readonly InputTokenSuggestions[]
        ? {
            [K in keyof S["first"]]: S["first"][K] extends InputTokenSuggestions
                ? FromStringInputToken<S["first"][K]>
                : never
        }
        : [];
    last: S["last"] extends readonly InputTokenSuggestions[]
        ? {
            [K in keyof S["last"]]: S["last"][K] extends InputTokenSuggestions
                ? FromStringInputToken<S["last"][K]>
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
    const first = tuple.map((i: any) => {
        const val = tuple[i];
    })


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

import type { Dictionary, IsTemplateLiteral, UnionToTuple } from "inferred-types/types";

// Helper to check if any element in a tuple is a template literal
type HasTemplateLiteralKey<
    Keys extends readonly unknown[]
> = Keys extends readonly [infer Head, ...infer Rest]
    ? IsTemplateLiteral<Head> extends true
        ? true
        : HasTemplateLiteralKey<Rest>
    : false;

/**
 * **HasIndexKeys**`<T>`
 *
 * Tests whether the dictionary `T` has _index_ keys.
 *
 * ```ts
 * // true
 * type T1 = HasIndexKeys<{foo: 1; [key: symbol]: number }
 * type T2 = HasIndexKeys<Record<string, string>>;
 * // false
 * type F1 = HasIndexKeys<{foo: 1; bar: 2 }
 * ```
 *
 * **Related:** `HasFixedKeys`
 */
export type HasIndexKeys<T extends Dictionary>
    // Check for string index signature
    = string extends keyof T
        ? true
    // Check for number index signature
        : number extends keyof T
            ? true
        // Check for symbol index signature
            : symbol extends keyof T
                ? true
            // Check for template literal index signatures
                : HasTemplateLiteralKey<UnionToTuple<keyof T>> extends true
                    ? true
                // No index signatures found
                    : false;

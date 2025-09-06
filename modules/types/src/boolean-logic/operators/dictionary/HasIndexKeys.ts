import { Dictionary } from "inferred-types/types";

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
export type HasIndexKeys<T extends Dictionary> =
    // Check for string index signature
    string extends keyof T
        ? true
    // Check for number index signature
    : number extends keyof T
        ? true
    // Check for symbol index signature
    : symbol extends keyof T
        ? true
    // No index signatures found
    : false;

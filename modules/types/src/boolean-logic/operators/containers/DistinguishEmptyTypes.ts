import type { EmptyObject } from "inferred-types/types";

/**
 * **IsStrictEmptyObject**`<T>`
 *
 * Distinguishes between `EmptyObject` (wide type) and `ExplicitlyEmptyObject` (narrow type)
 * even when `IsEqual` returns true due to TypeScript's structural typing.
 *
 * Returns:
 * - `"empty"` for `EmptyObject` (can have properties added)
 * - `"explicit"` for `ExplicitlyEmptyObject` (cannot have properties)
 * - `"other"` for any other type
 */

/**
 * **CanHaveProperties**`<T>`
 *
 * Checks if a type allows properties to be added to it.
 * This distinguishes `EmptyObject` from `ExplicitlyEmptyObject`.
 *
 * - `EmptyObject` → `true` (properties can be added)
 * - `ExplicitlyEmptyObject` → `false` (no properties allowed)
 */
type CanHaveProperties<T> = T extends object
    ? T & { __test: unknown } extends never
        ? false
        : true
    : false;

/**
 * **IsExplicitlyEmptyObject**`<T>`
 *
 * Specifically checks if a type is `ExplicitlyEmptyObject` or has the same structure.
 * This works by checking for never index signatures.
 */
type IsExplicitlyEmptyObject<T> = T extends object
    ? T extends { [x: string]: never; [x: symbol]: never }
        ? keyof T extends never
            ? true
            : false
        : false
    : false;

/**
 * **IsWideEmptyObject**`<T>`
 *
 * Checks if a type is `EmptyObject` (the wide type that accepts any object).
 * Distinguishes it from `ExplicitlyEmptyObject`.
 */
type IsWideEmptyObject<T> = T extends EmptyObject
    ? IsExplicitlyEmptyObject<T> extends true
        ? false
        : true
    : false;

/**
 * **EmptyObjectKind**`<T>`
 *
 * Categorizes empty object types into specific kinds.
 *
 * Returns:
 * - `"wide"` for `EmptyObject` (NonNullable<unknown>)
 * - `"explicit"` for `ExplicitlyEmptyObject` (never index signatures)
 * - `"literal"` for literal empty object `{}`
 * - `"not-empty"` for other types
 */
type EmptyObjectKind<T> = T extends object
    ? keyof T extends never
        ? T extends { [x: string]: never; [x: symbol]: never }
            ? "explicit"
            : T extends EmptyObject
                ? "wide"
                : "literal"
        : "not-empty"
    : "not-empty";

/**
 * **AcceptsProperties**`<T>`
 *
 * Alternative check to see if a type accepts new properties.
 * Uses index signature compatibility.
 */
type AcceptsProperties<T> = T extends { [x: string]: any }
    ? true
    : T extends object
        ? {} extends T
            ? true
            : false
        : false;

/**
 * **IsNeverIndexed**`<T>`
 *
 * Checks if a type has never index signatures (like ExplicitlyEmptyObject).
 */
type IsNeverIndexed<T> = T extends { [x: string]: never }
    ? T extends { [x: symbol]: never }
        ? true
        : false
    : false;

/**
 * **DistinguishEmpty**`<T>`
 *
 * Main utility to distinguish between different empty object types.
 * Provides a detailed classification even when IsEqual returns true.
 */
export type DistinguishEmpty<T> = T extends object
    ? {
        kind: EmptyObjectKind<T>;
        canHaveProperties: CanHaveProperties<T>;
        isNeverIndexed: IsNeverIndexed<T>;
        acceptsProperties: AcceptsProperties<T>;
        isExplicitlyEmpty: IsExplicitlyEmptyObject<T>;
        isWideEmpty: IsWideEmptyObject<T>;
    }
    : {
        kind: "not-object";
        canHaveProperties: false;
        isNeverIndexed: false;
        acceptsProperties: false;
        isExplicitlyEmpty: false;
        isWideEmpty: false;
    };

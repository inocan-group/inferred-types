import type { IsAllCaps, Trim } from "inferred-types/types";

/**
 * Direct snake_case conversion in a single pass
 * Handles camelCase, PascalCase, kebab-case, spaces, and existing snake_case
 */
type SnakeCaseCore<
    T extends string,
    Result extends string = "",
    PrevWasLower extends boolean = false
> = T extends `${infer First}${infer Rest}`
    ? First extends "-" | " "
        ? SnakeCaseCore<Rest, `${Result}_`, false> // Convert delimiter to underscore
        : First extends "_"
            ? SnakeCaseCore<Rest, `${Result}_`, false> // Keep underscore
            : Uppercase<First> extends First // Is uppercase?
                ? Lowercase<First> extends First // Is number/special?
                    ? SnakeCaseCore<Rest, `${Result}${First}`, false> // Keep as-is
                    : PrevWasLower extends true
                        ? SnakeCaseCore<Rest, `${Result}_${Lowercase<First>}`, false> // Add underscore before uppercase after lowercase
                        : SnakeCaseCore<Rest, `${Result}${Lowercase<First>}`, false> // Convert to lowercase
                : SnakeCaseCore<Rest, `${Result}${Lowercase<First>}`, true> // Lowercase letter
    : Result;

/**
 * Limited depth snake_case to avoid deep recursion on very long strings
 */
type LimitedSnakeCase<T extends string, Depth extends any[] = []>
    = Depth["length"] extends 25
        ? T // Bailout at depth 25
        : T extends `${infer Before}-${infer After}`
            ? `${Lowercase<Before>}_${LimitedSnakeCase<After, [...Depth, 1]>}`
            : T extends `${infer Before} ${infer After}`
                ? `${Lowercase<Before>}_${LimitedSnakeCase<After, [...Depth, 1]>}`
                : Lowercase<T>;

/**
 * Optimized SnakeCase that tries fast paths first
 */
type SnakeCaseSimple<T extends string>
    // Handle delimited strings with fast path
    = T extends `${string}${"-" | " "}${string}`
        ? LimitedSnakeCase<T>
        // Handle regular strings with character-by-character processing
        : IsAllCaps<T> extends true
            ? Lowercase<T> // All caps just becomes lowercase
            : SnakeCaseCore<T>;

/**
 * **SnakeCase**`<TString>`
 *
 * Converts a string literal type to _snake_case_.
 * ```ts
 * // "foo_bar"
 * type T = SnakeCase<"fooBar">;
 * type T = SnakeCase<"foo bar">;
 * type T = SnakeCase<"foo-bar">;
 * ```
 */
export type SnakeCase<
    T extends string | readonly unknown[],
> = string extends T
    ? string
    : T extends string
        ? SnakeCaseSimple<Trim<T>>
        : T extends readonly unknown[]
            ? {
                [K in keyof T]: T[K] extends string
                    ? SnakeCase<T[K]>
                    : T[K]
            }
            : never;

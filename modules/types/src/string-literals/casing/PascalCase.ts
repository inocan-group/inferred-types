import type { IsAllCaps, Trim } from "inferred-types/types";

/**
 * Limited depth PascalCase - processes up to 20 segments to avoid deep recursion
 */
type LimitedPascalCase<T extends string, Depth extends any[] = []>
    = Depth["length"] extends 20
        ? T // Bailout at depth 20, return as-is
        : T extends `${infer Before}-${infer After}`
            ? `${Capitalize<Before>}${LimitedPascalCase<After, [...Depth, 1]>}`
            : T extends `${infer Before}_${infer After}`
                ? `${Capitalize<Before>}${LimitedPascalCase<After, [...Depth, 1]>}`
                : T extends `${infer Before} ${infer After}`
                    ? `${Capitalize<Before>}${LimitedPascalCase<After, [...Depth, 1]>}`
                    : Capitalize<T>;

/**
 * Recursive PascalCase for strings with delimiters
 * Processes one character at a time to handle mixed delimiters correctly
 */
type RecursivePascalCase<T extends string, CapNext extends boolean = true>
    // Use limited depth version for delimited strings to avoid deep recursion
    = T extends `${string}${"-" | "_" | " "}${string}`
        ? LimitedPascalCase<T>
        : T extends `${infer First}${infer Rest}`
            ? First extends "-" | "_" | " "
                ? RecursivePascalCase<Rest, true> // Skip delimiter, capitalize next
                : CapNext extends true
                    ? `${Uppercase<First>}${RecursivePascalCase<Rest, false>}`
                    : `${Lowercase<First>}${RecursivePascalCase<Rest, false>}`
            : "";

/**
 * Handles camelCase strings by detecting uppercase letters as word boundaries
 */
type HandleCamelCase<T extends string, Result extends string = "">
    = T extends `${infer First}${infer Rest}`
        ? Uppercase<First> extends First
            ? Lowercase<First> extends First
                ? HandleCamelCase<Rest, `${Result}${First}`> // Number or special char
                : Result extends ""
                    ? HandleCamelCase<Rest, First> // First char is uppercase
                    : HandleCamelCase<Rest, `${Result}${First}`> // Uppercase in middle
            : Rest extends `${infer Next}${string}`
                ? Uppercase<Next> extends Next
                    ? Lowercase<Next> extends Next
                        ? HandleCamelCase<Rest, `${Result}${Lowercase<First>}`> // Next is special
                        : HandleCamelCase<Rest, `${Result}${Lowercase<First>}-`> // Add delimiter before uppercase
                    : HandleCamelCase<Rest, `${Result}${Lowercase<First>}`> // Normal lowercase
                : `${Result}${Lowercase<First>}` // Last character
        : Result;

/**
 * Simplified PascalCase conversion that uses recursive approach for delimited strings
 */
type PascalCaseSimple<T extends string>
= T extends `${string}-${string}` | `${string}_${string}` | `${string} ${string}`
    ? RecursivePascalCase<T>
    : T extends `${infer _First}${infer Rest}`
        ? Rest extends `${string}${Uppercase<string>}${string}`
            ? RecursivePascalCase<HandleCamelCase<T>> // Convert camelCase to delimited then to PascalCase
            : Capitalize<T> // Simple string, just capitalize
        : Capitalize<T>;

/**
 * Converts a string literal type to a **PascalCase** representation.
 * ```ts
 * // "FooBar"
 * type T = PascalCase<"fooBar">;
 * type T = PascalCase<"foo-bar">;
 * type T = PascalCase<"foo_bar">;
 * type T = PascalCase<"\n foo_bar \t">;
 * ```
 */
export type PascalCase<
    T extends string | readonly unknown[],
> = string extends T
    ? string
    : T extends string
        ? IsAllCaps<T> extends true
            ? PascalCaseSimple<Lowercase<Trim<T>>>
            : PascalCaseSimple<Trim<T>>
        : T extends readonly unknown[]
            ? {
                [K in keyof T]: T[K] extends string
                    ? PascalCase<T[K]>
                    : T[K]
            }
            : never;

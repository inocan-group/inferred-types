import type { PascalCase, Trim, IsAllCaps } from "inferred-types/types";

/**
 * Direct camelCase conversion that leverages optimized PascalCase
 */
type CamelCaseSimple<T extends string> = 
    IsAllCaps<T> extends true
        ? Uncapitalize<PascalCase<Lowercase<Trim<T>>>>
        : Uncapitalize<PascalCase<Trim<T>>>;

/**
 * **CamelCase**`<TString>`
 *
 * Converts a string to `CamelCase` format.
 */
export type CamelCase<
    T extends string | readonly unknown[],
    TPreserve extends boolean = false,
> = string extends T
    ? string
    : T extends string
        ? CamelCaseSimple<T>
        : T extends readonly unknown[]
            ? {
                [K in keyof T]: T[K] extends string
                    ? CamelCase<T[K], TPreserve>
                    : T[K]
            }
            : never;

/**
 * Returns the first `string` value from an array of values
 */
export type FirstString<T extends readonly unknown[]>
    = T extends [infer S, ...unknown[]]
        ? S extends string ? S : never
        : never;

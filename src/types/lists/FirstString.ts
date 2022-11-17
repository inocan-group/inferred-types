/**
 * returns the first `string` value from an array of values
 */
export type FirstString<T> = T extends [infer S extends string, ...unknown[]] ? S : never;

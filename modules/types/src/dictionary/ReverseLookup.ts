/**
 * **ReverseLookup**`<T>`
 *
 * Inverts a table of string to string lookups so that the values
 * can now lookup the keys.
 *
 * Uses mapped types for O(1) complexity instead of recursive processing,
 * significantly improving performance for large mappings while preserving
 * narrow literal types.
 */
export type ReverseLookup<
    T extends Record<string, string>,
> = {
    [K in keyof T as T[K]]: K
};

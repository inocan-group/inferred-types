import type { As, AsString } from "inferred-types/types";

/**
 * **ToStringArray**`<T>`
 *
 * Receives a tuple of values and converts each item
 * into a _string_ value using the `ToString<T>` utility.
 */
export type ToStringArray<T extends readonly unknown[]> = As<{
    [K in keyof T]: AsString<T[K]>
}, readonly string[]>;

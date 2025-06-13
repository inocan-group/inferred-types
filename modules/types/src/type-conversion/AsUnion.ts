/**
 * **AsUnion**`<T>`
 *
 * Converts any tuple into a union based on the tuples elements. Otherwise,
 * simply passes `T` through unchanged.
 */
export type AsUnion<T> = T extends readonly any[]
    ? T[number]
    : T;

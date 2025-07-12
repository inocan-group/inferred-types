import type { IsEqual, IsNever, Or } from "inferred-types/types";

/**
 * **AreIncompatible**`<T, U>`
 *
 * Checks if two types are fundamentally incompatible and can never be equal.
 * For example, string and number are incompatible, but string and string | number
 * are not incompatible because they could overlap.
 */
export type AreIncompatible<T, U> =
    // If either is never, they're not incompatible (never is bottom type)
    Or<[IsNever<T>, IsNever<U>]> extends true
        ? false
    // Check if there's no overlap between the types
    : [T] extends [U]
        ? false
        : [U] extends [T]
            ? false
            // Special cases for primitives that are incompatible
            : [T, U] extends [string, number]
                ? true
                : [T, U] extends [number, string]
                    ? true
                    : [T, U] extends [string, boolean]
                        ? true
                        : [T, U] extends [boolean, string]
                            ? true
                            : [T, U] extends [number, boolean]
                                ? true
                                : [T, U] extends [boolean, number]
                                    ? true
                                    : [T, U] extends [string, null]
                                        ? true
                                        : [T, U] extends [null, string]
                                            ? true
                                            : [T, U] extends [number, null]
                                                ? true
                                                : [T, U] extends [null, number]
                                                    ? true
                                                    : [T, U] extends [boolean, null]
                                                        ? true
                                                        : [T, U] extends [null, boolean]
                                                            ? true
                                                            : [T, U] extends [string, undefined]
                                                                ? true
                                                                : [T, U] extends [undefined, string]
                                                                    ? true
                                                                    : [T, U] extends [number, undefined]
                                                                        ? true
                                                                        : [T, U] extends [undefined, number]
                                                                            ? true
                                                                            : [T, U] extends [boolean, undefined]
                                                                                ? true
                                                                                : [T, U] extends [undefined, boolean]
                                                                                    ? true
                                                                                    : false;

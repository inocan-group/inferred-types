import type { AlphaChar, AsArray, Chars, If, IfAllExtend, IsStringLiteral } from "inferred-types/types";

/**
 * **Alpha**`<T>`
 *
 * Converts `T` to _never_ if `T` is not a alphabetic string. Possible values are:
 *
 * - `T` - when T is a string literal and characters are alphabetic
 * - `string` - when T is a wide string type
 * - `never` - all other types of `T` are converted to never
 */
export type Alpha<T> = T extends string
    ? If<
        IsStringLiteral<T>,
        IfAllExtend<AsArray<Chars<T>>, AlphaChar, T, never>,
        string
    >
    : never;

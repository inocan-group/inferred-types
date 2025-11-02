import {
    Chars,
    Every,
    HexadecimalChar,
    IsBetweenInclusively,
    Length,
    Trim
} from "inferred-types/types";


/**
 * **IsHexColor**`<T>`
 *
 * Boolean operator which tests whether `T` is a valid hex color string.
 *
 * - string must start with `#`
 * - remaining characters must be valid hexadecimal characters
 * - between 1 and 6 hexadecimal digits
 */
export type IsHexColor<T> = T extends `#${infer Rest}`
? Trim<Rest> extends ""
    ? false
    : Chars<Rest> extends infer C extends readonly string[]
        ? Every<C, "extends", [HexadecimalChar]> extends true
            ? IsBetweenInclusively<Length<Rest>, 1, 6>
            : false
    : false
: false;


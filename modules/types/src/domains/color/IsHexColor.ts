import {
    Chars,
    Every,
    HexadecimalChar,
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
 * - must be either 3 or 6 hexadecimal digits
 *     - if only 3 digits are present then it is assumed this
 *       represents the CSS shorthand rule of converting each
 *       digit into two digits (e.g., `#FA9` to `#FFAA99`)
 */
export type IsHexColor<T> = T extends `#${infer Rest}`
? Trim<Rest> extends ""
    ? false
    : Chars<Rest> extends infer C extends readonly string[]
        ? Every<C, "extends", [HexadecimalChar]> extends true
            ? Length<Rest> extends 3
                ? true
                : Length<Rest> extends 6
                    ? true
                : false
            : false
    : false
: false;


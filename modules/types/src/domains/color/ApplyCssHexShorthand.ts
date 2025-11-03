import type {
    AsString,
    Chars,
    Concat,
    Err,
    IsHexadecimal,
    Join,
    Length
} from "inferred-types/types";

type WrongType<T> = Err<
    `invalid-type/hexadecimal`,
    `The value passed into ApplyCssHexShorthand<T> -- ${AsString<T>} -- was not able to be treated as a hexadecimal color value!`,
    { hex: T }
>;

type NonHexString<T extends string> = Err<
    `invalid-type/hexadecimal`,
    `The string passed into ApplyCssHexShorthand<T> -- ${T} -- was not able to be treated as a hexadecimal color value!`,
    { hex: T }
>;

type WrongLength<T extends string> = Err<
    `invalid-type/hexadecimal`,
    `The hexadecimal number component of a CSS color must be either 3 or 6 characters long but was ${Length<T>}!`
>;

type Apply<
    T extends string,
    C extends readonly string[] = Chars<T>
> = string extends T
    ? string | Error
    : IsHexadecimal<T> extends true
        ? Length<T> extends 3
            ? Join<{
                [K in keyof C]: `${C[K]}${C[K]}`
            }>
            : Length<T> extends 6
                ? T
                : WrongLength<T>
        : NonHexString<T>;

/**
 * **ApplyCssHexShorthand**`<T>`
 *
 * Allows conversion of a 3 digit hexadecimal value to be
 * converted to a full 6 digit hexadecimal value for RGB color
 * purposes.
 *
 * - you can keep or remove the leading `#` and this utility
 *   will still work.
 *    - strings _without_ a leading `#` will be returned _without_
 *      a leading `#`
 * - hexadecimal values with 6 characters will be _passed through_
 *   with no change to type
 * - hexadecimal values with 3 characters will "double" each character
 *   (e.g., `fa9` -> `ffaa99`); this is consistent with CSS shorthand rules
 * - any non-hex value or hex-value of the wrong length will return
 *   a `invalid-type/hexadecimal` error.
 */
export type ApplyCssHexShorthand<T>
    = T extends string
        ? T extends `#${infer Rest}`
            ? Concat<[
                "#",
                Apply<Rest>
            ]>
            : Apply<T>
        : WrongType<T>;

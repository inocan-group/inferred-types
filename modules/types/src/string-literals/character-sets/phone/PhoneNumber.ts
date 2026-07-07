import type {
    As,
    Err,
    IsNumericLiteral,
    IsStringLiteral,
    NumericChar,
    PhoneCountryCode,
    PhoneNumberDelimiter,
    StripChars,
    Trim,
} from "inferred-types/types";

type AllowedPhoneChar = NumericChar | "+" | " " | "-" | "." | "(" | ")";

type CountDigits<
    T extends string,
    R extends readonly unknown[] = []
> = T extends `${infer Head}${infer Rest}`
    ? Head extends NumericChar
        ? CountDigits<Rest, [...R, unknown]>
        : CountDigits<Rest, R>
    : R["length"];

type HasValidDigitCount<T extends string> = CountDigits<T> extends 7 | 10 | 11 | 12 | 13 | 14
    ? true
    : false;

type HasValidCountryCode<T extends string> = Trim<T> extends `+${infer Code} ${string}`
    ? Code extends PhoneCountryCode
        ? true
        : false
    : Trim<T> extends `00${infer Code} ${string}`
        ? Code extends PhoneCountryCode
            ? true
            : false
        : true;

type Process<
    T extends string,
    _TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter,
> = StripChars<Trim<T>, AllowedPhoneChar> extends ""
    ? HasValidCountryCode<T> extends true
        ? HasValidDigitCount<T> extends true
            ? T
            : Err<"invalid-phone-number">
        : Err<"invalid-phone-number">
    : Err<"invalid-phone-number">;

/**
 * **PhoneNumber**`<[T]>`
 *
 * Without use of the generic `T`, provides a basic shape for phone
 * numbers which should keep people on good behavior when
 * accepting phone numbers.
 *
 * When passing a string into `T`, this utility will do a lot more
 * validity checking on the value.
 *
 * - Only valid characters (numeric, whitespace, `+`, `-`, `.`, and parenthesis)
 * - all _leading_ and _trailing_ whitespace removed for remaining comparisons
 * - at least 7 numeric characters
 *    - 8 if `+` character used as leading character (after whitespace)
 *    - 10 if `00` are leading characters
 * - leading character (after whitespace) must be numeric, `(` or `+`
 *
 * - Related: `PhoneNumberWithCountryCode`, `UsPhoneNumber`
 */
export type PhoneNumber<
    T extends number | string | null = null,
    TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter,
> = T extends null
    ? `${number}${TDelimiter}${number}`
        | `${number}${TDelimiter}${number}${TDelimiter}${number}`
        | `(${number}) ${number}${TDelimiter}${number}`
        | `+${PhoneCountryCode} ${number}${TDelimiter}${number}${TDelimiter}${number}`
        | `00${PhoneCountryCode} ${number}${TDelimiter}${number}${TDelimiter}${number}`
    : IsStringLiteral<T> extends true
        ? Process<As<T, string>, TDelimiter>
        : IsNumericLiteral<T> extends true
            ? Process<`${As<T, number>}`, TDelimiter>
            : T extends string
                ? string | Err<"invalid-phone-number">
                : T extends number
                    ? number | Err<"invalid-phone-number">
                    : never;

export type PhoneNumberWithCountryCode = `+${PhoneCountryCode} ${string}`;

type Sep = "." | " " | "-";
type AreaCode = `(${number}) ` | `${number}${Sep}`;
type Local = `${number}${Sep}${number}`;

/**
 * A US-only phone number which requires starting with the country code.
 */
export type UsPhoneNumber = `+1 ${AreaCode}${Local}`;

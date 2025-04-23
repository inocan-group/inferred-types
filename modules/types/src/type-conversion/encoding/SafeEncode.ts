import type {
    EscapedSafeEncodingConversion,
    IsStringLiteral,
    ReplaceAllFromTo,
    SafeEncodingConversion,
    SafeEncodingGroup,
    SafeString,
} from "inferred-types/types";

/**
 * **SafeEncode**`<T, [G]>`
 *
 * Encodes string into a `SafeString<T>` using some or all of the
 * "safe key" groups. Groups are:
 *
 * - "whitespace"
 * - "quotes"
 * - and "brackets"
 *
 * By default ALL are used.
 *
 * **Related:** `SafeEncodeEscaped`
 */
export type SafeEncode<
    T extends string,
    G extends readonly SafeEncodingGroup[] = ["whitespace", "brackets", "quotes"],
> = IsStringLiteral<T> extends true
    ? ReplaceAllFromTo<T, SafeEncodingConversion<G>>
    : SafeString<string, G>;

/**
 * **SafeEncodingEscaped**`<T,[G]>`
 *
 * Looks for _escaped characters_ in `T` and applies safe encoding to
 * only those characters which have been explicitly marked via the `\`
 * escape notation.
 */
export type SafeEncodeEscaped<
    T extends string,
    G extends readonly SafeEncodingGroup[] = ["whitespace", "brackets", "quotes"]
> = IsStringLiteral<T> extends true
    ? ReplaceAllFromTo<T, EscapedSafeEncodingConversion<G>>
    : SafeString<string, G>;

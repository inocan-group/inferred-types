import type {
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
 */
export type SafeEncode<
    T extends string,
    G extends readonly SafeEncodingGroup[] = ["whitespace", "brackets", "quotes"],
> = IsStringLiteral<T> extends true
    ? ReplaceAllFromTo<T, SafeEncodingConversion<G>>
    : SafeString<string, G>;

import type {
    IsStringLiteral,
    ReplaceAllFromTo,
    SafeDecodingConversion,
    SafeEncodingGroup,
} from "inferred-types/types";

/**
 * **SafeDecode**`<T, [G]>`
 *
 * Decodes an encoded `SafeString` back to a normal string.
 * Groups are:
 *
 * - "whitespace"
 * - "quotes"
 * - and "brackets"
 *
 * By default ALL are used.
 */
export type SafeDecode<
    T extends string,
    G extends readonly SafeEncodingGroup[] = ["whitespace", "brackets", "quotes"],
> = IsStringLiteral<T> extends true
    ? ReplaceAllFromTo<T, SafeDecodingConversion<G>>

    : string;

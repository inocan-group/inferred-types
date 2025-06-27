import type { SAFE_STRING } from "inferred-types/constants";
import type { SafeDecode, SafeEncodingGroup } from "inferred-types/types";

export type SafeStringSymbol = typeof SAFE_STRING;

/**
 * **SafeString**
 *
 * A string which was encoded using `safeEncode()` runtime utility or `SafeEncode<T>` type
 * utility. It is a string which has had one of several "groups" of characters replaced
 * (aka., encoded) into a safe token value.
 *
 * - use `safeDecode()` or `SafeDecode<T>` utilities to move back to the original string value.
 */
export type SafeString<
    T extends string = string,
    G extends readonly SafeEncodingGroup[] = SafeEncodingGroup[],
> = T & {
    SafeStringSymbol: "SafeString";
    groups: G;
    origin: SafeDecode<T, G>;
    encoded: T;
};

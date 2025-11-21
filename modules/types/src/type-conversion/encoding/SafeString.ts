import type { Brand, SafeDecode, SafeEncodingGroup } from "inferred-types/types";

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
> = Brand<T, "SafeString", {
    groups: G;
    origin: SafeDecode<T, G>;
    encoded: T;
}>;

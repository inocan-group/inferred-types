import type {
    AsString,
    DomainName,
    GetUrlProtocolPrefix,
    GetUrlSource,
    Ip4Address,
    Ip6Address,
    Ip6Subnet,
    IsWideString,
    UrlPath,
} from "inferred-types/types";
import {
    asChars,
    getUrlQueryParams,
    isAlpha,
    isNumberLike,
    removeUrlProtocol,
} from "inferred-types/runtime";
import { isString } from "./isString";

/**
 * **isIp4Address**`(val)`
 *
 * Type guard which checks whether the value is a valid IPv4 address.
 */
export function isIp4Address<T>(val: T): val is T & Ip4Address {
    const octets: string[] = isString(val) ? val.split(".") : [];
    return isString(val)
        && (octets.length === 4)
        && (octets.every(i => isNumberLike(i)))
        && octets.every(i => Number(i) >= 0 && Number(i) <= 255)
        && octets.every(i => `${Number(i)}` === i);
}

/**
 * **isIp6Subnet**`(val,[mask])`
 *
 * Type guard which validates that `val` is a valid IPv6 subnet.
 *
 * - optionally allows for isolating a particular subnet mask
 */
export function isIp6Subnet<T extends number>(
    val: string,
    mask?: T,
): val is Ip6Subnet {
    // Trim and split the input
    const trimmed = val.trim();
    const parts = trimmed.split("/");

    // Must have exactly two parts: address and mask
    if (parts.length !== 2)
        return false;

    const [address, maskPart] = parts;

    // Validate mask is a numeric string
    if (!/^\d+$/.test(maskPart))
        return false;
    const numericMask = Number.parseInt(maskPart, 10);

    // Validate mask range
    if (numericMask < 0 || numericMask > 128)
        return false;

    // Validate IPv6 address portion
    if (!isIp6Address(address))
        return false;

    // Check optional mask parameter
    return mask === undefined || numericMask === mask;
}

/**
 * **isIp6Address**`(val)`
 *
 * Comprehensive type guard for IPv6 addresses with:
 * - Full [RFC 4291](https://www.rfc-editor.org/rfc/rfc4291.html) validation
 * - Compression handling
 * - Zone index exclusion
 */
export function isIp6Address<T>(val: T): val is T & Ip6Address {
    if (typeof val !== "string")
        return false;
    const str = val.trim();

    // Basic structural checks
    if (str.length < 2 || str.length > 45)
        return false;
    if (str.includes("/"))
        return false;
    if ((str.match(/::/g) || []).length > 1)
        return false;
    if (/^::.+::/.test(str))
        return false;
    if (/^:[^:]/.test(str) || /[^:]:$/.test(str))
        return false;

    // New: Detect 3+ consecutive colons anywhere
    if (/:{3,}/.test(str))
        return false;

    // Split and validate parts
    const [before = "", after = ""] = str.split("::");
    const beforeParts = before.split(":").filter(Boolean);
    const afterParts = after.split(":").filter(Boolean);
    const totalParts = beforeParts.length + afterParts.length;

    // Validate group count
    if (str.includes("::")) {
        if (totalParts > 7)
            return false;
        if (str === "::")
            return true;
    }
    else {
        if (beforeParts.length !== 8)
            return false;
    }

    // Validate individual parts
    const allParts = [...beforeParts, ...afterParts];
    return allParts.every(part =>
        /^[0-9a-f]{1,4}$/i.test(part),
    );
}

type IsIpAddress<T> = IsWideString<T> extends true
    ? Ip6Address | Ip4Address
    : T extends `${string}:${string}`
        ? Ip6Address
        : T extends `${string}.${string}`
            ? Ip4Address
            : never;

/**
 * **isIpAddress**`(val)`
 *
 * Type guard which checks whether the value is a valid IP address (v4 or v6).
 */
export function isIpAddress<T>(val: T): val is T & IsIpAddress<T> {
    return isIp4Address(val) || isIp6Address(val);
}

/**
 * **hasUrlPort**`(val)`
 *
 * Type guard which tests whether there is an explicit _port_ reference
 * in the passed in URL (versus implicitly using the default port of the
 * protocol)
 */
export function hasUrlPort<T>(val: T): val is T & `${GetUrlProtocolPrefix<T>}${GetUrlSource<AsString<T>>}:${number}${string}` {
    return isString(val) && removeUrlProtocol(val).includes(":");
}

/**
 * **isUrlPath**`(val)`
 *
 * Type guard which checks whether the value is a valid `UrlPath`
 */
export function isUrlPath<T>(val: T): val is T & UrlPath {
    return isString(val)
        && (val === "" || val.startsWith("/"))
        && (
            asChars(val).every(
                c => isAlpha(c)
                    || isNumberLike(c)
                    || c === "_"
                    || c === "@"
                    || c === "."
                    || c === "-",
            )
        );
}

/**
 * **isDomainName**`(val)`
 *
 * Type guard which checks whether the value is a valid DNS domain name
 */
export function isDomainName<T>(val: T): val is T & DomainName<AsString<T>> {
    return isString(val)
        && val.split(".").filter(i => i).length > 1
        && isString(val.split(".").filter(i => i).pop())
        && asChars(val.split(".").filter(i => i).pop() as string).length > 1
        && val.split(".").filter(i => i).every(
            i => isAlpha(i) || isNumberLike(i) || i === "-" || i === "_",
        );
}

/**
 * **isUrlSource**`(val)`
 *
 * Type guard which checks whether the value is a valid URL source
 * (aka, an IP address or a Domain Name)
 */
export function isUrlSource<T>(val: T) {
    return isDomainName(val) || isIpAddress(val);
}

/**
 * **hasUrlQueryParameter**`(val,prop)`
 *
 * Tests whether the valued in has a query parameter specified by `prop`.
 */
export function hasUrlQueryParameter<T extends string, P extends string>(val: T, prop: P) {
    return isString(getUrlQueryParams(val, prop));
}

import type { IPv6 } from "inferred-types/constants";
import type {
  HexadecimalChar,
  IsGreaterThan,
  IsLessThan,
  IsStringLiteral,
  IsWideNumber,
  NumericChar,
  NumericCharZeroToFive,
  Opt,
  ReplaceAll,
  StripTrailing,
  Suggest,
} from "inferred-types/types";

/**
 * **IPv4Number**
 *
 * A high resolution typing for a single octet of an **IP version 4** IP address.
 */
export type Ip4Octet =
  | `25${NumericCharZeroToFive}`
  | `24${NumericChar}`
  | `23${NumericChar}`
  | `22${NumericChar}`
  | `21${NumericChar}`
  | `20${NumericChar}`
  | `1${NumericChar}${NumericChar}`
  | `${NumericChar}${NumericChar}`
  | `${NumericChar}`;

export type Ip4NetmaskSuggestion = Suggest<[
  `10.0.0.0/8`,
  `192.168.0.0/16`,
  `172.16.0.0/16`,
  `10.10.${number}.0/24`,
  `192.168.${number}.0/24`,
  `172.16.${number}.0/24`,
]>;

export type Ip4Netmask8 = `${number}.0.0.0/8`;
export type Ip4Netmask16 = `${number}.${number}.0.0/16`;
export type Ip4Netmask24 = `${number}.${number}.${number}.0/24`;
export type Ip4Netmask32 = `${number}.${number}.${number}.${number}/32`;

/**
 * **Rfc1812Like**
 *
 * IPv4 addresses which are deemed to be non-public IP addressed based on the
 * [RFC 1812](https://datatracker.ietf.org/doc/html/rfc1812).
 *
 * To fully enforce this type, you need runtime checking so this type just
 * constrains to the general shape of these IP addresses.
 *
 * Use `isRfc1812()` type guard to establish a verified RFC1812 IP address.
 */
export type Rfc1812Like = `192.168.${number}.${number}`
  | `172.16.${number}.${number}`
  | `10.${number}.${number}.${number}`;

declare const __rfc1812: unique symbol;

/**
 * **Rfc1812**
 *
 * A verified/branded version of `Rfc1812Like` which has been passed through the
 * `isRfc1812()` type guard.
 */
export type Rfc1812 = Rfc1812Like & {
  [__rfc1812]: "Rfc1812";
};

/**
 * **Ip4SubnetLike**
 *
 * A type which includes patterns for `/8`, `/16`, `/24`, and `/32` netmasks.
 *
 * - the actual "type" is too complex to fully represent in Typescript
 * - this type _allows_ all valid variants and provides some help to avoid mistakes
 * - use `isIp4Netmask()` type guard to get the branded type `IpNetmask`
 */
export type Ip4SubnetLike = Ip4Netmask8 | Ip4Netmask16 | Ip4Netmask24 | Ip4Netmask32;

declare const __ip4netmask: unique symbol;

/**
 * A verified/branded IPv4 Netmask
 *
 * - use `isIp4Netmask()` type guard to upgrade `Ip4NetmaskLike` types
 * to (or any _string_ actually) to verified types.
 */
export type Ip4Subnet = Ip4SubnetLike & {
  [__ip4netmask]: "Ip4Netmask";
};

/**
 * the range of IPv6 addresses which are considered **multicast**.
 */
export type IP6Multicast = typeof IPv6["Multicast"];

/**
 * the range of IPv6 addresses which are considered **unicast**.
 */
export type IP6Unicast = typeof IPv6["Unicast"];

/**
 * the range of IPv6 addresses which are considered **loopback** addresses.
 */
export type Ip6Loopback = typeof IPv6["Loopback"];

/**
 * **Ip4AddressLike**
 *
 * A simple representation of an IPv4 addresses shape.
 *
 * - use `isIp4Address()` type guard to upgrade to the branded `Ip4Address`
 */
export type Ip4AddressLike = `${number}.${number}.${number}.${number}`;

declare const __ip4address: unique symbol;

/**
 * **Ip4Address**
 *
 * A verified/valid IPv4 Address.
 *
 * - use the `isIp4Address()` type guard to get to this type
 * - alternatively the `Ip4AddressLike` type gives you the basic shape to
 * work with.
 */
export type Ip4Address = Ip4AddressLike & {
  [__ip4address]: "Ip4Address";
};

export type Ip6AddressFull = `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`;

/**
 * **Ip6GroupExpansion**`<T>`
 *
 * Expands an IPv6's address by changing
 */
export type Ip6GroupExpansion<T> = T extends string
  ? IsStringLiteral<T> extends true
    ? StripTrailing<ReplaceAll<T, "::", ":0000:">, ":">
    : string
  : never;

/**
 * **Ip6Group**
 *
 * An IPv6 address consists of 8 groups of 4 hexidecimal digits. Typing this completely
 * would overwhelm Typescript's type system so this is meant to _represent_ one of the
 * groups in an address.
 */
export type Ip6Group = `${HexadecimalChar}${string}`;

/**
 * **Ip6AddressLike**
 *
 * A type which aims to represent the shape of an IPv6 address.
 *
 * - a valid address is too complex to type in Typescript
 * - use `isIp6Address()` type guard to upgrade to the verified `Ip6Address` type
 *
 * **Notes:**
 *
 * - a full representation is 8 groups of 4 hexadecimal characters and
 * is _rarely_ used as it's just way too much specificity for most situations.
 * It is also impossible to type this in a strong manner due to the huge optionality.
 * - in a full representation you may drop the leading 0's (and it's considered
 * best practice to do so)
 * - if one of the groups is all zeros you can simply express it as `::`
 *
 * **Related:** `Ip6Address`, `Ip6Subnet`, `Ip6SubnetLike`
 */
export type Ip6AddressLike = (
  `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`
  | `${string}::${string}`
  | `${string}:${string}`
  | Ip6Subnet
);

declare const __ip6address: unique symbol;

/**
 * **Ip6Address**
 *
 * A branded/verified IPv6 Address
 */
export type Ip6Address = Ip6AddressLike & {
  [__ip6address]: "Ip6Address";
};

type Ip6_Groups<T extends number> = T extends 96
  ? `${string}:${string}:${string}:${string}:${string}:${string}::/96`
  : T extends 80
    ? `${string}:${string}:${string}:${string}:${string}::/80`
    : T extends 64
      ? `${string}:${string}:${string}:${string}::/64`
      : T extends 48
        ? `${string}:${string}:${string}::/48`
        : T extends 32
          ? `${string}:${string}::/32`
          : T extends 16
            ? `${string}::/16`
            : IsGreaterThan<T, 96> extends true
              ? `${string}:${string}:${string}:${string}:${string}:${string}${Opt<`:${string}`>}::/${T}`
              : IsGreaterThan<T, 80> extends true
                ? `${string}:${string}:${string}:${string}:${string}${Opt<`:${string}`>}::/${T}`
                : IsGreaterThan<T, 64> extends true
                  ? `${string}:${string}:${string}:${string}${string}${Opt<`:${string}`>}::/${T}`
                  : IsGreaterThan<T, 48> extends true
                    ? `${string}:${string}:${string}${Opt<`:${string}`>}::/${T}`
                    : IsGreaterThan<T, 32> extends true
                      ? `${string}:${string}${Opt<`:${string}`>}::/${T}`
                      : IsGreaterThan<T, 16> extends true
                        ? `${string}${Opt<`:${string}`>}::/${T}`
                        : never;

/**
 * **IP6SubnetLike**`<[TMask]>`
 *
 * Represents the shape of an IPv6 subnet.
 *
 * When an organization or even an individual receives IPv6 addresses they almost
 * always receive MANY ip addresses (aka, a subnet of addresses). The most
 * common subnet masks are `48` (for organizations) and `64` (for individuals).
 *
 * ```ts
 * // `${string}:${string}::/32`
 * IpSubnet<32>
 * // `${string}:${string}:${string}::/48`
 * IpSubnet<48>
 * // `${string}:${string}:${string}:${string}::/64`
 * IpSubnet<64>
 * ```
 *
 * **Related:** `Ip6Subnet`
 */
export type Ip6SubnetLike<
  TMask extends number = number,
> = IsWideNumber<TMask> extends true
  ? `${string}::/${number}`
  : IsLessThan<TMask, 16> extends true
    ? never
    : IsGreaterThan<TMask, 128> extends true
      ? never
      : Ip6_Groups<TMask>;

declare const __ip6subnet: unique symbol;

/**
 * **Ip6Subnet**
 *
 * Is a branded type which comes from passing the validation of
 * the `isIp6Subnet()` runtime validator.
 */
export type Ip6Subnet = Ip6SubnetLike & {
  [__ip6subnet]: "Ip6Subnet";
};

export type SuggestIp6SubnetMask = Suggest<"16" | "32" | "48" | "56" | "64">;

/**
 * **SuggestIpAddress**
 *
 * Some simple examples of IP addresses which can be given as a
 * suggested set of string where people need to enter an **IPv4**
 * address.
 */
export type SuggestIpAddress = Suggest<"192.168.1.1" | "10.10.1.1" | "172.168.1.1">;

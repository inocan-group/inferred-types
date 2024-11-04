import {
  AsString,
  HexadecimalChar,
  IsStringLiteral,
  NumericChar,
  NumericCharZeroToFive,
  ReplaceAll,
  StripTrailing,
  Suggest,
  UnionToTuple
} from "src/types/index";
import  { IPv6 } from "src/constants/index";

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


export type Ip4NetmaskSuggestion<TVlan extends readonly number[] = [1,10]> = Suggest<[
  `10.0.0.0/8`,
  `192.168.0.0/16`,
  `172.16.0.0/16`,
  `10.10.${AsString<UnionToTuple<TVlan>>}.0/24`,
  `192.168.${AsString<UnionToTuple<TVlan>>}.0/24`,
  `172.16.${AsString<UnionToTuple<TVlan>>}.0/24`,
]>;

export type Ip4Netmask8 = `${Ip4Octet}.0.0.0/8`;
export type Ip4Netmask16 = `${Ip4Octet}.${number}.0.0/16`;
export type Ip4Netmask24 = `${Ip4Octet}.${number}.${number}.0/24`;
export type Ip4Netmask32 = `${number}.${number}.${number}.${number}/32`;

/**
 * **Ip4Netmask**
 *
 * A type which includes patterns for `/8`, `/16`, `/24`, and `/32` netmasks
 */
export type Ip4Netmask = Ip4Netmask8 | Ip4Netmask16 | Ip4Netmask24 | Ip4Netmask32;


/**
* the range of IPv6 addresses which are considered **multicast**.
*/
export type IP6Multicast = typeof IPv6["Multicast"];

/**
* the range of IPv6 addresses which are considered **unicast**.
*/
export type IP6Unicast = typeof IPv6["Unicast"];

export type Ip6Loopback = typeof IPv6["Loopback"];

export type Ip6Group = `${HexadecimalChar}${string}`;


/**
 * **Ipv4**
 *
 * A simple representation of an IPv4 address
 */
export type Ip4Address = `${number}.${number}.${number}.${number}`;


export type Ip6AddressFull = `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`;

export type Ip6AddressLoose = `${HexadecimalChar}${string}:${string}`

/**
 * **Ip6GroupExpansion**`<T>`
 *
 * Expands an IPv6's address by changing
 */
export type Ip6GroupExpansion<T> = T extends string
? IsStringLiteral<T> extends true
  ? StripTrailing<ReplaceAll<T,"::", ":0000:">, ":">
  : string
: never;



/**
 * An IPv6 Address
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
 * Rather than expressing a _specific_ IPv6 address the more common thing
 * is to express an **IP subnet** owned by an organization or an individual.
 *
 * **Related:** `Ip6Subnet`
 */
export type Ip6Address =
| `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`
| `${string}::${string}:${string}:${string}:${string}:${string}:${string}`
| `${string}:${string}::${string}:${string}:${string}:${string}:${string}`
| `${string}:${string}:${string}::${string}:${string}:${string}:${string}`
| `${string}:${string}:${string}:${string}::${string}:${string}:${string}`
| `${string}:${string}:${string}:${string}:${string}::${string}:${string}`
| `${string}:${string}:${string}:${string}:${string}:${string}::${string}`
| `${string}:${string}:${string}:${string}:${string}:${string}:${string}::`;



export type Ip6SubnetPrefix = `${string}:${string}:${string}:${string}`;

export type AsIp6Prefix<
  T extends readonly Ip6Group[]
> = T extends [Ip6Group]
? `${T[0]}:${string}:${string}:${string}`
: T extends [Ip6Group,Ip6Group]
? `${T[0]}:${T[1]}:${string}:${string}`
: T extends [Ip6Group,Ip6Group,Ip6Group]
? `${T[0]}:${T[1]}:${T[2]}:${string}`
: T extends [Ip6Group,Ip6Group,Ip6Group,Ip6Group,...Ip6Group[]]
? `${T[0]}:${T[1]}:${T[3]}:${T[4]}`
: `${string}:${string}:${string}:${string}`;

/**
 * An IPv6 subnet.
 *
 * When an organization or even an individual receives IPv6 addresses they almost
 * always receive MANY ip addresses (aka, a subnet of addresses). The most
 * common subnet masks are `48` (for organizations) and `64` for individuals.
 *
 * ```ts
 * // 2001:db8:1:1::/64
 * IpSubnet<"2001:db8:1:1",64>
 * ```
 */
export type Ip6Subnet<
  TPrefix extends Ip6SubnetPrefix = Ip6SubnetPrefix,
  TMask extends number = number
> = `${TPrefix}::/${TMask}`;


/**
 * **SuggestIpAddress**
 *
 * Some simple examples of IP addresses which can be given as a
 * suggested set of string where people need to enter an **IPv4**
 * address.
 */
export type SuggestIpAddress = Suggest<"192.168.1.1" | "10.10.1.1" | "172.168.1.1">;

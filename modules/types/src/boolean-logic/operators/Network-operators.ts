import type {
    AfterFirst,
    And,
    BeforeLast,
    First,
    GetUrlQueryParams,
    HasOtherCharacters,
    Ip4AddressLike,
    Ip4Octet,
    Ip6Address,
    Ip6AddressFull,
    Ip6GroupExpansion,
    Ip6Subnet,
    IsGreaterThan,
    IsLessThan,
    IsStringLiteral,
    Last,
    Length,
    LowerAlphaChar,
    NumericChar,
    Split,
    SplitAlt,
} from "inferred-types/types";

/**
 * **IsIp4Octet**`<T>`
 *
 * Checks whether `T` is a valid IPv4Octet.
 */
export type IsIp4Octet<T> = T extends number
    ? IsIp4Octet<`${T}`>
    : T extends string
        ? IsStringLiteral<T> extends true
            ? T extends Ip4Octet
                ? true
                : false
            : boolean
        : false;

/**
 * **IsHexadecimal**`<T>`
 *
 * Boolean operator which tests the string `T` to ensure
 * all characters are valid hexadecimal digits/chars.
 */
export type IsHexadecimal<T> = T extends string
    ? IsStringLiteral<T> extends true
        ? HasOtherCharacters<
            Lowercase<T>,
      NumericChar | "a" | "b" | "c" | "d" | "e" | "f"
        > extends true
            ? false
            : true
        : boolean
    : false;

/**
 * **IsIp6HexGroup**`<T>`
 *
 * Tests whether `T` is a valid hexadecimal group for an IP6
 * Group. To be valid means:
 *
 * - each digit must be a hexadecimal digit
 * - There will be between 1 and 4 digits
 */
export type IsIp6HexGroup<T> = T extends string
    ? IsStringLiteral<T> extends true
        ? IsLessThan<Length<T>, 5> extends true
            ? IsGreaterThan<Length<T>, 0> extends true
                ? IsHexadecimal<T>
                : false
            : false
        : boolean
    : false;

type DeepOctetCheck<
    T extends readonly string[],
> = [] extends T
    ? true
    : IsIp4Octet<First<T>> extends true
        ? DeepOctetCheck<
            AfterFirst<T>
        >
        : false;

/**
 * **IsIp4Address**`<T>`
 *
 * Validates that `T` is a _valid_ IPv4 address by:
 *
 * - making sure the basic `${number}.${number}.${number}.${number}`
 * - and then that each octet is a valid number between 0 and 255
 */
export type IsIp4Address<T> =
T extends string
    ? IsStringLiteral<T> extends true
        ? T extends Ip4AddressLike
            ? SplitAlt<T, ".">["length"] extends 4
                ? DeepOctetCheck<Split<T, ".">>
                : false
            : false
        : boolean
    : never;

type _EachGroup<
    T extends readonly string[],
> = {
    [K in keyof T]: IsIp6HexGroup<T[K]>
};

export type IsIp6Address<T> = T extends string
    ? IsStringLiteral<T> extends true
        ? T extends Ip6AddressFull
            ? And<_EachGroup<Split<T, ":">>>
            : Ip6GroupExpansion<T> extends Ip6AddressFull
                ? And<_EachGroup<Split<Ip6GroupExpansion<T>, ":">>>
                : false
        : boolean
    : false;

/**
 * **IsIpAddress**`<T>`
 *
 * A boolean operator which validates that `T` is either a V4 or V6 IP
 * Address.
 */
export type IsIpAddress<T> = T extends string
    ? IsStringLiteral<T> extends true
        ? IsIp4Address<T> extends true
            ? true
            : IsIp6Address<T> extends true
                ? true
                : false
        : boolean
    : false;

/**
 * **HasIpAddress**`<T>`
 *
 * a boolean operator which tests whether a string literal `T` has an IP address
 * in it.
 */
export type HasIpAddress<T> = T extends string
    ? IsStringLiteral<T> extends true
        ? T extends `${string}${infer IpAddress extends Ip4AddressLike | Ip6Address | Ip6Subnet}${string}`
            ? IsIp4Address<IpAddress>
            : false
        : boolean
    : never;

type _TLD<T extends string> = Length<T> extends 0
    ? false
    : Length<T> extends 1
        ? false
        : HasOtherCharacters<Lowercase<T>, LowerAlphaChar> extends true
            ? false
            : true;

type _BeforeTLD<T extends readonly string[]> = [] extends T
    ? true
    : HasOtherCharacters<Lowercase<First<T>>, LowerAlphaChar | NumericChar | "-" | "_"> extends true
        ? false
        : _BeforeTLD<AfterFirst<T>>;

/**
 * **IsDomainName**`<T>`
 *
 * Checks whether `T` is a valid DNS domain name.
 */
export type IsDomainName<T> = T extends string
    ? IsStringLiteral<T> extends true
        ? T extends `${string}.${string}`
            ? _TLD<Last<SplitAlt<T, ".">>> extends true
                ? _BeforeTLD<BeforeLast<SplitAlt<T, ".">>> extends true
                    ? true
                    : false
                : false
            : false
        : boolean
    : never;

/**
 * **HasQueryParameter**`<T,P>`
 *
 * Checks whether the URL in `T` has a query parameter with the key of `P`.
 */
export type HasQueryParameter<T extends string, P extends string> = And<[
    IsStringLiteral<T>,
    IsStringLiteral<P>,
]> extends true
    ? GetUrlQueryParams<T> extends `${string}${P}=${string}`
        ? true
        : false
    : boolean;

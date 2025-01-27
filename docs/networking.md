# Networking

## Useful Types

- `Uri`
- **IP Addresses**
  - `Ip4AddressLike` and `Ip4Address` (_branded_)
  - `Ip6AddressLike` and `Ip6Address` (_branded_)
  - `Ip6SubnetLike` and `Ip6Subnet` (_branded_)
  - `Ip4SubnetLike` and `Ip4Subnet` (_branded_)
    - `Ip4Netmask8`
    - `Ip4Netmask16`
    - `Ip4Netmask24`
    - `Ip4Netmask32`
  - Utilities
    - `Ip6GroupExpansion`
  - Specific IP Subnets
    - `Ip6Unicast`
    - `Ip6Loopback`
    - `Ip6Multicast`
    - `Rfc1812Like` and `Rfc1812` (_branded_)
  - Suggestions
    - `SuggestIpAddress`
    - `SuggestIp6SubnetMask`
    - `IpNetmaskSuggestion`

> **_branded_** types are types which have gone through a type guard to pass more rigerous type checks in validating that they truely represent the standard/shape/etc which their type denotes.

## Key Files

- [network-tg.ts](../modules/runtime/src/type-guards/network-tg.ts) - Type Guards
- [Network-operators.ts](../modules/types/src/boolean-logic/operators/Network-operators.ts)

import type { Ip6GroupExpansion } from "inferred-types/types";
import { stripTrailing } from "inferred-types/runtime";

/**
 * **ip6GroupExpansion**`(ip)`
 *
 * Looks at the IPv6 address and expands all instances of `::` to add
 * a block of `0000` where it was.
 *
 * ```ts
 * // fe89:0000:1256
 * const ip6 = ip6GroupExpansion("fe89::1256");
 * ```
 */
export function ip6GroupExpansion<T extends string>(ip: T) {
    return stripTrailing(ip.replaceAll("::", ":0000:"), ":") as Ip6GroupExpansion<T>;
}

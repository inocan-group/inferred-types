import type { TOP_LEVEL_DOMAINS } from "inferred-types/constants";
import type {
  IsDomainName,
  IsStringLiteral,
  Mutable,
  TupleToUnion,
} from "inferred-types/types";

/**
 * **TLD**
 *
 * A union type of all of the common top-level domains along with many
 * others which are starting to be used. This is _not_ meant to be
 * comprehensive.
 */
export type TLD = Mutable<
  TupleToUnion<typeof TOP_LEVEL_DOMAINS>
>;

/**
 * **DnsName**
 *
 * A simple representation of a DNS name.
 *
 * **Related:** `DomainName`, `UrlsFrom`
 */
export type DnsName = `${string}.${string}`;

/**
 * **DomainName**
 *
 * Designed to represents a DNS name.
 *
 * - Without the use of a generic this simply applies the same type
 * as `DnsName`
 * - When using the generic to _test_ the potential DNS name we can
 * run more validations and return `never` if they do not pass.
 * - When using the generic with a wide `T` you will get `unknown`
 *
 * **Related:** `DnsName`
 */
export type DomainName<
  T extends string | null = null,
> = T extends null
  ? DnsName
  : T extends string
    ? IsStringLiteral<T> extends true
      ? IsDomainName<T> extends true
        ? T & DnsName
        : never
      : unknown
    : never;

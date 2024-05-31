import { AlphaNumericChar, As, AsString, HasOtherCharacters, IsStringLiteral, IsTrue, OptionalSpace, ReplaceAll, RetainChars, StripAfter, StripBefore, StripChars, TupleToUnion } from "../..";
import { DnsName, DomainName } from "./DomainName";
import { Ip4Address } from "./IpAddress";
import { VariableChar } from "./Variable";

export type NetworkProtocol =
  | "http"
  | "https"
  | "file"
  | "ws" | "wss"
  | "ftp" | "sftp"
  | "ssh"
  | "scp";

/**
 * **NetworkProtocolPrefix**
 *
 * A type which tries to represent the _prefix_ of a URL/URI which
 * indicates the network protocol.
 */
export type NetworkProtocolPrefix<
  T extends NetworkProtocol = NetworkProtocol
> = `${T}://`

export type PortSpecifierOptions = {
  /**
   * **portRequirement**
   *
   * Whether a _port_ is "required", "optional", or "not-allowed"
   * for this protocol.
   *
   * @default "not-allowed"
   */
  portRequirement?: "optional" | "required" | "not-allowed"
}

/**
 * **PortSpecifier**`<TOpt>`
 *
 * Produces a string literal for the _port_ designation of
 * many protocols. Basically just a `:${number}` and
 * then possibly a space.
 *
 * - `TOpt` allows you to state whether the port should be:
 *   - `optional`
 *   - `required`
 *   - or `not-allowed`
 */
export type PortSpecifier<
  TOpt extends PortSpecifierOptions = { portRequirement: "not-allowed" }
> = TOpt["portRequirement"] extends "required"
  ? `:${number}${OptionalSpace}`
  : TOpt["portRequirement"] extends "optional"
  ? "" | `:${number}${OptionalSpace}`
  : ``;

export type ProtocolOptions = {
  /**
   * whether the protocol prefix should be optional
   * @default false
   */
  optional?: boolean;
  /**
   * whether to allow for `http://` along with `https://`
   * @default false
   */
  allowInsecure?: boolean;

  protocol?: "http" | "ws" | "both"
}

/**
 * **HttpProtocol**`<[TOpt]>`
 *
 * A utility which provides different ways of
 * requiring an **HTTP** based protocol string.
 *
 * - by default this only allows `https://`
 * - you can choose to make the protocol _optional_
 * or enable insure `http://` too.
 */
export type WebsocketProtocol<
  TOpt extends ProtocolOptions = {}
> =
  IsTrue<TOpt["allowInsecure"]> extends true
  ? IsTrue<TOpt["optional"]> extends true
  ? `wss://` | `ws://` | ""
  : `wss://` | `ws://`
  : IsTrue<TOpt["optional"]> extends true
  ? `wss://` | ""
  : `wss://`;

/**
 * **HttpProtocol**`<[TOpt]>`
 *
 * A utility which provides different ways of
 * requiring an **HTTP** based protocol string.
 *
 * - by default this only allows `https://`
 * - you can choose to make the protocol _optional_
 * or enable insure `http://` too.
 */
export type HttpProtocol<
  TOpt extends ProtocolOptions = {}
> =
  IsTrue<TOpt["allowInsecure"]> extends true
  ? IsTrue<TOpt["optional"]> extends true
  ? `https://` | `http://` | ""
  : `https://` | `http://`
  : IsTrue<TOpt["optional"]> extends true
  ? `https://` | ""
  : `https://`;

/**
 * **RemoveHttpProtocol**`<T>`
 *
 * Removes both `http://` and `https://` prefixes to a string.
 */
export type RemoveHttpProtocol<T extends string> = T extends `http://${infer Insecure}`
  ? Insecure
  : T extends `https://${infer Secure}`
  ? Secure
  : T;

/**
 * **RemoveNetworkProtocol**`<TContent,[TProtocol]>`
 *
 * Removes any _leading_ content which is a network protocol reference.
 *
 * - an example would be `https://` but so would `ftp://`
 * - you can narrow the protocols it's looking to remove by modifying
 * `TProtocol`
 */
export type RemoveNetworkProtocol<
  TContent extends string,
  TProtocol extends NetworkProtocol = NetworkProtocol
> = TContent extends `${NetworkProtocolPrefix<TProtocol>}${infer Rest}`
? Rest
: TContent;

/**
 * **UrlPath**`<T>`
 *
 * A simple type that represents the _shape_ of a UrlPath
 * when no generics are used (aka, `T` is defaulted to _null_).
 *
 * If you want more detailed type checking of the path you can
 * pass in a string to `T` and it will be validated and return
 * `never` when an invalid character is used.
 */
export type UrlPath<T extends string | null = null> = T extends null
  ? '/' | `/${string}`
  : T extends string
  ? IsStringLiteral<T> extends true
    ? StripChars<T, AlphaNumericChar | "/" | "_" | "." | "-" > extends ""
      ? T
      : never
  : T
  : never; // when not string or null

type Extender = "" | `/${string}`;



/**
 * **GetDomainName**`<T>`
 *
 * Extracts out the IP address or Domain Name from a URL-like string literal.
 *
 * - if _not_ a string literal then just proxies through `string`
 * - if not able to find it then it returns the literal ''
 */
export type GetDomainName<
  T extends string
> = IsStringLiteral<T> extends true
  ? RemoveNetworkProtocol<T> extends `${infer Domain extends DnsName | Ip4Address}${'' | `/${string}`}`
  ? StripAfter<Domain, "/">
  : ""
  : string;

type _GetUrlPath<T extends string> =
StripAfter<
  As<StripBefore<RemoveNetworkProtocol<T>, "/">, string>,
  "?"
> extends string
  ? StripAfter<
  As<StripBefore<RemoveNetworkProtocol<T>, "/">, string>,
  "?"
  >
  : never;

/**
 * **GetUrlPath**`<T>`
 *
 * Extracts the URL's path from a full URL/URI.
 *
 * - removes any reference to the network protocol
 * - removes the domain name or IP address
 * - removes any trailing query parameters
 */
export type GetUrlPath<
  T extends string
> = IsStringLiteral<T> extends true
? T extends `${string}/${string}`
  ? `/${_GetUrlPath<T>}`
  : ''
: string

export type RelativeUrl = `${VariableChar | "/"}`;

/**
 * A literal variant of _string_ which forces a string to follow conventions
 * for a fully qualified URL like `https://google.com`. It can't ensure the
 * type is fully valid but does help to avoid some typos.
 */
export type FullyQualifiedUrl = `${NetworkProtocol}://${Ip4Address | DomainName}/${string}`;

export type UrlBuilder =
  | (<P extends NetworkProtocol, D extends DomainName, B extends RelativeUrl>(
    protocol: P,
    domain: D,
    basePath: B
  ) => `${P}://${D}/${B}`)
  | (<U extends RelativeUrl>(url: U) => U);

/**
 * **Uri**
 *
 * A simple type to allow for any HTTP, File, or Websocket based URI.
 */
export type Uri<
  T extends NetworkProtocol = NetworkProtocol
> = `${NetworkProtocol}://${string}`;


type _UrlsFrom<
T extends string,
TOpt extends ProtocolOptions & PortSpecifierOptions = {},
> = TOpt["protocol"] extends "ws"
? `${WebsocketProtocol<TOpt>}${GetDomainName<T>}${PortSpecifier<TOpt>}${GetUrlPath<T>}${Extender}`
: TOpt["protocol"] extends "both"
  ? `${HttpProtocol<TOpt>}${GetDomainName<T>}${PortSpecifier<TOpt>}${GetUrlPath<T>}${Extender}` | `${WebsocketProtocol<TOpt>}${GetDomainName<T>}${PortSpecifier<TOpt>}${GetUrlPath<T>}${Extender}`
: `${HttpProtocol<TOpt>}${GetDomainName<T>}${PortSpecifier<TOpt>}${GetUrlPath<T>}${Extender}`;


/**
 * **UrlsFrom**`<T, [TOpt],[TProto]>`
 *
 * Utility which generates a type for all valid URLs in the given
 * partial URL.
 *
 * - you can configure whether the protocol should be _optional_
 * and whether _insecure_ URL's should be allowed with `TOpt`
 * - `TProto` can be used to switch to Websocket protocol(s) with
 * the `ws` option but is set to `http` by default.
 */
export type UrlsFrom<
  T extends string | readonly string[],
  TOpt extends ProtocolOptions & PortSpecifierOptions = {},
> = T extends string
? _UrlsFrom<T,TOpt>
: T extends readonly string[]
  ? TupleToUnion<{
    [K in keyof T]: IsStringLiteral<T[K]> extends true
      ? _UrlsFrom<AsString<T[K]>, TOpt>
      : never
  }>
  : never;

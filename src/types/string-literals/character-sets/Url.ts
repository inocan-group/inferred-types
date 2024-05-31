import {
  AlphaNumericChar,
  As,
  AsString,
  ExpandUnion,
  IsStringLiteral,
  IsTrue,
  StripAfter,
  StripBefore,
  StripChars,
  StripLeading,
  StripTrailing,
  TupleToUnion,
  DnsName, DomainName,
  Ip4Address,
  Mutable,
  Values,
  Flatten,
  EmptyObject,
} from "src/types/index";
import { NETWORK_PROTOCOL_LOOKUP } from "src/constants/index";

export type NetworkProtocol = Exclude<TupleToUnion<
  Mutable<
    Flatten<Values<typeof NETWORK_PROTOCOL_LOOKUP>>
  >
>, "">;

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

  ports?: number
}


type _Ports<
  TOpt extends PortSpecifierOptions,
> = TOpt["ports"] extends number
? `${TOpt["ports"]}`
: `${number}`;

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
  TOpt extends PortSpecifierOptions = { portRequirement: "not-allowed", ports: number }
> = [TOpt["portRequirement"]] extends ["required"]
  ? `:${_Ports<TOpt>}`
  : [TOpt["portRequirement"]] extends ["optional"]
  ? "" | `:${_Ports<TOpt>}`
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
  TOpt extends ProtocolOptions = EmptyObject
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
  TOpt extends ProtocolOptions = EmptyObject
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
 * This type is either an empty string `''` or a string starting
 * with a `/` character.
 *
 * If you want more detailed type checking of the path you can
 * pass in a string to `T` and it will be validated and return
 * `never` when an invalid character is used.
 */
export type UrlPath<T extends string | null = null> = T extends null
  ? "" | `/${AlphaNumericChar | "_"}${string}`
  : T extends string
  ? IsStringLiteral<T> extends true
    ? T extends `${string}/`
      ? never
    : StripChars<T, AlphaNumericChar | "/" | "_" | "." | "-" > extends ""
      ? T
      : never
  : never
  : never; // when not string or null

/**
 * **GetUrlSource**`<T>`
 *
 * Extracts out the IP address or Domain Name from a URL-like string literal.
 *
 * - if _not_ a string literal then just proxies through `string`
 * - if not able to find it then it returns the literal ''
 */
export type GetUrlSource<
  T extends string
> = IsStringLiteral<T> extends true
  ? RemoveNetworkProtocol<T> extends `${infer Domain extends DnsName | Ip4Address}${"" | `/${string}`}`
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
? RemoveNetworkProtocol<T> extends `${string}/${string}`
  ? _GetUrlPath<RemoveNetworkProtocol<T>> extends ""
    ? ""
    : `/${_GetUrlPath<RemoveNetworkProtocol<T>>}`
  : ""
: string

type RelativeStart = `../` | `./`;

/**
 * **RelativeUrl**
 */
export type RelativeUrl = `${RelativeStart}${UrlPath}`;

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
> = `${T}://${string}`;

/**
 * **AddUrlPathSegment**`<TExisting, TAdd>`
 *
 * Adds a new URL path segment, ensuring that appropriate
 * `/` representation is preserved.
 */
export type AddUrlPathSegment<
  TExisting extends string,
  TAdd extends string
> = TExisting extends `${string}/`
? `${TExisting}${StripTrailing<StripLeading<TAdd, "/">, "/">}`
: `${TExisting}/${StripTrailing<StripLeading<TAdd, "/">, "/">}`;

type _Path<T extends string> = GetUrlPath<T> extends UrlPath
  ? GetUrlPath<T>
  : never;


type _UrlsFromProtocol<
  TContent extends string,
  TProto extends WebsocketProtocol<TOpt> | HttpProtocol<TOpt>,
  TOpt extends ProtocolOptions & PortSpecifierOptions
> = `${TProto}${GetUrlSource<TContent>}${PortSpecifier<TOpt>}${AddUrlPathSegment<_Path<TContent>, `${string}`>}` | `${TProto}${GetUrlSource<TContent>}${PortSpecifier<TOpt>}${_Path<TContent>}`



type _UrlsFrom<
  T extends string,
  TOpt extends ProtocolOptions & PortSpecifierOptions = EmptyObject,
> = TOpt["protocol"] extends "ws"
? _UrlsFromProtocol<T,WebsocketProtocol<TOpt>,TOpt>
: TOpt["protocol"] extends "both"
  ? _UrlsFromProtocol<T,WebsocketProtocol<TOpt>,TOpt> |
    _UrlsFromProtocol<T,HttpProtocol<TOpt>,TOpt>
  : _UrlsFromProtocol<T,HttpProtocol<TOpt>,TOpt>;


/**
 * **UrlsFrom**`<T, [TOpt]>`
 *
 * Utility which generates a type for all valid URLs in the given
 * partial URL.
 *
 * - you can configure whether the protocol should be _optional_
 * and whether _insecure_ URL's should be allowed with `TOpt`
 * - you can also switch the protocol between `http`,`ws`, or `both`
 * - the default protocol is `http`
 */
export type UrlsFrom<
  T extends string | readonly string[],
  TOpt extends ProtocolOptions & PortSpecifierOptions = EmptyObject,
> = T extends string
? ExpandUnion<_UrlsFrom<T,TOpt>>
: T extends readonly string[]
  ? TupleToUnion<
    {
      [K in keyof T]: IsStringLiteral<T[K]> extends true
        ? ExpandUnion<_UrlsFrom<AsString<T[K]>, TOpt>>
        : never
    }
  >
  : never;

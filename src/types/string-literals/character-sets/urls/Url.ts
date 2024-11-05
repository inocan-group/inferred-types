import {
  AlphaNumericChar,
  AsString,
  ExpandUnion,
  IsStringLiteral,
  StripAfter,
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
  IsEqual,
  NumericChar,
  RetainWhile,
  AsNumber,
  StripBefore,
  StripWhile,
  IsUndefined,
  Contains,
  RemoveEmpty
} from "inferred-types/dist/types/index";
import { NETWORK_PROTOCOL_LOOKUP } from "inferred-types/dist/constants/index";

type Proto = typeof NETWORK_PROTOCOL_LOOKUP;
export type NetworkProtocol = Mutable<Values<Proto>> extends readonly (string | string[])[]
  ? RemoveEmpty<Flatten<Mutable<Values<Proto>>>>[number]
  : never


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

/**
 * **GetUrlProtocol**`<T>`
 *
 * Gets the network protocol used in the URL string passed into `T`.
 */
export type GetUrlProtocol<T> = T extends string
? T extends `${NetworkProtocolPrefix}${string}`
? StripAfter<T,"://">
: IsEqual<T,string> extends true
  ? string
  : never
: never;

/**
 * **GetUrlProtocolPrefix**`<T>`
 *
 * Just like `GetUrlProtocol` but adds in the `://` so long
 * as there's a protocol found.
 */
export type GetUrlProtocolPrefix<T> = T extends string
? GetUrlProtocol<T> extends NetworkProtocol
  ? NetworkProtocolPrefix<GetUrlProtocol<T>>
  : ""
: "";


type _Ports<
  TOpt extends PortSpecifierOptions,
> = TOpt["ports"] extends number
? `${TOpt["ports"]}`
: `${number}`;

/**
 * **UrlPort**`<TOpt>`
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
export type UrlPort<
  TOpt extends PortSpecifierOptions = { portRequirement: "not-allowed", ports: number }
> = [TOpt["portRequirement"]] extends ["required"]
  ? `:${_Ports<TOpt>}`
  : [TOpt["portRequirement"]] extends ["optional"]
  ? "" | `:${_Ports<TOpt>}`
  : ``;

/**
 * **GetUrlPort**`<T>`
 *
 * Returns the port designated in the URL passed in if found.
 *
 * - if `T` is a literal string and port not found then value is "default"
 * - if `T` is a wide string then the value will be `number | "default"`
 * - all non-string based values result in `never`
 */
export type GetUrlPort<T> = T extends string
? IsStringLiteral<T> extends true
  ? RemoveNetworkProtocol<T> extends `${string}:${infer Port extends number}${infer Rest}`
    ? AsNumber<RetainWhile<`${Port}${Rest}`, NumericChar>>
    : "default"
  : number | "default"
: never;

type _FindPort<
  T extends string
> = RetainWhile<StripBefore<RemoveNetworkProtocol<T>, ":">,NumericChar>;

/**
 * **RemoveUrlPort**`<T,[TOpt]>`
 *
 * Removes a _port specification_ in a URL if found otherwise returns string literal
 * as it was.
 */
export type RemoveUrlPort<
  T
> = T extends string
? IsStringLiteral<T> extends true
  ? RemoveNetworkProtocol<T> extends `${infer Before}:${infer _Port extends `${number}`}${infer After}`
    ? `${GetUrlProtocolPrefix<T>}${Before}${StripWhile<After, NumericChar>}`
    : T
  : string
: never;

export type ProtocolOptions = {
  /**
   * whether the protocol prefix should be optional
   * @default false
   */
  protocolOptional?: boolean;
  /**
   * The Network Protocols to use.
   */
  protocols?: NetworkProtocol[]
}

export type UrlOptions = {
  /**
   * Specify how you'd like to allow for queryParameters in the URL's
   * you're generating.
   *
   * - you may choose "any", "none"
   *
   * @default "any"
   */
  queryParameters?: "any" | "none" ;
}

/**
 * **RemoveHttpProtocol**`<T>`
 *
 * Removes both `http://` and `https://` prefixes to a string.
 *
 * **Related:** `RemoveNetworkProtocol`
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

type UrlPathChars = AlphaNumericChar | "_" | "@" | "." | "-";

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
  ? "" | `/${UrlPathChars}${string}`
  : T extends string
  ? IsStringLiteral<T> extends true
    ? T extends `${string}/`
      ? never
    : StripChars<T, UrlPathChars | "/" > extends ""
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
  ? StripAfter<StripAfter<RemoveNetworkProtocol<T>, "/">, ":"> extends
      `${infer Domain extends DnsName | Ip4Address}`
  ? Domain
  : never
  : string;

/**
 * **RemoveUrlSource**`<T>`
 *
 * Removes the URL source (aka, domain name or IP address) from a URL string when
 * it can be identified.
 */
export type RemoveUrlSource<T extends string> = IsStringLiteral<T> extends true
? GetUrlSource<T> extends string
  ? IsStringLiteral<GetUrlSource<T>> extends true
    ? T extends `${infer Before}${GetUrlSource<T>}${infer After}`
      ? `${Before}${After}`
      : T
    : T
  : T
: string;


type _GetUrlPath<T extends string> =
   [T] extends [`${string}//${string}`]
      ? never
      : T extends ""
        ? ""
        : StripAfter<T,"?"> extends "/"
        ? ""
        : T extends `/${string}`
          ? StripAfter<T,"?">
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
> = [IsStringLiteral<T>] extends [true]
? _GetUrlPath<
    RemoveUrlSource<RemoveNetworkProtocol<RemoveUrlPort<T>>>
  >
: string;


/**
 * **GetUrlQueryParams**`<T, [S]>`
 *
 * Given a URL passed into `T`, this utility will extract the
 * query parameters portion of the URL or `""` if none exists.
 */
export type GetUrlQueryParams<
  T extends string,
  S extends string | undefined = undefined
> = T extends `${string}?${infer QP}`
? IsUndefined<S> extends true
  ? `?${QP}`
  : Contains<QP, `${S}=`> extends true
    ? string
    : undefined
: "";

/**
 * **AnyQueryParams**
 *
 * A type which represents any string value for query parameters
 * or no query parameters at all.
 *
 * Can be quite useful for creating pattern matching types where
 * you don't want to be blocked by someone having put some silly
 * marketing QP at the end of a URL.
 */
export type AnyQueryParams = `?${string}` | "";



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

type _Proto<TOpt extends ProtocolOptions & PortSpecifierOptions & UrlOptions> =
NetworkProtocolPrefix<[] extends TOpt["protocols"]
  ? "https"
  : TupleToUnion<TOpt["protocols"]>>;

type _QP<
  TOpt extends ProtocolOptions & PortSpecifierOptions & UrlOptions
> = TOpt["queryParameters"] extends "none"
? ""
: `${AnyQueryParams}`;

type _UrlsFrom<
  TContent extends string,
  TOpt extends ProtocolOptions & PortSpecifierOptions & UrlOptions,
> = [TOpt["protocolOptional"]] extends [true]
? `${_Proto<TOpt>}${GetUrlSource<TContent>}${UrlPort<TOpt>}${AddUrlPathSegment<_Path<TContent>, `${string}`>}`
| `${_Proto<TOpt>}${GetUrlSource<TContent>}${UrlPort<TOpt>}${_Path<TContent>}${_QP<TOpt>}`
| `${GetUrlSource<TContent>}${UrlPort<TOpt>}${_Path<TContent>}${_QP<TOpt>}`
| `${GetUrlSource<TContent>}${UrlPort<TOpt>}${AddUrlPathSegment<_Path<TContent>, `${string}`>}`

: `${_Proto<TOpt>}${GetUrlSource<TContent>}${UrlPort<TOpt>}${AddUrlPathSegment<_Path<TContent>, `${string}`>}` |
`${_Proto<TOpt>}${GetUrlSource<TContent>}${UrlPort<TOpt>}${_Path<TContent>}${_QP<TOpt>}`;


/**
 * **UrlsFrom**`<T, [TOpt]>`
 *
 * Utility which generates a type for all valid URLs in the given
 * partial URL.
 *
 * - you can configure whether the protocol should be _optional_
 * and whether _insecure_ URL's should be allowed with `TOpt`
 * - you can also switch the protocol between `http`,`ws`, or `both`
 * - the default protocol is `https`
 */
export type UrlsFrom<
  T extends string | readonly string[],
  TOpt extends ProtocolOptions & PortSpecifierOptions & UrlOptions = EmptyObject,
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

/**
 * the inclusion of query parameters at the end of a URL parameter
 */
export type UrlQueryParameters = `?${string}`

/**
 * the _optional_ inclusion of query parameters at the end of a URL
 */
export type OptUrlQueryParameters = "" | UrlQueryParameters;

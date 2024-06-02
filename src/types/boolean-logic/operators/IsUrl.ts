import {
  And,
  As,
  AsString,
  Equals,
  Extends,
  GetUrlPath,
  GetUrlSource,
  IsNever,
  IsString,
  IsStringLiteral,
  NetworkProtocol,
  NetworkProtocolPrefix,
  Not,
  Or,
} from "src/types/index";


export type HasUrlPath<T extends string> = And<[
  IsString<T>,
  Not<IsNever<GetUrlPath<T>>>,
  Or<[
    Extends<GetUrlPath<T>,"">,
    Extends<GetUrlPath<T>,`/${string}`>,
    Equals<GetUrlPath<T>, string>,
  ]>
]>;

export type HasUrlSource<T> = Not<IsNever<GetUrlSource<AsString<T>>>>;

export type HasNetworkProtocolReference<
  TTest extends string,
  TProto extends NetworkProtocol
> = Extends<TTest, `${NetworkProtocolPrefix<TProto>}${string}`>;

/**
 * **IsUrl**`<TTest,[TProtocol]>`
 *
 * Boolean operator which tests whether the passed in `TTest`
 * is a valid URL.
 *
 * **Note:** by default it will only check the `https` protocol
 * but you can choose any set `TProtocol` with anything from `NetworkProtocol`
 * if you like.
 *
 * **Note:** you can add **optional** as a part of the protocol union
 * type and it will then accept the protocols you've selected or a URL
 * without a protocol.
 */
export type IsUrl<
  TTest,
  TProtocol extends NetworkProtocol | "optional" = "https"
> = IsString<TTest> extends true
? IsStringLiteral<TTest> extends true
  ? And<[
      Or<[
        HasNetworkProtocolReference<
          AsString<TTest>,
          As<TProtocol, NetworkProtocol>
        >,
        Extends<"optional", TProtocol>
      ]>,
      HasUrlPath<AsString<TTest>>,
      HasUrlSource<AsString<TTest>>,
    ]>
  : boolean
:false;


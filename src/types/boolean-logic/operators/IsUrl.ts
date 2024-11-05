import {
  And,
  Extends,
  GetUrlPath,
  GetUrlSource,
  IsNever,
  IsStringLiteral,
  NetworkProtocol,
  NetworkProtocolPrefix,
  Not,
  Or,
} from "inferred-types/dist/types/index";


export type HasUrlPath<T extends string> = And<[
  Not<IsNever<GetUrlPath<T>>>,
  Or<[
    Extends<GetUrlPath<T>,"">,
    Extends<GetUrlPath<T>,`/${string}`>,
    string extends GetUrlPath<T> ? true : false
  ]>
]>;

export type HasUrlSource<T extends string> = Not<IsNever<GetUrlSource<T>>>;

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
> = TTest extends string
? IsStringLiteral<TTest> extends true
  ? And<[
      Or<[
        HasNetworkProtocolReference<
          TTest,
          TProtocol extends NetworkProtocol
            ? TProtocol
            : "https"
        >,
        Extends<"optional", TProtocol>
      ]>,
      HasUrlPath<TTest>,
      HasUrlSource<TTest>,
    ]>
  : boolean
:false;


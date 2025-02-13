import type { AlphaChar, And, As, AsNumber, Callback, DigitNonZero, Expand, ExpandDictionary, Extends, FixedLengthArray, If, NumericChar, TokenSyntax, TypedFunction } from "inferred-types/types";

export type TokenName = `${AlphaChar}${string}`;

export type TokenParams__always =
  "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type TokenParams__never = "none";

export type TokenParams__opt_fixed =
  | "0|1" | "0|2" | "O|3" | "0|4" | "0|5" | "0|6" | "0|7" | "0|8";

export type TokenParams__range =
  | `1..${NumericChar}` | `2..${NumericChar}` | `3..${NumericChar}`


/**
 * Parameter constraints associated to "dynamic" Tokens
 * which have multiple variants.
 */
export type TokenDynamicParams =
  | TokenParams__always
  | TokenParams__opt_fixed
  | TokenParams__range;

/**
 * Parameter constraints associated to "static" Tokens
 * which only have one type.
 */
export type TokenStaticParams = TokenParams__never;

/**
 * How this token uses -- or doesn't use -- parameters to create
 * variants.
 */
export type TokenParamsConstraint =
  | TokenDynamicParams
  | TokenStaticParams;

export type TokenMayHaveParams<T extends TokenParamsConstraint> =
  T extends TokenParams__opt_fixed ? true : false;

export type TokenDoesHaveParams<T extends TokenParamsConstraint> =
  T extends TokenParams__always
  ? true
  : T extends TokenParams__range
  ? true
  : false;

export type TokenIsStatic<T extends TokenParamsConstraint> = T extends "none"
  ? true
  : false;


export type ResolvedTokenType<
  T = any,
  TG extends TypedFunction = TypedFunction,
> = [type: T, tg: TG];


type Max<
  T extends TokenDynamicParams
> = T extends TokenParams__opt_fixed
  ? T extends `0|${infer Max}`
  ? AsNumber<Max>
  : never
  : T extends TokenParams__always
  ? AsNumber<T>
  : T extends TokenParams__range
  ? T extends `${string}..${infer Max}`
  ? AsNumber<Max>
  : never
  : never;

type Min<
  T extends TokenDynamicParams
> = T extends TokenParams__range
  ? T extends `${infer Min}..${string}`
  ? AsNumber<Min>
  : never
  : never;


/**
 * A _resolver_ function which returns a _type_ and a _type guard_ based
 * on the parameters a token receives.
 */
export type TokenTypeResolver<
  T extends TokenDynamicParams,
> = T extends TokenParams__opt_fixed
  ? <P extends readonly [...FixedLengthArray<string, Max<T>>] | []>(...params: P) => ResolvedTokenType
  : T extends TokenParams__range
  ? <P extends readonly [...FixedLengthArray<string, Min<T>, true>]>(...params: P) => ResolvedTokenType
  : T extends TokenParams__always
  ? <P extends readonly [...FixedLengthArray<string, Max<T>>]>(...params: P) => ResolvedTokenType
  : never;

/**
 * A **TokenResolver** is a higher order function.
 *
 * - the first call is made by a _syntax_ to provides it's context.
 * - the second call provides the **parameters** which allow a dynamic token
 * to isolate to a discrete variant state.
 *
 * This second call is responsible for returning the `type` and `typeGuard`
 * function which validates this variant state.
 */
export type TokenResolver = <
  TSyntax extends TokenSyntax
>(syntax: TSyntax) => <TParams extends readonly string[] | []>(params: TParams) => {
  type: unknown;
  typeGuard: (val: unknown) => boolean;
};

export type Tokenizer = <T extends readonly any[]>(...args: T) => readonly string[];

export type DynamicToken<
  TToken extends TokenName = TokenName,
  TResolver extends TokenResolver,
  TTokenizer extends Tokenizer
> =;

export type Token<
  TToken extends TokenName = TokenName,
  TParams extends TokenParamsConstraint = TokenParamsConstraint,
  TBaseResolver extends If<TokenIsStatic<TParams>, TokenResolver, any> = If<TokenIsStatic<TParams>, TokenResolver, any>,
> = {
  kind: "Token";
  /** the name of the token */
  token: TToken;
  /**
   * the number of parameters available to the token represented as:
   *    - `[min: number, max: number]`
   *    - "none"
   *    - "any"
   */
  params: TParams;
  isStatic: TokenIsStatic<TParams>;

  /**
   * The type of the token when no parameters are provided.
   */
  type: If<
    TokenIsStatic<TParams>,
    TBaseResolver,
    never
  >;
  /**
   * A type guard to validate the base type of this token
   */
  typeGuard: If<TokenIsStatic<TParams>, TypedFunction, never>;

  /**
   * **resolveType**
   *
   * A function which takes the token parameters provided
   * and produces a fully qualified _type_ for the given variant
   * along with a runtime _type guard_ for this type.
   */
  resolver: If<
    TokenIsStatic<TParams>,
    never,
    TBaseResolver
  >;
  /**
   * A function which can be used to specify variants of the base token
   */
  tokenizer: If<
    TokenIsStatic<TParams>,
    never,
    Tokenizer
  >;
}

/** base type for _static_ tokens */
export type StaticToken = Token<
  TokenName,
  "none",
  any
>;

import type { AlphaChar, And, DigitNonZero, ExpandDictionary, Extends, FixedLengthArray, If, TypedFunction } from "inferred-types/types";

export type TokenName = `${AlphaChar}${string}`;

export type TokenParamsConstraint<N extends number = number> = readonly [min: N, max: N]
  | "none"
  | "some"
  | "any";

export type TokenNeverHasParameters<T extends TokenParamsConstraint> = T extends "none"
  ? true
  : And<[T extends [number, number] ? true : false, Extends<T[0], 0>, Extends<T[1], 0>]>;

type MinParameters<T extends TokenParamsConstraint> = T extends "none"
  ? 0
  : T extends "some"
    ? 1
    : T extends "any"
      ? 0
      : T extends [infer Min extends number, number]
        ? Min
        : never;

export type ResolvedTokenType<
  T = any,
  TG extends TypedFunction = TypedFunction,
> = [type: T, tg: TG];

/**
 * A _resolver_ function which returns a _type_ and a _type guard_ based
 * on the parameters a token receives.
 */
export type TokenTypeResolver<
  T extends TokenParamsConstraint,
> = MinParameters<T> extends 0
  ? (params: string[], sep: string) => ResolvedTokenType
  : (params: [FixedLengthArray<string, MinParameters<T>>, ...string[]], sep: string) => ResolvedTokenType;

/**
 * A **Tokenizer** can take any set of parameters but must return an array of strings
 * which will then be added as token parameters.
 */
export type Tokenizer = <A extends readonly any[]>(...args: A) => string[];

export type Token<
  TToken extends TokenName,
  TParams extends TokenParamsConstraint,
  TBase = never,
> = ExpandDictionary<
  {
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

  } &
  If<
    TokenNeverHasParameters<TParams>,
    {
      /**
       * The type of the token when no parameters are provided.
       */
      type: TBase;
      /**
       * A type guard to validate the base type of this token
       */
      typeGuard: TypedFunction;
    },
    {
      /**
       * **resolveType**
       *
       * A function which takes the token parameters provided
       * and produces a fully qualified _type_ for the given variant
       * along with a runtime type guard for this type.
       */
      resolver: TokenTypeResolver<TParams>;
      /**
       * A function which can be used to specify variants of the base token
       */
      tokenizer: Tokenizer;

    }
  >
>;

/** base type for _static_ tokens */
export type StaticToken = Token<
  TokenName,
"none" | [0, 0],
any
>;

/** base type for _dynamic_ tokens */
export type DynamicToken = Token<
  TokenName,
"some" | "any" | [number, DigitNonZero],
never
>;

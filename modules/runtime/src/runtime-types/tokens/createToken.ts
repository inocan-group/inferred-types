import type {
  AlphaChar,
  DynamicTokenApi,
  StaticTokenApi,
  Token,
  TokenDetail,
  TokenName,
  TokenParamsConstraint,
} from "inferred-types/types";
import { isArray } from "src/type-guards";

function hasNoParameters(params: TokenParamsConstraint) {
  return params === "none" || (isArray(params) && params[0] === 0 && params[1] === 0);
}

function staticToken<TToken extends TokenName>(
  token: TToken,
): StaticTokenApi<TToken> {
  return (type, typeGuard) => {
    return {
      kind: "Token",
      token,
      params: "none",
      type,
      typeGuard,
    } as unknown as ReturnType<StaticTokenApi<TToken>>;
  };
}

function dynamicToken<
  TToken extends TokenName,
  TParams extends TokenParamsConstraint,
>(
  token: TToken,
  params: TParams,
): DynamicTokenApi<TToken, TParams> {
  return (resolver, tokenizer) => {
    return {
      kind: "Token",
      token,
      params,
      resolver,
      tokenizer,
    } as unknown as Token<TToken, TParams>;
  };
}

/**
 * **creeateToken**`(name,baseType,params,parser)`
 *
 * Creates a token to be used in a `Grammar`.
 */
export function createToken<
  TToken extends `${AlphaChar}${string}`,
  TParams extends TokenParamsConstraint<N>,
  N extends number,
>(
  /** the token's name */
  token: TToken,
  /** a min and max number of parameters this token is expecting */
  params: TParams,
): TokenDetail<TToken, TParams> {
  return (
    hasNoParameters(params)
      ? staticToken(token)
      : dynamicToken(token, params)
  ) as TokenDetail<TToken, TParams>;
}

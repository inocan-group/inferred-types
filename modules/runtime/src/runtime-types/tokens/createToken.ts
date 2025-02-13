import type {
  AlphaChar,
  DynamicTokenApi,
  StaticTokenApi,
  Token,
  DefineTokenDetail,
  TokenName,
  TokenParamsConstraint,
  TokenDynamicParams,
} from "inferred-types/types";

function hasNoParameters(params: TokenParamsConstraint) {
  return params === "none"
}

function staticToken<TToken extends TokenName>(
  token: TToken,
): StaticTokenApi<TToken> {
  return (type, typeGuard) => {
    return {
      kind: "Token",
      isStatic: true,
      token,
      params: "none",
      type,
      typeGuard,
    } as unknown as ReturnType<StaticTokenApi<TToken>>;
  };
}

function dynamicToken<
  TToken extends TokenName,
  TParams extends TokenDynamicParams,
>(
  token: TToken,
  params: TParams,
): DynamicTokenApi<TToken, TParams> {
  return (resolver, tokenizer) => {
    return {
      kind: "Token",
      isStatic: false,
      token,
      params,
      resolver,
      tokenizer,
    } as unknown as ReturnType<DynamicTokenApi<TToken, TParams>>;
  };
}

/**
 * **creeateToken**`(name,baseType,params,parser)`
 *
 * Creates a token to be used in a `Grammar`.
 */
export function createToken<
  TToken extends `${AlphaChar}${string}`,
  TParams extends TokenParamsConstraint,
>(
  /** the token's name */
  token: TToken,
  /** a min and max number of parameters this token is expecting */
  params: TParams,
): DefineTokenDetail<TToken, TParams> {
  return (
    hasNoParameters(params)
      ? staticToken(token)
      : dynamicToken(token, params)
  ) as DefineTokenDetail<TToken, TParams>;
}

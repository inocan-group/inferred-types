
import type {
  As,
  SimpleToken,
  SimpleType,
  Token,
  TokenDynamicParams,
  TokenIsStatic,
  Tokenizer,
  TokenName,
  TokenParamsConstraint,
  TokenResolver
} from "inferred-types/types";

export type StaticTokenApi<
  TToken extends TokenName,
> = <
  TType extends SimpleToken,
  TGuard extends (val: unknown) => boolean,
>(
  type: TType,
  typeGuard: TGuard
) => Token<TToken, "none", SimpleType<TType>>;

/**
 * The remaining configuration required to create a Dynamic Token.
 */
export type DynamicTokenApi<
  TToken extends TokenName = TokenName,
  TParams extends TokenDynamicParams = TokenDynamicParams,
> = <
  TResolve extends TokenResolver<TParams>,
  TTokenize extends Tokenizer,
>(
  resolver: TResolve,
  tokenizer: TTokenize
) => Token<TToken, TParams>;

/**
 * An API surface for completing the creation process for a Token.
 * It distinguishes between "static" and "dynamic" tokens in what is
 * required for configuration.
 */
export type DefineTokenDetail<
  TToken extends TokenName,
  TParams extends TokenParamsConstraint,
> = TokenIsStatic<TParams> extends true
  ? StaticTokenApi<TToken>
  : DynamicTokenApi<TToken, As<TParams, TokenDynamicParams>>;

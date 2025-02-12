import type { SimpleToken, SimpleType } from "inferred-types/types";
import type { Token, Tokenizer, TokenName, TokenNeverHasParameters, TokenParamsConstraint, TokenTypeResolver } from "./Token";

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
  TToken extends TokenName,
  TParams extends TokenParamsConstraint,
> = <
  TResolve extends TokenTypeResolver<TParams>,
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
export type TokenDetail<
  TToken extends TokenName,
  TParams extends TokenParamsConstraint,
> = TokenNeverHasParameters<TParams> extends true
  ? StaticTokenApi<TToken>
  : DynamicTokenApi<TToken, TParams>;

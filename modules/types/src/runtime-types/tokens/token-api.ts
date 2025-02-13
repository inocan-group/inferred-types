import type {
  DynamicToken,
  SimpleToken,
  SimpleType,
  StaticToken,
  Tokenizer,
  TokenName,
  TokenResolver,
  TokenType,
} from "inferred-types/types";

export type StaticTokenApi<
  TToken extends TokenName,
> = <
  TType extends SimpleToken,
  TGuard extends (val: unknown) => boolean,
>(
  type: TType,
  typeGuard: TGuard
) => StaticToken<TToken, SimpleType<TType>, TGuard>;

/**
 * The remaining configuration required to create a Dynamic Token.
 */
export type DynamicTokenApi<
  TToken extends TokenName = TokenName,
> = <
  TResolve extends TokenResolver,
  TTokenize extends Tokenizer,
>(
  resolver: TResolve,
  tokenizer: TTokenize
) => DynamicToken<TToken, TResolve, TTokenize>;

/**
 * An API surface for completing the creation process for a Token.
 * It distinguishes between "static" and "dynamic" tokens in what is
 * required for configuration.
 */
export type DefineTokenDetail<
  TToken extends TokenName,
  TKind extends TokenType,
> = TKind extends "static"
  ? StaticTokenApi<TToken>
  : DynamicTokenApi<TToken>;

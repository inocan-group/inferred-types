import { Dictionary, EmptyObject } from "src/base-types";
import type { DynamicToken, StaticToken, Token, TokenName } from "./Token";
import type { TokenSyntax } from "./TokenSyntax";
import { AfterFirst, First } from "src/lists";
import { Expand } from "inferred-types/types";

type AddGrammarMethod<
  S extends TokenSyntax,
  T extends Token
> = Record<
  T["name"],
  T extends StaticToken
  ? () => T["type"]
  : T extends DynamicToken
  ? <P extends Parameters<T["tokenizer"]>>(...params: P) => unknown
  : never
>;

/**
 * Provides a list of `Token` names from a tuple of `Token[]`'s
 */
export type GetTokenNames<
  T extends readonly Token[]
> = {
    [K in keyof T]: T[K]["name"] extends TokenName
    ? T[K]["name"]
    : never
  };

export type GrammarTypeDefinition<
  S extends TokenSyntax,
  T extends readonly Token[],
  R extends Dictionary = EmptyObject
> = [] extends T
  ? Expand<R>
  : GrammarTypeDefinition<
    S,
    AfterFirst<T>,
    R & AddGrammarMethod<S, First<T>>
  >;

export interface Grammar<
  TSyntax extends TokenSyntax<any, any> = TokenSyntax<any, any>,
  TTokens extends readonly Token<any, any>[] = readonly Token<any, any>[],
  TShape extends <TName extends (GetTokenNames<TTokens>[number] & TokenName) | undefined = undefined>(
    token?: TName
  ) => TName extends undefined
    ? `${TSyntax['start']}${TTokens[number]['name']}${TSyntax['end']}`
    : `${TSyntax['start']}${TName}${TSyntax['end']}`
  = any
> {
  kind: "Grammar";
  /**
   * the _syntax_ which regulates the structure of the tokens
   * in this grammar
   */
  syntax: TSyntax;
  /**
   * The formal definitions of the token's in this grammar
   */
  tokenDefinitions: TTokens;

  /**
   * The _names_ of all the tokens in this grammar
   */
  tokenNames: GetTokenNames<TTokens>;

  /**
   * **tokenShape**`(token?: string)`
   *
   * A function which can take the name of a valid token in the grammar.
   * - if no token name is provided then a union type which represents all
   * possible tokens will be returned.
   * in the grammar.
   * - if a token _is_ provided then the type which encapsulates all
   * variants of that particular token is returned
   */
  tokenShape: TShape;

  typeDefinition: GrammarTypeDefinition<TSyntax, TTokens>
}

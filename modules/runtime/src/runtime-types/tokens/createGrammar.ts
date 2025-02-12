import type {

  Token,
  TokenSyntax,
} from "inferred-types/types";

export function createGrammar<
  TSyntax extends TokenSyntax<N, D>,
  N extends string,
  D extends Record<string, string>,
  TTokens extends readonly Token<any, any>[],
>(
  tokenSyntax: TSyntax,
  ...tokens: TTokens
) {
  return {
    kind: "Grammar",
    syntax: tokenSyntax,
    tokens,
  };
}

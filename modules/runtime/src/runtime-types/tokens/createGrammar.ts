import type {

  Token,
  TokenSyntax,
} from "inferred-types/types";

export function createGrammar<
  TSyntax extends TokenSyntax<N, any, any>,
  N extends string,
  TTokens extends readonly Token[],
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

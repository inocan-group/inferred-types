import type {
  ExpandDictionary,
  Token,
  TokenSyntax,
} from "inferred-types/types";
import { reverseLookup } from "src/dictionary";

export type GrammarEncoder<
  TReq extends readonly string[],
> = ExpandDictionary<
  Record<TReq[number], string> &
  { [key: string]: string }
>;

export function createTokenSyntax<
  TName extends string,
  TStart extends string,
  TEnd extends string,
  TSep extends string,
  TEncode extends GrammarEncoder<[TStart, TEnd, TSep]>,
>(
  name: TName,
  start: TStart,
  end: TEnd,
  sep: TSep,
  encoder: TEncode,
) {
  const tg: TokenSyntax<TName> = {
    kind: "TokenSyntax",
    name,
    start,
    end,
    sep,
    encode(content) {
      return Object.keys(encoder).reduce(
        (acc, k) => {
          return acc.replaceAll(k, encoder[k]);
        },
        content,
      );
    },
    decode(encoded) {
      const lookup = reverseLookup(encoder);
      return Object.keys(lookup).reduce(
        (acc, k) => {
          const val = lookup[k as keyof typeof lookup] as string;
          return acc.replaceAll(k, val);
        },
        encoded,
      );
    },
  };

  return tg;
}

export function createGrammar<
  TGrammar extends TokenSyntax<N>,
  N extends string,
  TTokens extends readonly Token<any, any>[],
>(
  TokenSyntax: TGrammar,
  ...tokens: TTokens
) {

}

import type { ExpandDictionary, TokenSyntax } from "inferred-types/types";
import { createEncoder } from "inferred-types/runtime";

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
  TEncode extends Record<K, N>,
  K extends string,
  N extends string,
>(
  name: TName,
  start: TStart,
  end: TEnd,
  sep: TSep,
  encoding: TEncode,
) {
  const { encoder: encode, decoder: decode } = createEncoder(encoding);

  const tg: TokenSyntax<TName, TEncode> = {
    kind: "TokenSyntax",
    name,
    start,
    end,
    sep,
    encodingDefinition: encoding,
    encode,
    decode,
  } as unknown as TokenSyntax<TName, TEncode>;

  return tg;
}

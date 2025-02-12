import type {
  ExpandDictionary,
  NarrowObject,
} from "inferred-types/types";
import { asFromTo, createEncoder } from "inferred-types/runtime";

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
  TEncode extends NarrowObject<N>,
  N extends string,
>(
  name: TName,
  start: TStart,
  end: TEnd,
  sep: TSep,
  encoding: TEncode,
) {
  const { encoder: encode, decoder: decode } = createEncoder(encoding);

  const tg = {
    kind: "TokenSyntax" as const,
    name,
    start,
    end,
    sep,
    encodingDefinition: encoding,
    encode,
    decode,
  }

  return tg;
}

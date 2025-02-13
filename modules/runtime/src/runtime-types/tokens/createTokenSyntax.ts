import type {
  Expand,
  ExpandDictionary,
  NarrowObject,
} from "inferred-types/types";
import { createEncoder } from "inferred-types/runtime";

export type GrammarEncoder<
  TReq extends readonly string[],
> = ExpandDictionary<
  Record<TReq[number], string> &
  { [key: string]: string }
>;

type DefaultEncoder<
  TStart extends string,
  TEnd extends string,
  TSep extends string,
> = Expand<
  Record<TStart, "^start!"> &
  Record<TEnd, "^end!"> &
  Record<TSep, "^sep"> &
  Record<"\"", "^dq!"> &
  Record<"\'", "^sq!"> &
  Record<"`", "^grave!">
>;

function defaultEncoder<
  TStart extends string,
  TEnd extends string,
  TSep extends string,
>(start: TStart, end: TEnd, sep: TSep) {
  const config = {
    [start]: "^start!",
    [end]: "^end!",
    [sep]: "^sep!",
    "\"": "^dq!",
    "'": "^sq!",
    "`": "^grave!",
  };

  return config as unknown as DefaultEncoder<TStart, TEnd, TSep>;
}

export function createTokenSyntax<
  TName extends string,
  TStart extends string,
  TEnd extends string,
  TSep extends string,
  TEncode extends NarrowObject<N> = DefaultEncoder<TStart, TEnd, TSep>,
  N extends string = string,
>(
  name: TName,
  start: TStart,
  end: TEnd,
  sep: TSep,
  encoding: TEncode = defaultEncoder(start, end, sep) as unknown as TEncode,
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
  };

  return tg;
}

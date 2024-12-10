import type { FnToken, GeneratorToken } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

export function isFnToken(val: unknown): val is FnToken {
  return isString(val) && val.startsWith("<<fn::");
}

export function isGeneratorToken(val: unknown): val is GeneratorToken {
  return isString(val) && val.startsWith("<<gen::");
}

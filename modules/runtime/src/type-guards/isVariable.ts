import type { Variable } from "inferred-types/types";
import { ALPHA_CHARS, NUMERIC_CHAR } from "inferred-types/constants";
import { asChars, isString, startsWith } from "inferred-types/runtime";

const VALID = [
  ...ALPHA_CHARS,
  ...NUMERIC_CHAR,
  "_",
  ".",
];

const alpha = null as unknown as typeof ALPHA_CHARS[number];

function valid(chars: string[]): boolean {
  return chars.every(i => VALID.includes(i));
}

export function isVariable(val: unknown): val is Variable {
  return isString(val) && startsWith(alpha)(val) && valid(asChars(val));
}

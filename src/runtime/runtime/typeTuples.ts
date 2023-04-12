/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsAllCaps, AlphaChar, Digit, LowerAlphaChar, UpperAlphaChar, NumericChar } from "src/types";
import { kind, createTypeTuple, split } from "src/runtime";
import { ALPHA_CHARS, LOWER_ALPHA_CHARS, UPPER_ALPHA_CHARS } from "src/constants";

const digit = createTypeTuple(
  kind.literal<Digit>(),
  <T extends string>(val: T): val is Digit & T => {
    return typeof val === "string" && ["0","1","2","3","4","5","6","7","8","9"].includes(val as unknown);
  },
  "A numeric digit (aka, 0-9)"
);

const alpha = createTypeTuple(
  kind.literal<AlphaChar>(),
  (val: unknown): val is AlphaChar => {
    return typeof val === "string" && ALPHA_CHARS.includes(val as AlphaChar);
  },
  "A alpha (upper or lowercase)"
);

function convertToLowercase<T extends unknown>(val: T): val is T & Lowercase<T & string> {
  return typeof val === "string" && LOWER_ALPHA_CHARS.includes(val as LowerAlphaChar);
}

const alphaLowercase = createTypeTuple(
  kind.literal<AlphaChar[]>(),
  convertToLowercase,
  "A lowercase alpha"
);

const alphaUppercase = createTypeTuple(
  kind.literal<AlphaChar>(),
  <T>(val: T): val is T => {
    return typeof val === "string" && split(val).every(i => LOWER_ALPHA_CHARS.includes(i as any));
  },
  "An uppercase alpha"
);

/**
 * **typeTuples**
 * 
 * A dictionary of `TypeTuple` definitions
 */
export const typeTuples = {
  digit,
  alpha,
  alphaLowercase,
  alphaUppercase
} as const;

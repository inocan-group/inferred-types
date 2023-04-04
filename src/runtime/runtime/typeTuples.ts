import { AlphaChar, Digit, LowerAlphaChar, UpperAlphaChar } from "src/types";
import { kind, createTypeTuple } from "src/runtime";
import { ALPHA_CHARS, LOWER_ALPHA_CHARS, UPPER_ALPHA_CHARS } from "src/constants";

const digit = createTypeTuple(
  kind.literal<Digit>(),
  function <T>(val: T): val is Digit & T {
    return typeof toString(val) === "string" && ["0","1","2","3","4","5","6","7","8","9"].includes(val as unknown);
  },
  "A numeric digit (aka, 0-9)"
);

const letter = createTypeTuple(
  kind.literal<AlphaChar>(),
  function(val: unknown): val is AlphaChar {
    return typeof val === "string" && ALPHA_CHARS.includes(val as AlphaChar);
  },
  "A letter (upper or lowercase)"
);

const letterLowercase = createTypeTuple(
  kind.literal<AlphaChar>(),
  function (val: unknown): val is LowerAlphaChar {
    return typeof val === "string" && LOWER_ALPHA_CHARS.includes(val as LowerAlphaChar);
  },
  "A lowercase letter"
);

const letterUppercase = createTypeTuple(
  kind.literal<AlphaChar>(),
  function (val: unknown): val is UpperAlphaChar {
    return typeof val === "string" && UPPER_ALPHA_CHARS.includes(val as UpperAlphaChar);
  },
  "An uppercase letter"
);

/**
 * **typeTuples**
 * 
 * A dictionary of `TypeTuple` definitions
 */
export const typeTuples = {
  digit,
  letter,
  letterLowercase,
  letterUppercase
} as const;

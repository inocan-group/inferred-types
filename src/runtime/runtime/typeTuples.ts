import { AlphaChar, Digit, LowerAlphaChar, UpperAlphaChar } from "src/types";
import { kind, createTypeTuple,  LETTER, LETTER_UPPER } from "src/runtime";

const digit = createTypeTuple(
  kind.literal<Digit>(),
  function <T>(val: T): val is Digit & T {
    return typeof toString(val) === "string" && ["0","1","2","3","4","5","6","7","8","9"].includes(val as unknown);
  },
  "A numeric digit (aka, 0-9)"
);

const letter = createTypeTuple(
  kind.literal<AlphaChar>(),
  function (val: unknown): val is AlphaChar {
    return typeof val === "string" && LETTER.includes(val as AlphaChar);
  },
  "A letter (upper or lowercase)"
);

const letterLowercase = createTypeTuple(
  kind.literal<AlphaChar>(),
  function (val: unknown): val is LowerAlphaChar {
    return typeof val === "string" && LETTER.includes(val as LowerAlphaChar);
  },
  "A lowercase letter"
);

const letterUppercase = createTypeTuple(
  kind.literal<AlphaChar>(),
  function (val: unknown): val is UpperAlphaChar {
    return typeof val === "string" && LETTER_UPPER.includes(val as UpperAlphaChar);
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

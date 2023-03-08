import { Alpha, Digit, LowerAlpha, UpperAlpha } from "src/types";
import { toString } from "../literals/toString";
import { LETTER, LETTER_UPPER } from "./constants";
import { createTypeTuple } from "./createTypeTuple";
import { t } from "./kind";

const digit = createTypeTuple(
  t.literal<Digit>(),
  function <T>(val: T): val is Digit & T {
    return typeof toString(val) === "string" && ["0","1","2","3","4","5","6","7","8","9"].includes(val as unknown);
  },
  "A numeric digit (aka, 0-9)"
);

const letter = createTypeTuple(
  t.literal<Alpha>(),
  function (val: unknown): val is Alpha {
    return typeof val === "string" && LETTER.includes(val as Alpha);
  },
  "A letter (upper or lowercase)"
);

const letterLowercase = createTypeTuple(
  t.literal<Alpha>(),
  function (val: unknown): val is LowerAlpha {
    return typeof val === "string" && LETTER.includes(val as LowerAlpha);
  },
  "A lowercase letter"
);

const letterUppercase = createTypeTuple(
  t.literal<Alpha>(),
  function (val: unknown): val is UpperAlpha {
    return typeof val === "string" && LETTER_UPPER.includes(val as UpperAlpha);
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

import { NUMERIC_CHAR } from "src/constants/index";
import { split } from "../literals/split";
import { NumberLike } from "src/types/numeric-literals";


/**
 * **isNumericString**(value)
 *
 * Type guard to validate that a value is string which can be converted to a number.
 *
 * **Related:** `isNumberLike`
 */
export function isNumericString<T>(value: T): value is T & `${number}` {
  const numericChars = [...NUMERIC_CHAR];

  return typeof value === "string" && (
    split(value).every(i => numericChars.includes(i as any))
  );
}


/**
 * **isNumberLike**(value)
 *
 * Type guard to validate that a value is either:
 *
 * - a numeric string literal which can be converted to a number
 * - an actual number
 *
 * **Related:** `isNumericString`
 */
export function isNumberLike<T>(value: T): value is T & NumberLike {
  const numericChars = [...NUMERIC_CHAR];

  return typeof value === "string" && (
    split(value).every(i => numericChars.includes(i as any))
  )
  ? true
  : typeof value === "number" ? true : false;
}


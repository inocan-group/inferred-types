import { NUMERIC_CHAR } from "src/constants/index";
import { split } from "../literals/split";


/**
 * **isNumericString**(value)
 *
 * Type guard to validate that a value is string which can be converted to a number.
 *
 * @deprecated use `isNumberLike<T>` instead
 */
export function isNumericString<T>(value: T): value is T & `${number}` {
  const validChars = [...NUMERIC_CHAR, "x", "E"];


  return typeof value === "string" && split(value).every(i => validChars.includes(i as any));
}


/**
 * **isNumberLike**(value)
 *
 * Type guard to validate that a value is string which can be converted to a number.
 */
export function isNumberLike<T>(value: T): value is T & `${number}` {
  const numericChars = [...NUMERIC_CHAR];


  return typeof value === "string" && (
    split(value).every(i => numericChars.includes(i as any))
  );
}




import { NUMERIC_DIGIT } from "src/constants";

/**
 * **isNumericString**(value)
 * 
 * Type guard to validate that a value is string which can be converted to a number.
 */
export function isNumericString<T>(value: T): value is T & `${number}` {
  const validChar = [...NUMERIC_DIGIT, "x", "E"];

  return typeof value === "string" && [...value].every(i => validChar.includes(i));
}

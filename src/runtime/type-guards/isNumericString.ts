import { NUMERIC_CHAR } from "src/constants";
import { split } from "src/runtime";

/**
 * **isNumericString**(value)
 * 
 * Type guard to validate that a value is string which can be converted to a number.
 */
export function isNumericString<T>(value: T): value is T & `${number}` {
  const validChars = [...NUMERIC_CHAR, "x", "E"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof value === "string" && split(value).every(i => validChars.includes(i as any));
}

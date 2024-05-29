import { isString } from "./isString"

/**
 * Type guard to test with the passed in value is a http/https URL.
 */
export const isUrl = <T>(val: T): val is T & `http${"s" | ""}://${string}` => {
  return isString(val) && (val.startsWith("http://") || val.startsWith("https://"));
}

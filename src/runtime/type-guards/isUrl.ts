import { Uri } from "src/types/string-literals";
import { isString } from "./isString"

/**
 * Type guard to test with the passed in value is a http/https URL.
 */
export const isUrl = <T>(val: T): val is T & `http${"s" | ""}://${string}` => {
  return isString(val) && (val.startsWith("http://") || val.startsWith("https://"));
}

/**
 * Type guard to test with the passed in value is a valid URI.
 */
export const isUri = <T>(val: T): val is T & Uri => {
  return isString(val) && (
    val.startsWith("http://") || val.startsWith("https://") ||
    val.startsWith("file://") || val.startsWith("wss://") ||
    val.startsWith("ws://")
  );
}

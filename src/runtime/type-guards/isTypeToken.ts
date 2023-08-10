import {  TypeToken } from "src/types";
import { endsWith, startsWith, stripLeading, stripTrailing } from "src/runtime";
import { TYPE_TOKEN_ALL} from "src/constants";

const validTokens: readonly string[] = Array.from(TYPE_TOKEN_ALL);

/**
 * **isTypeToken**(val)
 * 
 * Type guard which checks whether the given value is a valid `TypeToken`
 */
export function isTypeToken<T extends string>(val: T): val is T & TypeToken {
  if (startsWith("<<")(val) && endsWith(">>")(val)) {
    const token = stripTrailing(stripLeading(val, "<<"), ">>").replace(/\:.*/, "");
    return validTokens.includes(token) ? true : false;
  } else {
    return false;
  }
}

import {   TypeToken } from "src/types/index";
import { endsWith, isString, startsWith, stripLeading, stripTrailing } from "src/runtime/index";
import { TYPE_TOKEN_ALL} from "src/constants/index";

const validTokens: readonly string[] = Array.from(TYPE_TOKEN_ALL);

/**
 * **isTypeToken**(val)
 * 
 * Type guard which checks whether the given value is a valid `TypeToken`
 */
export function isTypeToken(val: unknown): val is TypeToken {

  if (isString(val) && startsWith("<<")(val) && endsWith(">>")(val)) {
    const token = stripTrailing(stripLeading(val, "<<"), ">>").replace(/\:.*/, "");
    return validTokens.includes(token) ? true : false;
  } else {
    return false;
  }
}

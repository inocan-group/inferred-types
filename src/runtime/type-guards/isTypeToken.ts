import {   TypeToken } from "src/types/index";
import { TYPE_TOKEN_ALL} from "src/constants/index";
import { isString } from "./isString";
import { startsWith } from "./higher-order/startsWith";
import { endsWith } from "./higher-order/endsWith";
import { stripTrailing } from "../literals/stripTrailing";
import { stripLeading } from "../literals/stripLeading";

const validTokens: readonly string[] = Array.from(TYPE_TOKEN_ALL);

/**
 * **isTypeToken**(val)
 * 
 * Type guard which checks whether the given value is a valid `TypeToken`
 */
export function isTypeToken(val: unknown): val is TypeToken {

  if (isString(val) && startsWith("<<")(val) && endsWith(">>")(val)) {
    const token = stripTrailing(stripLeading(val, "<<"), ">>").replace(/\:.*/, "") as any;
    return validTokens.includes(token) ? true : false;
  } else {
    return false;
  }
}

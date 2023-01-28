import { Split } from "../../types";
import { isNumber } from "../type-guards/isNumber";
import { isString } from "../type-guards/isString";
import { errorCondition } from "./ErrorCondition";

/**
 * **split**(str, sep)
 * 
 * Splits a string on a given separator while preserving string literal typing
 * where available. Behavior with non-string types is:
 * 
 * - `number` - converted to string and then split
 * 
 * All are other types are disallowed.
 */
export function split<T extends string | number, S extends string>(str: T, sep: S) {
  return isString(str) 
    ? str.split(sep) as Split<T & string,S> & string
    : isNumber(str)
      ? String(str).split(sep) as Split<T & `${number}`,S> as Split<T & `${number}`, S>
      : errorCondition("invalid-type", `split() function allows string, numbers, and the null value but found a type of ${typeof str}.`) as never;
}


import { Zip5, ZipCode, ZipPlus4 } from "src/types/string-literals";
import { isString } from "../isString";
import { isNumber } from "../isNumber";
import { isNumberLike } from "../isNumericString";
import { retainWhile, stripChars } from "src/runtime/index";
import { NUMERIC_CHAR } from "src/constants/index";

/**
 * Type guard which validates that passed in value is a US ZipCode
 * in the `Zip5` format.
 *
 * **Related:** `isZipCode()`, `isZipPlus4()`
 */
export const isZipCode5 = (val: unknown): val is Zip5 => {
  if (isNumber(val)) {
    return isZipCode5(`${val}`);
  }
  return isString(val) && val.trim().length === 5 && isNumberLike(val.trim())
}

/**
 * Type guard which validates that passed in value is a US ZipCode
 * in the `ZipPlus4` format.
 *
 * **Related:** `isZipCode()`, `isZipCode5()`
 */
export const isZipPlus4 = (val: unknown): val is ZipPlus4 => {
  if (isString(val)) {
    const first = retainWhile(val.trim(), ...NUMERIC_CHAR);
    const next = stripChars(val.trim().replace(first, "").trim(), "-");
    return first.length === 5 && next.length === 4 && isNumberLike(next)
  }

  return false;
}

/**
 * Type guard which validates that passed in value is a US ZipCode
 * in either the `Zip5` or `ZipPlus4` format.
 *
 * **Related:** `isZipCode5()`, `isZipPlus4()`
 */
export const isZipCode = (val: unknown): val is ZipCode => {
  return isZipCode5(val) || isZipPlus4(val);
}

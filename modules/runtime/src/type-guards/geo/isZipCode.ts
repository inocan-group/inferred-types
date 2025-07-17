import type { Zip5, ZipCode, ZipPlus4 } from "inferred-types/types";
import { NUMERIC_CHAR } from "inferred-types/constants";
import { retainWhile, stripChars } from "inferred-types/runtime";
import { isNumber, isNumberLike, isString } from "runtime/type-guards";

/**
 * Type guard which validates that passed in value is a US ZipCode
 * in the `Zip5` format.
 *
 * **Related:** `isZipCode()`, `isZipPlus4()`
 */
export function isZipCode5(val: unknown): val is Zip5 {
    if (isNumber(val)) {
        return isZipCode5(`${val}`);
    }
    return isString(val) && val.trim().length === 5 && isNumberLike(val.trim());
}

/**
 * Type guard which validates that passed in value is a US ZipCode
 * in the `ZipPlus4` format.
 *
 * **Related:** `isZipCode()`, `isZipCode5()`
 */
export function isZipPlus4(val: unknown): val is ZipPlus4 {
    if (isString(val)) {
        const first = retainWhile(val.trim(), ...NUMERIC_CHAR);
        const next = stripChars(val.trim().replace(first, "").trim(), "-");
        return first.length === 5 && next.length === 4 && isNumberLike(next);
    }

    return false;
}

/**
 * Type guard which validates that passed in value is a US ZipCode
 * in either the `Zip5` or `ZipPlus4` format.
 *
 * **Related:** `isZipCode5()`, `isZipPlus4()`
 */
export function isZipCode(val: unknown): val is ZipCode {
    return isZipCode5(val) || isZipPlus4(val);
}

import type { PhoneNumber, PhoneNumberWithCountryCode, UsPhoneNumber } from "inferred-types/types";
import { NUMERIC_CHAR, PHONE_COUNTRY_CODES, WHITESPACE_CHARS } from "inferred-types/constants";
import { getPhoneCountryCode, isString, retainChars, stripChars } from "inferred-types/runtime";

/**
 * **maybePhoneNumber**`(val)`
 *
 * Type guard which validates that a string is in the shape of a phone
 * number.
 *
 * - Only valid characters (numeric, whitespace, `+`, `-`, `.`, and parenthesis)
 * - at least 7 numeric characters, 8 if `+` character used
 * - leading character (after whitespace) must be numeric, `(` or `+`
 *
 * **Related:** `asPhoneNumber()`, `PhoneNumber`, `isPhoneNumber`
 */
export function maybePhoneNumber(val: unknown): val is PhoneNumber {
  const svelte: string = String(val).trim();
  const chars: readonly string[] = svelte.split("");
  const numeric: string = retainChars(svelte, ...NUMERIC_CHAR);
  const valid = ["+", "(", ...NUMERIC_CHAR];
  const nothing: string = stripChars(svelte, ...[
    ...NUMERIC_CHAR,
    ...WHITESPACE_CHARS,
    "(",
    ")",
    "+",
    ".",
    "-",
  ]);

  return (
    chars.every(i => valid.includes(i))
    && svelte.startsWith(`+`)
      ? numeric.length >= 8
      : svelte.startsWith(`00`)
        ? numeric.length >= 10
        : numeric.length >= 7
          && nothing === ""
  );
}

const start = PHONE_COUNTRY_CODES.map(i => `+${i[0]} `);
/**
 * Type guard which validates that `val` starts with a valid
 * country code (although starting whitespace is also allowed).
 */
export function hasCountryCode(val: unknown): val is PhoneNumberWithCountryCode {
  if (isString(val)) {
    return start.some(i => val.trimStart().startsWith(i));
  }
  return false;
}

export function isUsPhoneNumber(val: unknown): val is UsPhoneNumber {
  if (isString(val)) {
    return maybePhoneNumber(val) && val.trimStart().startsWith(`+1 `);
  }
  return false;
}

/**
 * **isPhoneNumber**`(val)`
 *
 * Type guard which validates that a string is in the shape of a phone
 * number. This is a MORE strict check than `maybePhoneNumber()` which
 * you may want to use if you're pretty sure numeric looking values
 * are meant to be phone numbers.
 *
 * **Related:** `asPhoneNumber()`, `PhoneNumber`, `maybePhoneNumber`
 */
export function isPhoneNumber(val: unknown): val is PhoneNumber {
  if (
    isString(val)
    && maybePhoneNumber(val)
    && [" ", "-", "."].some(i => val.includes(i))
  ) {
    const cc = getPhoneCountryCode(val as string);
    const without = cc === ""
      ? retainChars((val as string), ...NUMERIC_CHAR)
      : retainChars((val as string).trimStart().replace(`+${cc} `, ""), ...NUMERIC_CHAR);

    switch (cc) {
      case "1":
        return without.length === 10;
      case "44":
        return !![10, 11].includes(without.length);
      case "":
        return without.length <= 10;
      default:
        return without.length <= 11;
    }
  }
  return false;
}

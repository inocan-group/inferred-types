import type { NumericChar, RetainWhile } from "inferred-types/types";
import { NUMERIC_CHAR } from "inferred-types/constants";
import { asChars } from "inferred-types/runtime";

/**
 * **takeNumericCharacters**`(content)`
 *
 * Starts at the passed in content and extracts all numeric characters
 * in the string until a non-numeric value arrives.
 */
export function takeNumericCharacters<T extends string>(content: T) {
    const nonNumericIdx = asChars(content).findIndex(i => !NUMERIC_CHAR.includes(i as any));

    return content.slice(0, nonNumericIdx) as unknown as RetainWhile<T, NumericChar>;
}

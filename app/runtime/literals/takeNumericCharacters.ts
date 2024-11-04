import { NUMERIC_CHAR } from "src/constants/NumericChar"
import { asChars } from "src/runtime/index"
import { NumericChar, RetainWhile } from "src/types/string-literals";


/**
 * **takeNumericCharacters**`(content)`
 *
 * Starts at the passed in content and extracts all numeric characters
 * in the string until a non-numeric value arrives.
 */
export const takeNumericCharacters = <T extends string>(content: T) => {
  let nonNumericIdx = asChars(content).findIndex(i => !NUMERIC_CHAR.includes(i as any));

  return content.slice(0,nonNumericIdx) as unknown as RetainWhile<T, NumericChar>;
}

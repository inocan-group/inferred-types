import type { NumericChar, NumericChar__OneToFive, NumericChar__ZeroToFour } from "types/string-literals";

/**
 * **RgbDecimalString**
 *
 * A string literal which represents the decimal numbers 0-255.
 */
export type RgbDecimalString
    = | `25${NumericChar__OneToFive}`
| `2${NumericChar__ZeroToFour}${NumericChar}`
| `1${NumericChar}${NumericChar}`
| `${NumericChar}${NumericChar}`;

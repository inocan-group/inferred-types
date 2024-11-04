import { NumericChar, Optional } from "src/types/index";

/**
 * **DialCountryCode**
 *
 * A simplified representation of `PhoneCountryCode` so as to not make other
 * phone patterns too complex.
 */
export type DialCountryCode = `${"+" | "00"}${ `1-${number}` | `${Exclude<NumericChar, "0">}`}${Optional<`${number}`>}`;


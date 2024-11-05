import { NumericChar, Optional } from "inferred-types/dist/types/index";

/**
 * **DialCountryCode**
 *
 * A simplified representation of `PhoneCountryCode` so as to not make other
 * phone patterns too complex.
 */
export type DialCountryCode = `${"+" | "00"}${ `1-${number}` | `${Exclude<NumericChar, "0">}`}${Optional<`${number}`>}`;


import type { NumericChar, Opt } from "inferred-types/types";

/**
 * **DialCountryCode**
 *
 * A simplified representation of `PhoneCountryCode` so as to not make other
 * phone patterns too complex.
 */
export type DialCountryCode = `${"+" | "00"}${`1-${number}` | `${Exclude<NumericChar, "0">}`}${Opt<`${number}`>}`;

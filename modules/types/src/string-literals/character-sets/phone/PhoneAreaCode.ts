import type { NumericChar } from "inferred-types/types";

/**
 * **PhoneAreaCode**
 */
export type PhoneAreaCode = `(${number})` | `${NumericChar}${number}`;

import { NumericChar } from "inferred-types/dist/types/index";


/**
 * **PhoneAreaCode**
 */
export type PhoneAreaCode = `(${number})` | `${NumericChar}${number}`;

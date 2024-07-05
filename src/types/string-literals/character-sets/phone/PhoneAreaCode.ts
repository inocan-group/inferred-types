import { NumericChar } from "src/types/index";


/**
 * **PhoneAreaCode**
 */
export type PhoneAreaCode = `(${number})` | `${NumericChar}${number}`;

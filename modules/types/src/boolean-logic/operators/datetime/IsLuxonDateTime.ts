import { Dictionary } from "types/base-types";
import { HasFunctionKeys } from "types/boolean-logic/operators/kv";


/**
 * **IsLuxonDateTime`<T>`
 *
 * A boolean operator which returns `true` when `T` appears to be a Luxon DateTime instance.
 */
export type IsLuxonDateTime<T> = T extends Dictionary
    ? HasFunctionKeys<T, ["diff", "diffNow", "hasSame", "getPossibleOffsets"]> extends true
    ? true
    : false
    : false;

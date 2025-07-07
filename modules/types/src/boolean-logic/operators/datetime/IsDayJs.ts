import { Dictionary } from "types/base-types";
import { HasFunctionKeys } from "types/boolean-logic/operators/kv";

/**
 * **IsDayJs**`<T>`
 *
 * Boolean utility to test whether `T` is DayJS date object.
 */
export type IsDayJs<T> = T extends Dictionary
    ? HasFunctionKeys<T, [
        "add", "clone", "date", "endOf", "isAfter", "isBefore", "daysInMonth",
        "millisecond"
    ]> extends true
    ? "calendar" extends keyof T
    ? false
    : true
    : false
    : false;

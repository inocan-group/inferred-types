import type { Dictionary, HasFunctionKeys } from "inferred-types/types";

/**
 * **IsMoment`<T>`
 *
 * a boolean operator which returns `true` when `T` appears to be a Moment.js instance.
 */
export type IsMoment<T> = T extends Dictionary
    ? HasFunctionKeys<T, [
        "isValid",
        "toDate",
        "format",
        "add",
        "subtract",
        "longDateFormat",
        "ordinal",
        "preparse",
        "relativeTime",
        "calendar"
    ]> extends true
        ? true
        : false
    : false;

import type { Dictionary, HasFunctionKeys, HasIndex } from "inferred-types/types";

/**
 * **IsMoment`<T>`
 *
 * a boolean operator which returns `true` when `T` appears to be a Moment.js instance.
 */
export type IsMoment<T> = T extends Dictionary
    ? HasIndex<T, "_isAMomentObject"> extends true
        ? true
        : HasFunctionKeys<T, [
            "isValid",
            "toDate",
            "format",
            "isDST",
            "add",
            "subtract",
            "calendar",
            "fromNow",
            "creationData"
        ]> extends true
            ? true
            : false
    : false;

import { Dictionary } from "types/base-types";
import { HasFunctionKeys } from "types/boolean-logic/operators/kv";

/**
 * **IsJsDate**`<T>`
 *
 * Boolean utility to test whether `T` is a Javascript Date object.
 */
export type IsJsDate<T> = T extends Dictionary
    ? HasFunctionKeys<T, [
        "getDate",
        "getMonth",
        "getMilliseconds",
        "getTimezoneOffset",
        "getUTCDate",
        "getUTCDay",
        "getUTCFullYear"
    ]> extends true
    ? true
    : false
    : false;

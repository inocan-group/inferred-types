import type { Dictionary } from "types/base-types";
import type { IsUnknown } from "types/boolean-logic";
import type { IsAny } from "types/boolean-logic/operators/IsAny";
import type { HasFunctionKeys } from "types/boolean-logic/operators/kv";

/**
 * **IsJsDate**`<T>`
 *
 * Boolean utility to test whether `T` is a Javascript Date object.
 */
export type IsJsDate<T> = [IsAny<T>] extends [true]
    ? boolean
    : [IsUnknown<T>] extends [true]
        ? boolean
        : T extends Dictionary
            ? [HasFunctionKeys<T, [
                "getDate",
                "getMonth",
                "getMilliseconds",
                "getTimezoneOffset",
                "getUTCDate",
                "getUTCDay",
                "getUTCFullYear"
            ]>] extends [true]
                ? true
                : false

            : false;

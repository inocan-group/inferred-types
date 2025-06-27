import type { IsLuxonDateTime } from "./IsLuxonDateTime";
import type { IsMoment } from "./IsMoment";

/**
 * **IsJsDate**`<T>`
 *
 * Boolean utility to test whether `T` is a Javascript Date object.
 */
export type IsJsDate<T> = IsMoment<T> extends false
    ? IsLuxonDateTime<T> extends false
        ? T extends object
            ? "getDate" extends keyof T
                ? "getTimezoneOffset" extends keyof T
                    ? "getFullYear" extends keyof T
                        ? "getMonth" extends keyof T
                            ? "getDay" extends keyof T
                                ? "getHours" extends keyof T
                                    ? "getMinutes" extends keyof T
                                        ? "getSeconds" extends keyof T
                                            ? "getMilliseconds" extends keyof T
                                                ? true
                                                : false
                                            : false
                                        : false
                                    : false
                                : false
                            : false
                        : false
                    : false
                : false
            : false
        : false
    : false;

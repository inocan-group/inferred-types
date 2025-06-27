import type { TypedFunction } from "inferred-types/types";

/**
 * **IsMoment`<T>`
 *
 * a boolean operator which returns `true` when `T` appears to be a Moment.js instance.
 */
export type IsMoment<T> = "format" extends keyof T
    ? "year" extends keyof T
        ? "month" extends keyof T
            ? "date" extends keyof T
                ? "hour" extends keyof T
                    ? "minute" extends keyof T
                        ? "second" extends keyof T
                            ? "millisecond" extends keyof T
                                ? T["millisecond"] extends TypedFunction
                                    ? "add" extends keyof T
                                        ? T["add"] extends TypedFunction
                                            ? "toISOString" extends keyof T
                                                ? T["toISOString"] extends TypedFunction
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
        : false
    : false;

import type { As } from "types/boolean-logic";
import type { Err } from "types/errors";
import type {  NumericChar, StripLeading } from "types/string-literals";
import type { TimezoneOffset } from "types/datetime";
import { HasLeadingTemplateLiteral } from "types/interpolation";

type TZ<T extends string> = Err<
    `parse-time/tz`,
    `The string '${T}' was unable to be parsed into a Timezone offset`,
    { parse: T }
>;


type Take<T extends string> = string extends T
    ? Error | { take: TimezoneOffset<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? Error | { take: TimezoneOffset<"branded">; rest: string }
        : T extends `Z${infer Rest}`
            ? { take: TimezoneOffset<"Z">; rest: Rest }
            : T extends `${infer Sign}${infer H1}${infer H2}${infer Rest}`
                ? Sign extends "+" | "-"
                    ? H1 extends NumericChar
                        ? H2 extends NumericChar
                            // Check if valid hour (00-14)
                            ? H1 extends "0" | "1"
                                ? H1 extends "1"
                                    ? H2 extends "0" | "1" | "2" | "3" | "4"
                                        ? Rest extends `:${infer M1}${infer M2}${infer Rest2}`
                                            ? M1 extends NumericChar
                                                ? M2 extends NumericChar
                                                    // Check if valid minutes (00-59)
                                                    ? M1 extends "0" | "1" | "2" | "3" | "4" | "5"
                                                        ? {
                                                            take: TimezoneOffset<`${Sign}${H1}${H2}:${M1}${M2}`> ;
                                                            rest: Rest2
                                                        }
                                                        : {
                                                            take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                            rest: Rest
                                                        }
                                                    : {
                                                        take: TimezoneOffset<`${Sign}${H1}${H2}`>; rest: Rest
                                                    }
                                                : {
                                                    take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                    rest: Rest
                                                }
                                            : Rest extends `${infer M1}${infer M2}${infer Rest2}`
                                                ? M1 extends NumericChar
                                                    ? M2 extends NumericChar
                                                        // Check if valid minutes (00-59)
                                                        ? M1 extends "0" | "1" | "2" | "3" | "4" | "5"
                                                            ? {
                                                                take: TimezoneOffset<`${Sign}${H1}${H2}${M1}${M2}`>;
                                                                rest: Rest2
                                                            }
                                                            : {
                                                                take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                                rest: Rest
                                                            }
                                                        : {
                                                            take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                            rest: Rest
                                                        }
                                                    : {
                                                        take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                        rest: Rest
                                                    }
                                                : {
                                                    take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                    rest: Rest
                                                }
                                        : TZ<T>
                                    : Rest extends `:${infer M1}${infer M2}${infer Rest2}`
                                        ? M1 extends NumericChar
                                            ? M2 extends NumericChar
                                                // Check if valid minutes (00-59)
                                                ? M1 extends "0" | "1" | "2" | "3" | "4" | "5"
                                                    ? {
                                                        take: TimezoneOffset<`${Sign}${H1}${H2}:${M1}${M2}`>;
                                                        rest: Rest2
                                                    }
                                                    : {
                                                        take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                        rest: Rest
                                                    }
                                                : {
                                                    take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                    rest: Rest
                                                }
                                            : {
                                                take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                rest: Rest
                                            }
                                        : Rest extends `${infer M1}${infer M2}${infer Rest2}`
                                            ? M1 extends NumericChar
                                                ? M2 extends NumericChar
                                                    // Check if valid minutes (00-59)
                                                    ? M1 extends "0" | "1" | "2" | "3" | "4" | "5"
                                                        ? {
                                                            take: TimezoneOffset<`${Sign}${H1}${H2}${M1}${M2}`>;
                                                            rest: Rest2
                                                        }
                                                        : {
                                                            take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                            rest: Rest
                                                        }
                                                    : {
                                                        take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                        rest: Rest
                                                    }
                                                : {
                                                    take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                    rest: Rest
                                                }
                                            : {
                                                take: TimezoneOffset<`${Sign}${H1}${H2}`>;
                                                rest: Rest
                                            }
                                : TZ<T>
                            : TZ<T>
                        : TZ<T>
                    : TZ<T>
                : TZ<T>;

/**
 * **TakeTimezone**`<T, TIgnoreLeading>`
 *
 * Looks for `TimezoneOffset` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TimezoneOffset, rest: Rest }`
 *
 * If there is no match an Error is returned.
 *
 * Valid timezone formats:
 * - "Z" for UTC
 * - "+HH:MM" or "-HH:MM" format (e.g., "+05:30", "-08:00")
 * - "+HH" or "-HH" format (e.g., "+05", "-08")
 *
 * Valid hour offsets range from 00-14.
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeTimezone<
    T extends string,
    TIgnoreLeading extends string | null = null
> = TIgnoreLeading extends string
    ? string extends TIgnoreLeading
        ? never
        : As<
            Take<
                As<StripLeading<T, TIgnoreLeading>, string>
            >,
                Error | { take: TimezoneOffset<"branded">; rest: string }
        >
    : As<
        Take<T>,
        Error | { take: TimezoneOffset<"branded">; rest: string }
    >;

import type {
    As,
    HasLeadingTemplateLiteral,
    NumericChar,
    StripLeading,
    TimezoneOffset,
} from "inferred-types/types";

type Take<T extends string> = string extends T
    ? { take: null; rest: string } | { take: TimezoneOffset<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? { take: null; rest: string } | { take: TimezoneOffset<"branded">; rest: string }
        : T extends `Z${infer Rest}`
            ? { take: "Z" & TimezoneOffset<"branded">, rest: Rest }
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
                                                        ? { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}:${M1}${M2}`, rest: Rest2 }
                                                        : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                    : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                            : Rest extends `${infer M1}${infer M2}${infer Rest2}`
                                                ? M1 extends NumericChar
                                                    ? M2 extends NumericChar
                                                        // Check if valid minutes (00-59)
                                                        ? M1 extends "0" | "1" | "2" | "3" | "4" | "5"
                                                            ? { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}${M1}${M2}`, rest: Rest2 }
                                                            : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                        : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                    : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                        : { take: null, rest: T }
                                    : Rest extends `:${infer M1}${infer M2}${infer Rest2}`
                                        ? M1 extends NumericChar
                                            ? M2 extends NumericChar
                                                // Check if valid minutes (00-59)
                                                ? M1 extends "0" | "1" | "2" | "3" | "4" | "5"
                                                    ? { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}:${M1}${M2}`, rest: Rest2 }
                                                    : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                            : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                        : Rest extends `${infer M1}${infer M2}${infer Rest2}`
                                            ? M1 extends NumericChar
                                                ? M2 extends NumericChar
                                                    // Check if valid minutes (00-59)
                                                    ? M1 extends "0" | "1" | "2" | "3" | "4" | "5"
                                                        ? { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}${M1}${M2}`, rest: Rest2 }
                                                        : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                    : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                                : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                            : { take: TimezoneOffset<"branded"> & `${Sign}${H1}${H2}`, rest: Rest }
                                : { take: null, rest: T }
                            : { take: null, rest: T }
                        : { take: null, rest: T }
                    : { take: null, rest: T }
                : { take: null, rest: T }

/**
 * **TakeTimezone**`<T, TIgnoreLeading>`
 *
 * Looks for `TimezoneOffset` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TimezoneOffset, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: T }`
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
                { take: null; rest: string } | { take: TimezoneOffset<"branded">; rest: string }
            >
    : As<
        Take<T>,
        { take: null; rest: string } | { take: TimezoneOffset<"branded">; rest: string }
    >;

import type {
    As,
    HasLeadingTemplateLiteral,
    NumericChar,
    StripLeading,
    TwoDigitHour
} from "inferred-types/types";

type Take<T extends string> = string extends T
    ? { take: string | null, rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? { take: string | null, rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends "0"
                ? C2 extends NumericChar
                    ? {
                        take: TwoDigitHour<"branded"> & `${C1}${C2}`,
                        rest: Rest
                    }
                    : { take: null, rest: T }
                : C1 extends "1"
                    ? C2 extends NumericChar
                        ? {
                            take: TwoDigitHour<"branded"> & `${C1}${C2}`,
                            rest: Rest
                        }
                        : { take: null, rest: T }
                    : C1 extends "2"
                        ? C2 extends "0" | "1" | "2" | "3"
                            ? { take: TwoDigitHour<"branded"> & `${C1}${C2}`, rest: Rest }
                            : { take: null, rest: T }
                        : { take: null, rest: T }
            : { take: null, rest: T }

/**
 * **TakeHours**`<T, TIgnoreLeading>`
 *
 * Looks for `TwoDigitHour` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitHour | null, rest: string }`
 *
 * Valid hours are 00-23.
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeHours<
    T extends string,
    TIgnoreLeading extends string | null = null
> = TIgnoreLeading extends string
        ? string extends TIgnoreLeading
            ? never
            : As<
                Take<
                    As<StripLeading<T, TIgnoreLeading>, string>
                >,
                { take: null; rest: string} | { take: TwoDigitHour<"branded">; rest: string }
            >
    : Take<T>;

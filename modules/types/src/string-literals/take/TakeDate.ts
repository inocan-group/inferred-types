import type {
    As,
    Err,
    FourDigitYear,
    HasLeadingTemplateLiteral,
    IsLeapYear,
    IsTwoDigitDate,
    NumericChar,
    StripLeading,
    TwoDigitDate,
    TwoDigitMonth,
} from "inferred-types/types";

type InvalidDate<T extends string> = Err<
    "parse-date/date",
    `unable to parse the date component [${T}] of this ISO string`,
    { date: T }
>;

type Take<T extends string> = string extends T
    ? Error | { take: TwoDigitDate<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? Error | { take: TwoDigitDate<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar
                ? C1 extends "0"
                    ? C2 extends "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
                        ? { take: TwoDigitDate<`${C1}${C2}`> ; rest: Rest }
                        : InvalidDate<T>
                    : C1 extends "1"
                        ? C2 extends NumericChar
                            ? {
                                take: TwoDigitDate<`${C1}${C2}`>;
                                rest: Rest;
                            }
                            : InvalidDate<T>
                        : C1 extends "2"
                            ? C2 extends NumericChar
                                ? {
                                    take: TwoDigitDate<`${C1}${C2}`>;
                                    rest: Rest
                                }
                                : InvalidDate<T>
                            : C1 extends "3"
                                ? C2 extends "0" | "1"
                                    ? {
                                        take: TwoDigitDate<`${C1}${C2}`>;
                                        rest: Rest;
                                    }
                                    : InvalidDate<T>
                                : InvalidDate<T>
                : InvalidDate<T>
            : InvalidDate<T>;

type WithContext<
    T extends string,
    TYear extends `${number}` | null,
    TMonth extends `${number}` | null
> = Take<T> extends Error
    ? Take<T>
    : Take<T> extends {
        take: infer Date extends `${number}`;
        rest: infer _Rest extends string;
    }
        ? IsTwoDigitDate<Date, TYear, TMonth> extends true
            ? Take<T>
            : Err<
                `parse-date/date`,
                `Validation against the ISO date failed. This is likely due to the date being too large for the month of the date (leap and double leap is considered when both year and month were provided to TakeDate<T>)`,
                { year: TYear; month: TMonth; date: T; leap: IsLeapYear<TYear> }
            >
        : never;

/**
 * **TakeDate**`<T, TIgnoreLeading, [TYear], [TMonth]>`
 *
 * Looks for `TwoDigitDate` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitDate, rest: Rest }`
 *
 * If there is no match:
 *
 * - `Err<'date'>`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeDate<
    T extends string,
    TIgnoreLeading extends string | null = null,
    TYear extends `${number}` | null = null,
    TMonth extends `${number}` | null = null
> = As<
    TIgnoreLeading extends string
        ? string extends TIgnoreLeading
            ? never
            : WithContext<StripLeading<T, TIgnoreLeading>, TYear, TMonth>
        : WithContext<T, TYear, TMonth>,
    Error |
    { take: TwoDigitDate<"branded">; rest: string }
>;

type X = FourDigitYear<"branded"> extends `${number}` ? true : false;

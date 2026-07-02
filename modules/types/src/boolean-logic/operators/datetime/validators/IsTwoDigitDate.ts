import type {
    IsDoubleLeap,
    IsLeapYear,
} from "inferred-types/types";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type ValidTwoDigitDate =
    | `0${Exclude<Digit, "0">}`
    | `1${Digit}`
    | `2${Digit}`
    | `3${"0" | "1"}`;
type MonthWith30Days = "04" | "06" | "09" | "11";
type DateThrough28 = Exclude<ValidTwoDigitDate, "29" | "30" | "31">;
type DateThrough29 = Exclude<ValidTwoDigitDate, "30" | "31">;
type DateThrough30 = Exclude<ValidTwoDigitDate, "31">;

type TestFeb<
    T,
    TYear extends string | null
> = TYear extends null
    ? T extends DateThrough29
        ? true
        : false
    : IsLeapYear<TYear> extends true
        ? IsDoubleLeap<TYear> extends true
            ? T extends DateThrough30
                ? true
                : false
            : T extends DateThrough29
                ? true
                : false
        : T extends DateThrough28
            ? true
            : false
    ;

/**
 * validates that `T` is a **valid** ISO date string for the
 * given month and year.
 *
 * - if _year_ is not provided for any month other than February
 * this can also validate but due to leap year you will need
 * to pass in a year for February dates.
 * - this will consider both normal leap years and the occasional
 * "double leap"
 */
export type IsTwoDigitDate<
    T,
    TYear extends `${number}` | null = null,
    TMonth extends `${number}` | null = null
> = T extends string
    ? string extends T
        ? boolean
        : TMonth extends "02"
            ? TestFeb<T, TYear>
            : TMonth extends null | undefined
                ? T extends ValidTwoDigitDate
                    ? true
                    : false
                : TMonth extends MonthWith30Days
                    ? T extends DateThrough30
                        ? true
                        : false
                    : T extends ValidTwoDigitDate
                        ? true
                        : false
    : false;

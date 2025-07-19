import type { IsDoubleLeap, IsLeapYear } from "types/boolean-logic/operators";
import type {
    IsoDate30,
    IsoDate31,
    IsoMonthsWith30Days
} from "types/datetime";

type TestFeb<
    T,
    TYear extends string | null
> = TYear extends null
    ? T extends Exclude<IsoDate30, "30">
        ? true
        : false
    : IsLeapYear<TYear> extends true
        ? IsDoubleLeap<T> extends true
            ? T extends IsoDate30
                ? true
                : false
            : T extends Exclude<IsoDate30, "30">
                ? true
                : false
        : T extends Exclude<IsoDate30, "30" | "29">
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
            ? T extends IsoDate31
                ? true
                : false
            : TMonth extends IsoMonthsWith30Days
                ? T extends IsoDate30
                    ? true
                    : false
                : T extends IsoDate31
                    ? true
                    : false
    : false;

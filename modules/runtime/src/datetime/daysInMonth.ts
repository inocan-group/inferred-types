import type {
    FourDigitYear,
    MonthAbbrev,
    MonthName,
    TwoDigitMonth
} from "inferred-types/types";
import {
    getMonthNumber,
    isLeapYear
} from "runtime/datetime";
import { isTwoDigitMonth } from "runtime/type-guards";

export function daysInMonth(
    month: TwoDigitMonth | MonthName | MonthAbbrev,
    year?: FourDigitYear | number
) {
    const monthNum = isTwoDigitMonth(month)
        ? Number(month)
        : getMonthNumber(month);

    const leapYear = year ? isLeapYear(year) : false;
}

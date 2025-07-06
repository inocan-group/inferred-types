import type {
    FourDigitYear,
    MonthAbbrev,
    MonthName,
    TwoDigitMonth
} from "inferred-types/types";
import { getMonthNumber } from "runtime/datetime/getMonthNumber";
import { isLeapYear } from "runtime/datetime/isLeapYear";
import { isTwoDigitMonth } from "runtime/datetime/parseIsoDate";

export function daysInMonth(
    month: TwoDigitMonth | MonthName | MonthAbbrev,
    year?: FourDigitYear | number
) {
    const monthNum = isTwoDigitMonth(month)
        ? Number(month)
        : getMonthNumber(month);

    const leapYear = year ? isLeapYear(year) : false;
}

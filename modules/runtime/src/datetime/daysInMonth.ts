import {ISO_MONTH_WITH_30} from "inferred-types/constants";
import type {
    FourDigitYear,
    MonthAbbrev,
    MonthName,
    TwoDigitMonth
} from "inferred-types/types";
import { asTwoDigitMonth, getMonthName } from "runtime/datetime";
import {
    isTwoDigitMonth,
    getMonthNumber,
    isLeapYear,
    isError,
    err,
    isDoubleLeap,
    isDefined
} from "inferred-types/runtime";

/**
 * **daysInMonth**`(month, [year])`
 *
 * Provides the number of days in a given month.
 *
 * - the **month** can be passed in as a fully spelled out month (e.g., "January"),
 * an abbreviated month name (e.g., "Jan") or a two digit month (e.g., "01", "02", etc.)
 *     - Note: these correspond to the `MonthName`, `MonthAbbrev`, and `TwoDigitMonth`
 *     types defined in this library
 * - if a **year** is provided then both leap years and _double_ leap
 * years will be built into the calculation for February
 * - if no year information is available, February will report as having
 * 28 days.
 */
export function daysInMonth(
    month: TwoDigitMonth | MonthName | MonthAbbrev,
    year?: FourDigitYear | number
) {
    const monthNum = isTwoDigitMonth(month)
        ? Number(month)
        : getMonthNumber(month);

    if(isError(monthNum)) {
        return err(
            "unknown-month",
            `The daysInMonth() function was unable to determine the month from the value passed in: ${month}`,
            { month, year }
        )
    }


    return monthNum === 2
        ? isDefined(year)
            ? isLeapYear(year)
                ? isDoubleLeap(year)
                    ? 30
                    : 29
            : 28
        : 28
    : ISO_MONTH_WITH_30.includes(asTwoDigitMonth(monthNum) as any)
        ? 30
        : 31
}

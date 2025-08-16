import {ISO_DATE_30} from "inferred-types/constants";
import type {
    DaysInMonth,
    FourDigitYear,
    MonthAbbrev,
    MonthName,
    TwoDigitMonth
} from "inferred-types/types";
import {
    asTwoDigitMonth,
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
export function daysInMonth<
    TMonth extends TwoDigitMonth | MonthName | MonthAbbrev,
    TYear extends FourDigitYear | number | undefined = undefined
>(
    month: TMonth,
    year: TYear = undefined as TYear
) {
    const monthNum: number | Error = isTwoDigitMonth(month)
        ? Number(month)
        : getMonthNumber(month) as number | Error;

    if(isError(monthNum)) {
        return err(
            "unknown-month/days-in-month",
            `The daysInMonth() function was unable to determine the month from the value passed in: ${month}. Remember that if you're using month names or abbreviations they must map to the MonthName and MonthAbbrev types which capitalize the names.`,
            { month, year }
        ) as unknown as DaysInMonth<TMonth,TYear>
    }

    const twoDigitMonth = asTwoDigitMonth(monthNum);

    return (
        monthNum === 2
        ? isDefined(year)
            ? isLeapYear(year)
                ? isDoubleLeap(year)
                    ? 30
                    : 29
            : 28
        : 28
    : ISO_DATE_30.includes(twoDigitMonth as any)
        ? 30
        : 31
    ) as DaysInMonth<TMonth,TYear>
}

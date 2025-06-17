import {
    asDate,
} from "inferred-types/runtime";

/**
 * Provides the ISO week number of a given date.
 *
 * - if no date is provided, the current date is used
 * - an ISO week always starts on Monday
 * - numerically an ISO week will be between 1 and 53
 *     - 52 is max for most years
 *     - those years which start on a Thursday or
 * years with a leap day and start on a Wednesday get 53
 */
export function getWeekNumber<
    T extends string | Record<string, any> | Date,
>(date: T = new Date() as T): number {
    const d = asDate(date);

    if (!d) {
        throw new Error(`invalid date passed into getWeekNumber${String(date)}`);
    }

    // Copy date so we don't mutate input
    const dateCopy = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

    // Set to nearest Thursday: current date + 4 - current day number (Monday=1, Sunday=7)
    // ISO 8601: week starts on Monday, week 1 is the week with the first Thursday
    const dayNum = dateCopy.getUTCDay() || 7; // Sunday is 0 in JS, make it 7
    dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - dayNum);

    // Get year of the adjusted date (the year this Thursday belongs to)
    const yearOfThursday = dateCopy.getUTCFullYear();

    // Get first Thursday of that year
    const jan1 = new Date(Date.UTC(yearOfThursday, 0, 1));
    const jan1DayNum = jan1.getUTCDay() || 7;
    const firstThursday = new Date(jan1);
    firstThursday.setUTCDate(jan1.getUTCDate() + ((4 - jan1DayNum + 7) % 7));

    // Calculate week number: number of weeks between this Thursday and the first Thursday
    const weekNo = Math.floor((dateCopy.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

    return weekNo;
}

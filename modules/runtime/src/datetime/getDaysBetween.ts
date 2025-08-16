import { asDate } from "runtime/datetime";

/**
 * Provides the number of days between two dates.
 *
 * - if the second date is left out, the current date is used
 */
export function getDaysBetween<
    A extends number | string | Date | Record<string, any>,
    B extends number | string | Date | Record<string, any>,
>(a: A, b: B = new Date() as B): number {
    const aDate = asDate(a);
    const bDate = asDate(b);
    if (!aDate || !bDate) {
        throw new Error(`Invalid date passed into getDaysBetween()`);
    }

    const aStr = aDate.toISOString().split("T")[0];
    const bStr = bDate.toISOString().split("T")[0];

    const dateA = new Date(`${aStr}T00:00:00Z`);
    const dateB = new Date(`${bStr}T00:00:00Z`);

    // Calculate the difference in milliseconds and convert to days
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((dateB.getTime() - dateA.getTime()) / msInDay));
}

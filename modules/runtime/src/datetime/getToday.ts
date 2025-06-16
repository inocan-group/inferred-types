import type { IsoDate } from "inferred-types/types";

/**
 * Returns the current date as an
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string.
 */
export function getToday(): IsoDate {
    const today = new Date();
    return today.toISOString().split("T")[0] as IsoDate;
}

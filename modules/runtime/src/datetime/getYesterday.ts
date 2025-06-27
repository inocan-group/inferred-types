import type { IsoDate } from "inferred-types/types";

/**
 * **getYesterday**`(now?)`
 *
 * Returns an ISO 8601 date string for yesterday.
 * - Optional `now` parameter for testing purposes
 */
export function getYesterday(now: Date = new Date()): IsoDate {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0] as IsoDate;
}

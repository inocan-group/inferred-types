import type { IsoDate } from "inferred-types/types";

/**
 * **getTomorrow**`(now?)`
 *
 * Returns an ISO 8601 date string for tomorrow.
 * - Optional `now` parameter for testing purposes
 */
export function getTomorrow(now: Date = new Date()): IsoDate {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0] as IsoDate;
}

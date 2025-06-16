import type { IsoDate } from "inferred-types/types";

/**
 * Returns a
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string
 * for yesterday..
 */
export function getYesterday(): IsoDate {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0] as IsoDate;
}

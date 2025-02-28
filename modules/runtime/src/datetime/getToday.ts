import type { Iso8601Date } from "inferred-types/types";

/**
 * Returns the current date as an
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string.
 */
export function getToday(): Iso8601Date<"explicit"> {
    const today = new Date();
    return today.toISOString().split("T")[0] as Iso8601Date<"explicit">;
}

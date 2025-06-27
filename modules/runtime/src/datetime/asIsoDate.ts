import type { DateLike, IsoDate } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * **asIsoDate**`(input)`
 *
 * Converts common date representations to a ISO 8601 Date string (e.g., "2024-01-15").
 */
export function asIsoDate<
    T extends DateLike,
>(input: T): IsoDate {
    const d = asDate(input);

    return d.toUTCString() as IsoDate;
}

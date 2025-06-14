import { MONTH_ABBR } from "inferred-types/constants";
import { DateLike, GetMonthAbbrev } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * **getMonthAbbrev**`(date)`
 *
 * Converts any date-like value into a month abbreviation.
 *
 * **Related:** `getMonthName()`, `getMonthNumber()`
 */
export function getMonthAbbrev<T extends DateLike>(
    date: T
): GetMonthAbbrev<T> {
    const d = asDate(date);

    return MONTH_ABBR[d.getMonth()] as GetMonthAbbrev<T>
}





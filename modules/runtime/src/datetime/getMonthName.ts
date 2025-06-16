import type { DateLike, GetMonthName } from "inferred-types/types";
import { MONTH_NAME } from "inferred-types/constants";
import { asDate } from "inferred-types/runtime";

/**
 * **getMonthName**`(date)`
 *
 * Converts any date-like value into a month abbreviation.
 *
 * **Related:** `getMonthAbbrev()`
 */
export function getMonthName<T extends DateLike>(date: T): GetMonthName<T> {
    const d = asDate(date);

    return MONTH_NAME[d.getMonth()] as GetMonthName<T>;
}

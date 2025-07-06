import type {
    DateLike,
    GetMonthNumber,
    MonthAbbrev,
    MonthName
} from "inferred-types/types";
import { MONTH_ABBREV_LOOKUP, MONTH_NAME_LOOKUP } from "constants/DateTime";
import { parseDate } from "runtime/datetime/parseDate";
import { err } from "runtime/errors/err";
import { asNumber } from "runtime/numeric/asNumber";
import { isError } from "runtime/type-guards";
import {
    isMonthAbbrev,
    isMonthName
} from "runtime/type-guards/datetime/index";

/**
 * **getMonthNumber()`
 *
 * Get's the a date's numeric index (aka., January is 1, etc.).
 *
 * - you can pass in a `DateLike` value _or_ a month name
 * or month abbreviation
 */
export function getMonthNumber<
    T extends DateLike | MonthName | MonthAbbrev
>(date: T): GetMonthNumber<T> {
    if (isMonthName(date)) {
        return MONTH_NAME_LOOKUP[date].num as GetMonthNumber<T>;
    }
    else if (isMonthAbbrev(date)) {
        return MONTH_ABBREV_LOOKUP[date].num as GetMonthNumber<T>;
    }
    else {
        const d = parseDate(date);
        if (isError(d)) {
            return d as GetMonthNumber<T>;
        }

        if (!d.month) {
            return err(
                `month-number/missing`,
                `The type passed into GetMonthNumber<T> was successfully parsed but there is no month information. This typically means that an IsoYear was passed in.`,

            ) as GetMonthNumber<T>;
        }

        return asNumber(d.month) + 1 as GetMonthNumber<T>;
    }
}

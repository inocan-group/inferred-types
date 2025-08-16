import type {
    DateLike,
    GetMonthNumber,
    MonthAbbrev,
    MonthName
} from "inferred-types/types";
import { MONTH_ABBREV_LOOKUP, MONTH_NAME_LOOKUP } from "inferred-types/constants";
import { parseDate } from "runtime/datetime";
import { err } from "runtime/errors";
import { asNumber } from "runtime/numeric";
import {
    isMonthAbbrev,
    isMonthName,
    isParsedDate
} from "runtime/type-guards";

/**
 * **getMonthNumber**`(date | MonthName | MonthAbbrev)`
 *
 * Get's the a date's numeric index for the **month** being represented
 * (aka., January is 1, etc.).
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

        if (isParsedDate(d)) {
            if (!d.month) {
                return err(
                    `month-number/missing`,
                    `The type passed into GetMonthNumber<T> was successfully parsed but there is no month information. This typically means that an IsoYear was passed in.`,

                ) as GetMonthNumber<T>;
            }
            return asNumber(d.month) as GetMonthNumber<T>;
        }

        return err(`invalid-date`, `Unable to parse the date when calling getMonthNumber()`) as unknown as GetMonthNumber<T>;
    }
}

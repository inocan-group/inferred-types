import { asDate, isError, isInteger, parseDateObject } from "inferred-types/runtime";
import { AsTwoDigitMonth, DateLike } from "inferred-types/types";

/**
 * **asTwoDigitMonth**`(dateLike)`
 *
 * given any DateLike input, this function returns the **month** in a
 * two digit format appropriate for ISO Date/DateTime strings.
 *
 * **Note:**
 * - if an integer number between 1 and 12 is passed in this
 * will be treated as a numeric month rather than as an epoch
 * timestamp
 */
export function asTwoDigitMonth<T extends DateLike>(
    date: T
) {
    return (
        isInteger(date)
        ? date > 0 && date < 13
            ? `${date}`.padStart(2, "0")
        : isError(asDate(date))
            ? asDate(date)
        : isError(parseDateObject(date))
            ? parseDateObject(date)
        : parseDateObject(date)["month"]
    : isError(asDate(date))
            ? asDate(date)
        : isError(parseDateObject(date))
            ? parseDateObject(date)
        : parseDateObject(date)["month"]
    ) as AsTwoDigitMonth<T>
}

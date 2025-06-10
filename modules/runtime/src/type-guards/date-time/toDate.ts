import { Never } from "inferred-types/constants";
import {
    isDate,
    isDateFnsDate,
    isEpochInMilliseconds,
    isEpochInSeconds,
    isIsoDate,
    isDayJs,
    isIsoYear,
    isMoment,
    isNumber,
    isTemporalDate,
    isLuxonDate
} from "inferred-types/runtime";
import { DateLike } from "inferred-types/types";

export function toDate<T extends DateLike>(date: T): Date {
    return isDate(date)
        ? date
        : isDayJs(date)
            ? date.toDate()
        : isLuxonDate(date)
            ? date.toJSDate()
        : isMoment(date)
            ? date.toDate()
        : isDateFnsDate(date)
            ? new Date(date.toISOString())
        : isTemporalDate(date)
            ? new Date(date.toString())
        : isNumber(date) && isEpochInMilliseconds(date)
            ? new Date(date)
        : isNumber(date) && isEpochInSeconds(date)
            ? new Date(date * 1000)
        : isIsoYear(date)
            ? new Date(`${date}-01-01`)
        : isIsoDate(date)
            ? new Date(date)
            : Never
}

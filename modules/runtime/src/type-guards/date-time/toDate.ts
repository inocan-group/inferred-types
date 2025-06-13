import type { DateLike } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import {
    isDate,
    isDateFnsDate,
    isDayJs,
    isEpochInMilliseconds,
    isEpochInSeconds,
    isIsoDate,
    isIsoYear,
    isLuxonDate,
    isMoment,
    isNumber,
    isTemporalDate
} from "inferred-types/runtime";

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
                                            : Never;
}

import { isDateLike, isDictionary, isString, parseIsoDate } from "inferred-types/runtime";
import { DateLike } from "inferred-types/types";

export function parseDate<T extends DateLike>(d: T) {
    return isString(d)
        ? parseIsoDate(d)
        : isDictionary(d) && isDateLike(d)
        ? parseIsoDate(d)
        :
}

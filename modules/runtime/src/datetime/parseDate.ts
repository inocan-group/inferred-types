import {
    err,
    isDateLike,
    isNumber,
    isString,
    parseDateObject,
    parseIsoDate,
    parseNumericDate,
    isObject,
    IsoMeta
} from "inferred-types/runtime";
import { DateLike } from "inferred-types/types";

export function parseDate<T extends DateLike>(d: T): IsoMeta | Error {

    return isString(d)
        ? parseIsoDate(d)
        : isObject(d) && isDateLike(d)
        ? parseDateObject(d)
        : isNumber(d)
        ? parseNumericDate(d)
        : err(
            `parse-date/invalid`,
            `The DateLike object passed in wasn't able to be parsed!`,
            { parse: d }
        )
}

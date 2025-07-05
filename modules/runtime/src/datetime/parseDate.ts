import {
    isString,
    isError,
    isIsoDate,
    isIsoDateTime,
    isDictionary
} from "runtime/type-guards";
import {
    parseIsoDate,
    asDate
} from "runtime/datetime";

import { AsDateMeta, DateLike, ParseDate, ParsedDate } from "inferred-types/types";
import { err } from "runtime/errors";

// type Returns<T> = T extends string
//     ? ParseDate<T> extends Error
//         ? ParseDate<T>
//     : ParseDate<T> extends ParsedDate
//         ? AsParsedDate<ParseDate<T>>
//         : never
// : T extends object
//     ? ParseDateObject<T> extends Error
//         ? ParseDateObject<T>
//         : Parse


export function parseDate<
    T extends DateLike
>(d: T) {

    const iso = isString(d)
        ? d
        : asDate(d).toISOString();

    if (isError(iso)) {
        return iso;
    }

    if (isString(iso)) {
        return parseIsoDate(iso);
    } else if (isIsoDateTime(iso)) {
        return parseIsoDate(iso);
    }

    return err(`parse/structure`)
}

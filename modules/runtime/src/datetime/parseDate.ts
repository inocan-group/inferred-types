import type { DateLike } from "inferred-types/types";
import {
    asDate,
    parseIsoDate
} from "runtime/datetime";

import { err } from "runtime/errors";
import {
    isError,
    isIsoDateTime,
    isString
} from "runtime/type-guards";

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
    }
    else if (isIsoDateTime(iso)) {
        return parseIsoDate(iso);
    }

    return err(`parse/structure`);
}

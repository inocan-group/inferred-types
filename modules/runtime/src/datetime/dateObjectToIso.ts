import type {
    DateLike,
    DateMeta,
    IsoDate,
    IsoDateTime,
    IsoDateTimeLike
} from "types/datetime";
import { asDate, parseIsoDate, toIsoDateString } from "runtime/datetime";
import { isError } from "runtime/type-guards";

export function dateObjectToIso(d: DateLike & object) {
    const date: Date = d instanceof Date ? d : asDate(d);
    const iso = date.toISOString() as IsoDateTimeLike;
    const parsed = parseIsoDate(iso);

    if (isError(parsed)) {
        return parsed;
    }

    const result = toIsoDateString(parsed);

    return result as [typeof parsed] extends [Error]
        ? typeof parsed
        : [typeof parsed] extends [DateMeta]
            ? [typeof parsed["hasTime"]] extends [true]
                ? typeof result & IsoDateTime
                : [typeof parsed["hasTime"]] extends [false]
                    ? typeof result & IsoDate
                    : never
            : never;
}

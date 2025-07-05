import { DateLike } from "inferred-types/types";
import { parseIsoDate, asDateTime, isError } from "inferred-types/runtime";





/**
 * Parses an object-based Date container into a `ParsedDate` tuple.
 * Always uses the original ISO string (with offset/timezone) if available.
 */
export function parseDateObject<T extends DateLike & object>(d: T) {
    const date = d instanceof Date ? d : asDateTime(d);
    const iso = date.toISOString();


    const parsed = parseIsoDate(iso);
    if (isError(parsed)) {
        throw parsed;
    }
    return parsed;
}

import type { AsDateMeta, DateLike, DatePlus } from "inferred-types/types";
import { asDateTime, isDateMeta, isError, parseIsoDate } from "inferred-types/runtime";
import { IsoDateTime } from "@inferred-types/types";

/**
 * Parses an object-based Date container into a `ParsedDate` tuple.
 * Always uses the original ISO string (with offset/timezone) if available.
 */
export function parseDateObject<T extends DateLike>(d: T): AsDateMeta<T> {
    const date: Date | Error = d instanceof Date ? d : asDateTime(d);

    if(isError(date)) {
        return date as unknown as AsDateMeta<T>;
    }

    // For the time components, always use UTC (the actual time stored in the Date object)
    const utcIso = date.toISOString() as IsoDateTime | "";
    const utcParsed = parseIsoDate(utcIso);

    // exit if unable parse ISO string
    if (isError(utcParsed)) {
        throw utcParsed as unknown as AsDateMeta<T>;
    }

    // If sourceIso exists, extract timezone from it to preserve original offset
    const datePlus = (date as DatePlus);
    const sourceIso = datePlus.sourceIso;

    if (sourceIso) {
        const sourceParsed = parseIsoDate(sourceIso);
        if (isDateMeta(sourceParsed) && sourceParsed.timezone) {
            // Use UTC time components but preserve original timezone
            return {
                ...utcParsed,
                timezone: sourceParsed.timezone
            } as AsDateMeta<T>;
        }
    }

    // If the source has no timezone concept (e.g., Temporal.PlainDateTime),
    // return timezone as null
    if (datePlus.offset === null && datePlus.source) {
        return {
            ...utcParsed,
            timezone: null
        } as AsDateMeta<T>;
    }

    return utcParsed as AsDateMeta<T>;
}

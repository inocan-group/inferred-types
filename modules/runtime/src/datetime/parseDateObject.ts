import type { DateLike } from "inferred-types/types";
import { asDateTime, isError, parseIsoDate } from "inferred-types/runtime";

/**
 * Parses an object-based Date container into a `ParsedDate` tuple.
 * Always uses the original ISO string (with offset/timezone) if available.
 */
export function parseDateObject<T extends DateLike & object>(d: T) {
    const date = d instanceof Date ? d : asDateTime(d);
    
    // For the time components, always use UTC (the actual time stored in the Date object)
    const utcIso = date.toISOString();
    const utcParsed = parseIsoDate(utcIso);
    if (isError(utcParsed)) {
        throw utcParsed;
    }
    
    // If sourceIso exists, extract timezone from it to preserve original offset
    const sourceIso = (date as any).sourceIso;
    if (sourceIso) {
        const sourceParsed = parseIsoDate(sourceIso);
        if (!isError(sourceParsed) && sourceParsed.timezone) {
            // Use UTC time components but preserve original timezone
            return {
                ...utcParsed,
                timezone: sourceParsed.timezone
            };
        }
    }
    
    return utcParsed;
}

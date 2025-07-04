import { DateLike } from "inferred-types/types";
import { parseIsoDate, isLuxonDate, isMoment, isDateFnsDate, isTemporalDate, isDate, asDateTime, isError } from "inferred-types/runtime";

/**
 * Parses an object-based Date container into a `ParsedDate` tuple.
 * Always uses the original ISO string (with offset/timezone) if available.
 */
export function parseDateObject<T extends DateLike & object>(d: T) {
    let iso: string | undefined;
    // Prefer original input string if available and looks like ISO
    const getOriginalIso = (obj: any): string | undefined => {
        if (typeof obj === "string" && obj.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([Zz]|[+-]\d{2}:?\d{2})$/)) {
            return obj;
        }
        if (obj && typeof obj.originalInput === "string") {
            return obj.originalInput;
        }
        if (obj && typeof obj.input === "string") {
            return obj.input;
        }
        if (obj && typeof obj._i === "string") {
            return obj._i;
        }
        return undefined;
    };

    if (isLuxonDate(d) && typeof d.toISO === "function") {
        iso = getOriginalIso(d) || d.toISO();
    } else if (isMoment(d) && typeof d.toISOString === "function") {
        iso = getOriginalIso(d) || d.toISOString();
    } else if (isDate(d)) {
        iso = d.toISOString();
    } else if (isDateFnsDate(d) && typeof d.toISOString === "function") {
        iso = d.toISOString();
    } else if (isTemporalDate(d) && typeof d.toString === "function") {
        iso = getOriginalIso(d) || d.toString();
    } else if (typeof d === "string") {
        iso = d;
    } else {
        iso = asDateTime(d).toISOString();
    }
    if (!iso) {
        throw new Error("Could not extract ISO string from date-like object");
    }
    // DEBUG: Log the ISO string for diagnosis
    // eslint-disable-next-line no-console
    console.log("parseDateObject: ISO string:", iso);
    const parsed = parseIsoDate(iso);
    if (isError(parsed)) {
        throw parsed;
    }
    return parsed;
}

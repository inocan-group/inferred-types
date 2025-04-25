import {
    isDate,
    isIsoDateTime,
    isIsoExplicitDate,
    isIsoImplicitDate,
    isIsoYear,
    isLuxonDate,
    isMoment,
    isNumber,
    stripAfter,
} from "inferred-types/runtime";
import { DateLike } from "inferred-types/types";

/**
 * **asDate**`(input)`
 *
 * Converts common date representations to a Javascript Date object.
 */
export function asDate<
    T extends number | string | Record<string, any> | Date,
>(input: T): Date | undefined {
    if (isDate(input)) {
        input.setHours(0, 0, 0, 0); // strip time
        return input;
    }

    if (isMoment(input)) {
        return input.toDate();
    }

    if (isLuxonDate(input)) {
        return new Date(input.toMillis());
    }

    if (isIsoDateTime(input)) {
        const [year, month, day] = stripAfter(input, "T").split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    if (isIsoExplicitDate(input)) {
        const [year, month, day] = input.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    if (isIsoImplicitDate(input)) {
        const year = Number(input.slice(0, 4));
        const month = Number(input.slice(4, 6));
        const day = Number(input.slice(6, 8));
        return new Date(year, month - 1, day);
    }

    if (isIsoYear(input)) {
        const d = new Date(Number(input), 0, 1);
        d.setHours(0, 0, 0, 0); // strip time
        return d;
    }

    if (isNumber(input)) {
    // appears to be year literal
        if (`${input}`.length === 4) {
            return new Date(`${input}-01-01`);
        }
        if (input >= 0) {
            // treat as an epoch timestamp
            return new Date(input * 1000);
        }
    }

    return undefined;
}

function toDate(value: DateLike): Date {
    if (typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value))) {
        return new Date(Number(value));
    }

    if (typeof value === "string") {
        const parsed = new Date(value);
        if (!isNaN(parsed.getTime())) return parsed;
        throw new Error(`Invalid ISO string format: ${value}`);
    }

    if (value instanceof Date) {
        return value;
    }

    if (value && typeof value === "object") {
        if ("toDate" in value && typeof value.toDate === "function") {
            const result = value.toDate();
            if (result instanceof Date && !isNaN(result.getTime())) return result;
        }

        if ("startOfDay" in value && typeof value.startOfDay === "function") {
            const result = value.startOfDay();
            if (result instanceof Date && !isNaN(result.getTime())) return result;
        }

        if ("getTime" in value && typeof value.getTime === "function") {
            const ts = value.getTime();
            if (typeof ts === "number" && !isNaN(ts)) return new Date(ts);
        }

        if ("toJSON" in value && typeof value.toJSON === "function") {
            const iso = value.toJSON();
            const result = new Date(iso);
            if (!isNaN(result.getTime())) return result;
        }
    }

    throw new Error("Unsupported DateLike input");
}

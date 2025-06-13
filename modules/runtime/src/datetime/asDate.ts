import {
    err,
    isDate,
    isIsoDateTime,
    isIsoExplicitDate,
    isIsoImplicitDate,
    isIsoYear,
    isLuxonDate,
    isMoment,
    isNumber,
    stripAfter
} from "inferred-types/runtime";

/**
 * **asDate**`(input)`
 *
 * Converts common date representations to a Javascript Date object.
 */
export function asDate<
    T extends number | string | Record<string, any> | Date,
>(input: T): Date {
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

    throw err(`invalid/date`, `The date-like value you passed to 'asDate()' function was unable to be converted to a Javascript Date object!`, { date: input });
}

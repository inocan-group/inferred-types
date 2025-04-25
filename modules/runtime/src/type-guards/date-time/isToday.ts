import { getToday, isDate, isIsoExplicitDate, isLuxonDate, isMoment, isString, stripAfter } from "inferred-types/runtime";

/**
 * **isToday`(val)`**
 *
 * A type guard which validates whether the passed in value _represents_ today's date
 * as either a:
 *
 *   - [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string, or
 *   - [Moment.js](https://momentjs.com/docs/#/displaying/)  DateTime object, or
 *   - [Luxon](https://moment.github.io/luxon/#/?id=luxon) DateTime object
 */
export function isToday<T>(test: T): boolean {
    if (isString(test)) {
        const justDate = stripAfter(test, "T");
        return isIsoExplicitDate(justDate) && justDate === getToday();
    }
    else if (isMoment(test) || isDate(test)) {
        return (
            stripAfter(test.toISOString(), "T") === getToday()
        );
    }
    else if (isLuxonDate(test)) {
        return (
            stripAfter(test.toISO(), "T") === getToday()
        );
    }

    return false;
}

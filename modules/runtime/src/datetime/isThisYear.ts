import type { DateLike } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * A validation -- not type guard -- on whether the passed in `val` is a
 * date or date-time representation and that it's year is the same as the
 * current year.
 *
 * Types correctly handled are:
 *
 * - **JS Date** object
 * - **ISO Date** or **ISO Datetime**
 * - a number representing a **epoch** timestamp (in seconds, not milliseconds)
 * - **MomentJS** and **Luxon** datetime objects
 *
 * **Note:** an invalidate date/datetime passed in will always resolve to `false`
 */
export function isThisYear(val: DateLike, now: Date = new Date()): boolean {
    const currentYear = now.getFullYear();

    try {
        const d = asDate(val);

        return d.getUTCFullYear() === currentYear;
    }
    catch {
        return false;
    }
}

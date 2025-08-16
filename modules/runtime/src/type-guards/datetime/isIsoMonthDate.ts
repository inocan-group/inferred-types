import type { IsoMonthDate } from "inferred-types/types";
import { ISO_DATE_30, ISO_DATE_31 } from "inferred-types/constants";
import { stripLeading } from "runtime/string-literals";
import { isString } from "runtime/type-guards";

function validate(d: IsoMonthDate): boolean {
    const stripped = stripLeading(d, "--");
    const [month, date] = [
        stripped.slice(0, 2),
        stripLeading(stripped.slice(3), ":")
    ];
    if (month === "02" || ISO_DATE_30.includes(date as any)) {
        // because we can't be sure that it's not going to be
        // a "double leap" then we need to accept it as valid
        return ISO_DATE_30.includes(date as any);
    }

    return ISO_DATE_31.includes(date as any);
}

/**
 * **isIsoMonthDate**`(date) -> boolean`
 *
 * type-guard which validates whether this `date` is a valid ISO
 * Month/Date date (aka, a date that is year independent).
 */
export function isIsoMonthDate(date: unknown): date is IsoMonthDate {
    return isString(date)
        && date.startsWith("--")
        && date.replace(/--\d{2}-?[0-3]\d/, "") === ""
        && validate(date as IsoMonthDate);
}

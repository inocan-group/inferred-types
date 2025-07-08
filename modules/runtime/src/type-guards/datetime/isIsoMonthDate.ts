import type { IsoMonthDate } from "inferred-types/types";
import { isString } from "runtime/type-guards";
import { stripLeading } from "runtime/string-literals";
import { ISO_DATE_30, ISO_DATE_31, ISO_MONTH_WITH_30 } from "constants/DateTime";

function validate(d: IsoMonthDate): boolean {
    const stripped = stripLeading(d, "--");
    const [month, date] = [
        stripped.slice(0, 2),
        stripLeading(stripped.slice(3), ":")
    ];
    if (month === "02" || ISO_MONTH_WITH_30.includes(date as any)) {
        // because we can't be sure that it's not going to be
        // a "double leap" then we need to accept it as valid
        return ISO_DATE_30.includes(date as any);
    }

    return ISO_DATE_31.includes(date as any);
}

/**
 * type-guard which validates whether this genuinely a valid ISO
 * Month/Date date.
 *
 * The _type_ this returns is no different from the `IsoMonthDateLike`
 * but because it has been run through this type guard we know that:
 *
 * - the dates are 100% valid
 */
export function isIsoMonthDate(date: unknown): date is IsoMonthDate {
    return isString(date)
        && date.startsWith("--")
        && date.replace(/--\d{2}-?[0-3]\d/, "") === ""
        && validate(date as IsoMonthDate);
}

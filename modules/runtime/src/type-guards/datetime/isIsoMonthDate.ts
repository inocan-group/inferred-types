import type { IsoMonthDate, IsoMonthDateLike } from "inferred-types/types";
import { isString, stripLeading } from "inferred-types/runtime";

function validate(d: IsoMonthDateLike): boolean {
    const stripped = stripLeading(d, "--");
    const [month, date] = [
        Number(stripped.slice(0, 2)),
        Number(stripLeading(stripped.slice(3), ":"))
    ];

    const daysInMonth = 31;
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
        && validate(date as IsoMonthDateLike);
}

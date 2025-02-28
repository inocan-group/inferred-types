import type { Iso8601Date, Iso8601DateTime, LuxonJs, MomentJs } from "inferred-types/types";
import { isDate, isIsoExplicitDate, isLuxonDateTime, isMoment, isString, stripAfter } from "inferred-types/runtime";

function strip(str: string) {
    return stripAfter(str, "T") as unknown as Iso8601Date<"explicit">;
}

/**
 * **asIsoDate**`(input)`
 *
 * Converts common date representations to a ISO 8601 date string (e.g., "2024-01-15").
 */
export function asIsoDate<
    T extends Iso8601Date | Iso8601DateTime | MomentJs | LuxonJs["DateTime"],
>(input: T): Iso8601Date<"explicit"> {
    return isDate(input)
        ? strip(input.toISOString())
        : isMoment(input)
            ? strip(input.toISOString())
            : isLuxonDateTime(input)
                ? input.toISODate() as unknown as Iso8601Date<"explicit">
                : isIsoExplicitDate(input)
                    ? input
                    : isIsoExplicitDate(input)
                        ? `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(6, 8)}` as Iso8601Date<"explicit">
                        : isString(input)
                            ? strip(input)
                            : "0000-00-00" as unknown as Iso8601Date<"explicit">;
}

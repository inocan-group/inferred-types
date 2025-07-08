import type {
    DateMeta,
    IsoDate,
    IsoDateTime,
    IsoMonthDate,
    IsoYear,
    IsoYearMonth,
    IsUnion
} from "inferred-types/types";
import { err } from "runtime/errors";
import { isIsoDate } from "runtime/type-guards/datetime";

type Return<T extends DateMeta> = [IsUnion<T["dateType"]>] extends [true]
    ? IsoDate | IsoDateTime
    : [T["dateType"]] extends ["year"]
    ? IsoYear
    : [T["dateType"]] extends ["year-independent"]
    ? IsoMonthDate
    : [T["dateType"]] extends ["year-month"]
    ? IsoYearMonth
    : [T["dateType"]] extends ["date"]
    ? IsoDate
    : [T["dateType"]] extends ["datetime"]
    ? [T["hasTime"]] extends [true]
    ? IsoDateTime
    : IsoDate
    : Error;

/**
 * **toIsoDateString**`(meta) -> IsoDate | IsoDateTime`
 *
 * Converts a parsed date into an ISO Date or DateTime string.
 */
export function toIsoDateString<T extends DateMeta>(
    parsed: T
): Return<T> {
    let resolved;

    if (parsed.hasTime === false) {
        switch (parsed.dateType) {
            case "date":
            case "datetime":
                resolved = `${parsed.year}-${parsed.month}-${parsed.date}`;
                break;
            case "year":
                resolved = parsed.year;
                break;
            case "year-independent":
                resolved = `--${parsed.month}-${parsed.date}`;
                break;
            case "year-month":
                resolved = `-${parsed.year}-${parsed.month}`;
        }

        if (isIsoDate(resolved)) {
            return resolved as Return<T>;
        }
        else {
            err(`parse/runtime`) as unknown as Return<T>;
        }
    }

    switch (parsed.dateType) {
        case "date":
            return err("invalid-date", `The parsed 'type' of the date was 'date' but the 'hasTime' variable was set to true! This should not happen.`) as unknown as Return<T>;
        case "datetime":
            return `${parsed.year}-${parsed.month}-${parsed.date}T${parsed.hour}:${parsed.minute}${parsed.second ? `:${parsed.second}${parsed.ms ? `.${parsed.ms}` : ""}` : ""}` as unknown as Return<T>;
            break;
    }

    return err("invalid-date", `the parsed 'dateType' was '${parsed.dateType}' but the 'hasTime' property was set to 'false'!`) as unknown as Return<T>;
}

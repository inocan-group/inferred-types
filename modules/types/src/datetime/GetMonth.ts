import type { MONTH_ABBR, MONTH_NAME } from "inferred-types/constants";
import type {
    AsNumber,
    DateLike,
    IsIsoYear,
    IsWideType,
    MonthAbbrev,
    MonthName,
    ParseDate,
    ParsedDate
} from "inferred-types/types";
import type { MonthNumber } from "luxon";

/**
 * **GetMonthAbbrev**`<T>`
 *
 * Takes any `DateLike` value and convert it into:
 *
 * - if possible a specific `MonthAbbrev`
 * - if not possible then the union type `MonthAbbrev`
 */
export type GetMonthAbbrev<T extends DateLike> = IsWideType<T> extends true
    ? MonthAbbrev
    : T extends string
        ? [IsIsoYear<T>] extends [true]
            ? `Jan`
            : ParseDate<T> extends ParsedDate
                ? ParseDate<T>["1"] extends keyof typeof MONTH_ABBR
                    ? typeof MONTH_ABBR[ParseDate<T>["1"]]
                    : MonthAbbrev
                : MonthAbbrev
        : MonthAbbrev;

/**
 * **GetMonthName**`<T>`
 *
 * Takes any `DateLike` value and convert it into:
 *
 * - if possible a specific `MonthName`
 * - if not possible then the union type `MonthName`
 */
export type GetMonthName<T extends DateLike> = IsWideType<T> extends true
    ? MonthName
    : T extends string
        ? [IsIsoYear<T>] extends [true]
            ? `Jan`
            : ParseDate<T> extends ParsedDate
                ? ParseDate<T>["1"] extends keyof typeof MONTH_NAME
                    ? typeof MONTH_NAME[ParseDate<T>["1"]]
                    : MonthName
                : MonthName
        : MonthName;

/**
 * Takes any `DateLike` value and converts it into:
 *
 * - if possible a numeric literal
 * - if not possible a union type of the possible values
 */
export type GetMonthNumber<T extends DateLike> = IsWideType<T> extends true
    ? MonthNumber
    : T extends string
        ? IsIsoYear<T> extends true
            ? 1
            : ParseDate<T> extends ParsedDate
                ? AsNumber<ParseDate<T>["1"]>
                : MonthName
        : MonthNumber;

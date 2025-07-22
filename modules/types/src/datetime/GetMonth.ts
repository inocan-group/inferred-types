import type {
    MONTH_ABBR,
    MONTH_ABBREV_LOOKUP,
    MONTH_NAME,
    MONTH_NAME_LOOKUP
} from "inferred-types/constants";
import type {
    AsNumber,
    Err,
    ErrContext,
    ToStringLiteral__Tuple
} from "inferred-types/types";
import type {
    IsInteger,
    IsIsoYear,
    IsWideType
} from "types/boolean-logic/operators";
import type {
    DateLike,
    MonthAbbrev,
    MonthName,
    MonthNumber,
    ParseDate,
    ParsedDate,
} from "types/datetime";

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

type MonthNameLookup = typeof MONTH_NAME_LOOKUP;
type MonthAbbrevLookup = typeof MONTH_ABBREV_LOOKUP;

/**
 * **GetMonthNumber**
 *
 * Takes any `DateLike` value or a `DateName` or `DateAbbrev` and converts it into:
 *
 * - if the month information can be parsed from `T` then:
 *     - if possible a numeric literal
 *     - if the precise literal is not known then all of the valid month numbers will be
 * returned as a union type
 * - if `T` is not parsable or the Date which was provided no date information (e.g.,
 * an `IsoYear`) then an error will be returned
 */
export type GetMonthNumber<
    T extends DateLike | MonthName | MonthAbbrev
> = T extends object
    ? MonthNumber
    : IsWideType<T> extends true
        ? MonthNumber
        : T extends MonthName
            ? MonthNameLookup[T]["num"]
            : T extends MonthAbbrev
                ? MonthAbbrevLookup[T]["num"]
                : T extends string
                    ? ParseDate<T> extends ParsedDate
                        ? [ParseDate<T>["1"]] extends [null]
                            ? Err<
                                `month-number/missing`,
                                `The type passed into GetMonthNumber<T> was successfully parsed but there is no month information. This typically means that an IsoYear was passed in.`,
                                { parse: ToStringLiteral__Tuple<ParseDate<T>> }
                            >
                            : AsNumber<ParseDate<T>[1]>
                        : ParseDate<T> extends Error
                            ? ErrContext<
                                ParseDate<T>,
                                { fn: "GetMonthNumber" }
                            >
                            : never
                    : T extends number
                        ? IsInteger<T> extends true
                            ? MonthNumber
                            : Err<`month-number/parse`>
                        : Err<
                            `month-number/invalid-type`,
                            `The type passed into GetMonthNumber<T> is invalid!`,
                            { parse: T }
                        >;

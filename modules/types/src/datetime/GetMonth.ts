import type {
    MONTH_ABBR,
    MONTH_ABBREV_LOOKUP,
    MONTH_NAME,
    MONTH_NAME_LOOKUP
} from "inferred-types/constants";
import type {
    AsNumber,
    DateLike,
    Err,
    ErrContext,
    IsInteger,
    IsIsoYear,
    IsWideType,
    MonthAbbrev,
    MonthName,
    MonthNumber,
    ParseDate,
    ParsedDate,
    ToStringLiteral__Tuple
} from "inferred-types/types";

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
// Helper type to extract month from ISO date string directly
type ExtractMonthFromIsoDate<T extends string>
    = T extends `${infer Year}-${infer Month}-${infer Rest}`
        ? Month extends `01` ? 1
            : Month extends `02` ? 2
                : Month extends `03` ? 3
                    : Month extends `04` ? 4
                        : Month extends `05` ? 5
                            : Month extends `06` ? 6
                                : Month extends `07` ? 7
                                    : Month extends `08` ? 8
                                        : Month extends `09` ? 9
                                            : Month extends `10` ? 10
                                                : Month extends `11` ? 11
                                                    : Month extends `12` ? 12
                                                        : never
        : never;

export type GetMonthNumber<
    T
> = [T] extends [object]
    ? MonthNumber
    : [T] extends [MonthName]
        ? MonthNameLookup[T]["num"]
        : [T] extends [MonthAbbrev]
            ? MonthAbbrevLookup[T]["num"]
            : [T] extends [string]
                ? string extends T
                    ? boolean
                // Try direct extraction first for ISO dates
                    : ExtractMonthFromIsoDate<T> extends never
                        ? [ParseDate<T>] extends [ParsedDate]
                            ? [ParseDate<T>["1"]] extends [null]
                                ? Err<
                                    `month-number/missing`,
                                    `The type passed into GetMonthNumber<T> was successfully parsed but there is no month information. This typically means that an IsoYear was passed in.`,
                                    { parse: ToStringLiteral__Tuple<ParseDate<T>> }
                                >
                                : ParseDate<T>[1] extends `${infer N extends number}`
                                    ? N
                                    : AsNumber<ParseDate<T>[1]>
                            : [ParseDate<T>] extends [Error]
                                ? ErrContext<
                                    ParseDate<T>,
                                    { fn: "GetMonthNumber" }
                                >
                                : never
                        : ExtractMonthFromIsoDate<T>
                : [T] extends [number]
                    ? IsInteger<T> extends true
                        ? MonthNumber
                        : Err<`month-number/parse`>
                    : Err<
                        `month-number/invalid-type`,
                        `The type passed into GetMonthNumber<T> is invalid!`,
                        { parse: T }
                    >;

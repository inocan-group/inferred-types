import { MONTH_ABBR, MONTH_NAME } from "inferred-types/constants";
import {
    As,
    AsNumber,
    DateLike,
    Decrement,
    Increment,
    IsIsoExplicitDate,
    IsIsoImplicitDate,
    IsIsoYear,
    IsWideType,
    MonthAbbrev,
    MonthName,
    NumberLike,
    Slice,
    Split
} from "inferred-types/types";
import { MonthNumber } from "luxon";

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
        : IsIsoExplicitDate<T> extends true
            ? Split<T,"-"> extends readonly [string, infer DateNum, string]
                ? Decrement<AsNumber<DateNum>> extends keyof typeof MONTH_ABBR
                    ? typeof MONTH_ABBR[Decrement<AsNumber<DateNum>>]
                    : MonthAbbrev
            : MonthAbbrev
        : IsIsoImplicitDate<T> extends true
            ? Slice<T,5,2> extends `${number}`
                ? Decrement<AsNumber<Slice<T,5,2>>> extends keyof typeof MONTH_ABBR
                    ? typeof MONTH_ABBR[Decrement<AsNumber<Slice<T,5,2>>>]
                    : MonthAbbrev
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
    ? IsIsoYear<T> extends true
        ? `January`
    : IsIsoExplicitDate<T> extends true
        ? Split<T,"-"> extends readonly [string, infer DateNum, string]
            ? Decrement<AsNumber<DateNum>> extends keyof typeof MONTH_NAME
                ? typeof MONTH_NAME[Decrement<AsNumber<DateNum>>]
                : MonthName
        : MonthName
    : IsIsoImplicitDate<T> extends true
        ? Slice<T,5,2> extends `${number}`
            ? Decrement<AsNumber<Slice<T,5,2>>> extends keyof typeof MONTH_NAME
                ? typeof MONTH_NAME[Decrement<AsNumber<Slice<T,5,2>>>]
                : MonthName
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
    : IsIsoExplicitDate<T> extends true
        ? Split<T,"-"> extends readonly [string, infer DateNum, string]
            ? DateNum extends NumberLike
                ? AsNumber<Increment<DateNum>>
                : MonthNumber
        : MonthNumber
    : IsIsoImplicitDate<T> extends true
        ? Slice<T,5,2> extends `${number}`
            ? AsNumber<Increment<Slice<T,5,2>>>
            : MonthNumber
        : MonthNumber
: MonthNumber;


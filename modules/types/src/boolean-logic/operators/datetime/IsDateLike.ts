import type { DateLike, IsInteger, IsIsoDate, IsIsoDateTime, IsIsoYear, IsJsDate, IsLiteral, IsLuxonDateTime, IsMoment, IsNumber, IsString, Or } from "inferred-types/types";

/**
 * Boolean operator which tests whether `T` is truly `DateLike`
 *
 * - this includes testing any number to be sure it is an Integer number
 */
export type IsDateLike<T> = Or<[
    IsJsDate<T>,
    IsMoment<T>,
    IsLuxonDateTime<T>,
]> extends true
    ? true

    : T extends DateLike
        ? IsLiteral<T> extends true
            ? IsNumber<T> extends true
                ? IsInteger<T>
                : IsString<T> extends true
                    ? Or<[
                        IsIsoDate<T>,
                        IsIsoYear<T>,
                        IsIsoDateTime<T>
                    ]>
                    : boolean
            : boolean
        : false;

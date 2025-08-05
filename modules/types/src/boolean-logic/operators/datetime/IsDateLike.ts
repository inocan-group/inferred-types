import type {
    IsAny,
    IsDayJs,
    IsInteger,
    IsIsoDate,
    IsIsoDateTime,
    IsIsoMonthDate,
    IsIsoMonthDateTime,
    IsIsoYear,
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
    IsNever,
    IsNumber,
    IsString,
    Or
} from "inferred-types/types";

/**
 * **IsDateLike**`<T>`
 *
 * Boolean operator which tests whether `T` is truly `DateLike`
 *
 * - this includes testing any number to be sure it is an Integer number
 * - the static _type_ `DateLike` is an approximation but allows for "false positives"
 * so this utility will get you to a literal `true`/`false`.
 */
export type IsDateLike<T>
= [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false

        : T extends object
            ? Or<[
                IsJsDate<T>,
                IsMoment<T>,
                IsLuxonDateTime<T>,
                IsDayJs<T>
            ]> extends true
                ? true
                : false
            : [number] extends [T]
                ? boolean
                : [IsNumber<T>] extends [true]
                    ? IsInteger<T>
                    : [IsString<T>] extends [true]
                        ? [IsIsoDate<T>] extends [true]
                            ? true
                            : [IsIsoDateTime<T>] extends [true]
                                ? true
                                : [IsIsoYear<T>] extends [true]
                                    ? true
                                    : [IsIsoMonthDate<T>] extends [true]
                                        ? true
                                        : [IsIsoMonthDateTime<T>] extends [true]
                                            ? true
                                            : false
                        : false;

import { DateLike, IsInteger, IsIsoDate, IsIsoYear, IsLiteral, IsNumber, IsString, Or } from "inferred-types/types";


/**
 * Boolean operator which tests whether `T` is truely `DateLike`
 *
 * - this includes testing any number to be sure it is an Integer number
 */
export type IsDateLike<T> = T extends DateLike
    ? IsLiteral<T> extends true
        ? IsNumber<T> extends true
            ? IsInteger<T>
        : IsString<T> extends true
            ? Or<[IsIsoDate<T>, IsIsoYear<T>]>
        : boolean
    : boolean
: false;

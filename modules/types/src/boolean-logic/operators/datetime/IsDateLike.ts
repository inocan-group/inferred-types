import type {
    Every,
    IsAny,
    IsDayJs,
    IsInteger,
    IsIsoDate,
    IsIsoDateTime,
    IsIsoFullDate,
    IsIsoMonthDate,
    IsIsoYear,
    IsIsoYearMonth,
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
    IsNegativeNumber,
    IsNever,
    IsString,
    IsUnion,
    IsUnknown,
    Some,
    UnionToTuple
} from "inferred-types/types";

type Member<
    T extends readonly unknown[]
> = {
    [K in keyof T]: IsIsoDate<T[K]>
};

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
: [IsUnknown<T>] extends [true]
    ? boolean
: [IsUnion<T>] extends [true]
    ? Every<Member<UnionToTuple<T>>, "equals", true> extends true
        ? true
        : Some<Member<UnionToTuple<T>>, "equals", true> extends true
        ? boolean
        : false
: [T] extends [object]
    ? [IsJsDate<T>] extends [true]
        ? true
    : [IsMoment<T>] extends [true]
        ? true
    : [IsLuxonDateTime<T>] extends [true]
        ? true
    : [IsDayJs<T>] extends [true]
        ? true
    : false
: [number] extends [T]
    ? boolean
: [T] extends [number]
    ? IsNegativeNumber<T> extends true
        ? false
    : IsInteger<T> extends true
        ? true
    : false
: [IsString<T>] extends [true]
    ? [IsIsoYear<T>] extends [true]
        ? true
    : [IsIsoMonthDate<T>] extends [true]
        ? true
    : [IsIsoYearMonth<T>] extends [true]
        ? true
    : [IsIsoFullDate<T>] extends [true]
        ? true
    : [IsIsoDateTime<T>] extends [true]
        ? true
        : false
: false;

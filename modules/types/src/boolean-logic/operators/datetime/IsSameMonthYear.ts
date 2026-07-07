import type {
    DateLike,
    Err,
    IsDayJs,
    IsEpochInMilliseconds,
    IsEpochInSeconds,
    IsEqual,
    IsInteger,
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
} from "inferred-types/types";

type GetDatePart<T> = T extends `${infer D}T${string}` ? D : T;

// Extracts YYYY-MM from date strings
type GetYearMonthFromDate<T extends string>
    = T extends `-${infer Rest}`
        ? GetYearMonthFromDate<Rest>
        : T extends `${infer Y}-${infer M}-${string}` ? `${Y}-${M}`
            : T extends `${infer Y}-${infer M}` ? `${Y}-${M}`
                : never;

type EitherAreDateObject<A, B> = IsJsDate<A> extends true
    ? true
    : IsJsDate<B> extends true
        ? true
        : IsMoment<A> extends true
            ? true
            : IsMoment<B> extends true
                ? true
                : IsDayJs<A> extends true
                    ? true
                    : IsDayJs<B> extends true
                        ? true
                        : IsLuxonDateTime<A> extends true
                            ? true
                            : IsLuxonDateTime<B> extends true
                                ? true
                                : false;

type SameStringMonthYear<
    A extends string,
    B extends string
> = string extends A
    ? boolean
    : string extends B
        ? boolean
        : IsEqual<GetYearMonthFromDate<GetDatePart<A>>, GetYearMonthFromDate<GetDatePart<B>>> extends true
            ? true
            : false;

type SameNumericMonthYear<
    A extends number,
    B extends number
> = IsInteger<A> extends false
    ? Err<`invalid-date`, `The numeric values passed into IsSameMonth were not integers which makes them unable to be treated as a date!`, { a: A; b: B }>
    : IsInteger<B> extends false
        ? Err<`invalid-date`, `The numeric values passed into IsSameMonth were not integers which makes them unable to be treated as a date!`, { a: A; b: B }>
        : IsEqual<A, B> extends true
            ? true
            : IsEpochInMilliseconds<A> extends true
                ? IsEpochInMilliseconds<B> extends true
                    ? boolean
                    : boolean
                : IsEpochInSeconds<A> extends true
                    ? IsEpochInSeconds<B> extends true
                        ? boolean
                        : boolean
                    : boolean;

/**
 * **IsSameMonthYear**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same month and year.
 */
export type IsSameMonthYear<
    A extends DateLike,
    B extends DateLike
> = [A] extends [string]
    ? [B] extends [string]
        ? SameStringMonthYear<A, B>
        : boolean
    : [A] extends [number]
        ? number extends A
            ? boolean
            : [B] extends [number]
                ? number extends B
                    ? boolean
                    : SameNumericMonthYear<A, B>
                : boolean
        : [B] extends [number]
            ? boolean
            : EitherAreDateObject<A, B> extends true ? boolean : boolean; // Fallback to boolean for runtime checks

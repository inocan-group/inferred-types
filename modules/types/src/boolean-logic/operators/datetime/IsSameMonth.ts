import type {
    DateLike,
    Err,
    IsDayJs,
    IsEqual,
    IsInteger,
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
    IsTrue
} from "inferred-types/types";

type GetDatePart<T> = T extends `${infer D}T${string}` ? D : T;

type StripLeadingHyphen<T extends string> = T extends `-${infer R}` ? R : T;

// Extracts month from YYYY-MM-DD, -YYYY-MM, --MM-DD, YYYY-MM
type GetMonthFromDate<T extends string>
    = StripLeadingHyphen<T> extends infer Clean extends string
        ? Clean extends `${string}-${infer M}-${string}` ? M
            : Clean extends `${string}-${infer M}` ? M
                : never
        : never;

type IsWide<A, B> = string extends A
    ? true
    : string extends B
        ? true
        : number extends A
            ? true
            : number extends B
                ? true
                : false;

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

/**
 * **IsSameMonth**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same month (regardless/independently of year).
 */
export type IsSameMonth<
    A extends DateLike,
    B extends DateLike
> = IsWide<A, B> extends true
    ? boolean
    : A extends string
        ? B extends string
            ? IsEqual<GetMonthFromDate<GetDatePart<A>>, GetMonthFromDate<GetDatePart<B>>> extends true
                ? true
                : false
            : EitherAreDateObject<A, B> extends true ? boolean : Err<`invalid-date/type`>
        : A extends number
            ? B extends number
                ? number extends A
                    ? IsTrue<IsInteger<B>> extends true ? boolean : Err<`invalid-date/numeric`>
                    : number extends B
                        ? boolean
                        : IsEqual<A, B> extends true ? true : boolean
                : EitherAreDateObject<A, B> extends true ? boolean : Err<`invalid-date/type`>
            : EitherAreDateObject<A, B> extends true ? boolean : Err<`invalid-date/type`>;

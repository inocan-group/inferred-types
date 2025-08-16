import type {
    As,
    Err,
    IsDateLike,
    IsDayJs,
    IsEqual,
    IsFloat,
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
    IsNegativeNumber,
    StripAfter,
} from "inferred-types/types";

type IsWide<A,B> = string extends A
? true
: string extends B
? true
: number extends A
? true
: number extends B
? true
: false;

type BothNumeric<A,B> = A extends number
? B extends number
    ? true
    : false
: false;

type BothStrings<A,B> = A extends string
? B extends string
    ? true
    : false
: false;

type AreDateLike<A, B> = IsDateLike<A> extends true
? IsDateLike<B> extends true
    ? true
    : false
: false;

type EitherAreDateObject<A,B> = IsJsDate<A> extends true
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
: false

;

/**
 * **IsSameDay**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same calendar day.
 *
 * A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 *
 * Note:
 *
 * - literal values should be possible at _design time_ when ISO strings
 * are being used
 * - if both values are numeric we can return `false` when epoch based dates
 * aren't close enough to be on the same day.
 * - if an epoch timestamp is encountered and timestamps are identical then we
 * can return `true` at design time.
 * - if a `year-month` ISO string encountered, this utility will return a
 * a `InvalidDate` error because the date has no concept of a concrete calendar date.
 */
export type IsSameDay<
    A,
    B
> = IsWide<A,B> extends true
? boolean
: BothNumeric<A,B> extends true
    ? IsFloat<A> extends true
        ? Err<`invalid-date/float`>
    : IsFloat<B> extends true
        ? Err<`invalid-date/float`>
    : IsNegativeNumber<B> extends true
        ? Err<`invalid-date/negative`>
    : IsNegativeNumber<B> extends true
        ? Err<`invalid-date/negative`>
    : IsEqual<A,B> extends true
        ? true
    : boolean
: BothStrings<A,B> extends true
    ? AreDateLike<A,B> extends true
        ? IsEqual<A,B> extends true
            ? true
        : IsEqual<
            StripAfter<As<A, string>,"T">,
            StripAfter<As<B, string>,"T">
        > extends true
            ? true
            : false
    : Err<`invalid-date/type`>
: EitherAreDateObject<A,B> extends true
    ? boolean
: Err<`invalid-date/type`>;


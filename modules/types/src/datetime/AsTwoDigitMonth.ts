import {
    As,
    DateLike,
    Err,
    IsBetweenInclusively,
    IsInteger,
    TwoDigitMonth,
    PadStart,
    IsDateLike,
    ParsedDate,
    ParseDate,
    IsTrue,
    Unbrand
} from 'inferred-types/types';

/**
 * **AsTwoDigitMonth**`<T,[B]>`
 *
 * Converts `T` -- _so long as it's addressable date representation with month information
 * present_ -- into the two digit month format that is used in ISO Date/Datetime strings.
 *
 * - if `T` is not parsable to provide **month** information an Error will be returned
 * - when successful:
 *   - a normal string literal which _extends_ `TwoDigitMonth<'normal'>` will be returned
 *   - this means that it is guaranteed to ba a valid ISO TwoDigitMonth but it is not in
 *   it's "branded" form.
 *   - if you prefer for it to come back in it's branded form switch `B` to `true`
 */
export type AsTwoDigitMonth<
    T,
    B extends boolean = false
> = As<
T extends DateLike
? IsInteger<T> extends true
    ? IsBetweenInclusively<As<T, number>, 1, 12> extends true
        ? IsTrue<B> extends true
            ? TwoDigitMonth<
                As<PadStart<As<T, number>, "0", 2>, TwoDigitMonth>
            >
            : PadStart<As<T, number>, "0", 2>
        : IsTrue<B> extends true
            ? TwoDigitMonth<"branded">
            : TwoDigitMonth<"normal">
: IsDateLike<T> extends true
    ? ParseDate<T> extends ParsedDate
        ? IsTrue<B> extends true
            ? ParseDate<T>[1]
            : Unbrand<ParseDate<T>[1]>
    : Err<
        `invalid-date/as-two-digit-month`,
        `While trying to produce a TwoDigitMonth, T was unable to be parsed as a date!`,
        { utility: "AsTwoDigitMonth", T: T }
    >
: Err<
    `invalid-date/as-two-digit-month`,
        `While trying to produce a TwoDigitMonth, T was unable to be parsed as a date!`,
        { utility: "AsTwoDigitMonth", T: T }
>
: Err<
    "invalid-date/as-two-digit-month",
    `The type T passed into AsTwoDigitMonth<T> could not be parsed into a date!`,
    { date: T }
>,
TwoDigitMonth | Error>;

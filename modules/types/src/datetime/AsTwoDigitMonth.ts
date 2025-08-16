import type {
    As,
    DateLike,
    Err,
    IsBetweenInclusively,
    IsBranded,
    IsFloat,
    IsInteger,
    IsNegativeNumber,
    IsTrue,
    PadStart,
    ParseDate,
    ParsedDate,
    TwoDigitMonth,
    Unbrand
} from "inferred-types/types";

type IsNumericMonthIndex<T> = T extends number
    ? number extends T
        ? false
        : IsInteger<T> extends true
            ? IsBetweenInclusively<T, 1, 12>
            : false
    : false;

type ExtractMonth<
    T,
    B extends boolean = false
> = [IsNumericMonthIndex<T>] extends [true]
    ? PadStart<As<T, number>, "0", 2> extends TwoDigitMonth
        ? [IsTrue<B>] extends [true]
            ? TwoDigitMonth<PadStart<As<T, number>, "0", 2>>
            : PadStart<As<T, number>, "0", 2>
        : Err<
            "invalid-month/number",
            `The generic T in AsTwoDigitMonth<T> was a number but when an attempt was made to convert it to a TwoDigitMonth format something went wrong. This should not happen.`,
            { T: T; utility: "AsTwoDigitMonth" }
        >
    : [T] extends [DateLike]
        ? [T] extends [number]
            ? [IsNegativeNumber<T>] extends [true]
                ? Err<
                    `invalid-month/negative`,
                    `The generic T passed to AsTwoDigitMonth<T> was an integer number but it was negative!`,
                    { T: T; utility: "AsTwoDigitMonth" }
                >
                : [IsFloat<T>] extends [true]
                    ? Err<`invalid-month/float`>
                    : [IsTrue<B>] extends [true]
                        ? TwoDigitMonth<"branded">
                        : TwoDigitMonth
            : [ParseDate<T>] extends [ParsedDate]
                ? [ParseDate<T>[1]] extends [infer Month extends TwoDigitMonth]
                    ? [IsTrue<B>] extends [true]
                        ? Month
                        : Unbrand<Month>

                    : Err<
                        `invalid-month/missing`,
                        `The type passed in as T to AsTwoDigitMonth<T> was parsed as a date but the date type is a IsoYearMonth or IsoYear type and therefore has no month information!`,
                        { T: T; utility: "AsTwoDigitMonth" }
                    >
                : Err<
                    `invalid-month/parse`,
                    `While trying to produce a TwoDigitMonth, T was unable to be parsed as a date!`,
                    { utility: "AsTwoDigitMonth"; T: T }
                >

        : Err<
            "invalid-month/type",
            `The type T passed into AsTwoDigitMonth<T> was not date like!`,
            { T: T }
        >;

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
> = [number] extends [T]
    ? [IsTrue<B>] extends [true]
        ? TwoDigitMonth<"branded"> | Error
        : TwoDigitMonth | Error
    : [string] extends [T]
        ? [IsTrue<B>] extends [true]
            ? TwoDigitMonth<"branded"> | Error
            : TwoDigitMonth | Error
        : [T] extends [TwoDigitMonth]
            ? IsTrue<B> extends true
                ? [IsBranded<T>] extends [true]
                    ? T // already branded
                    : TwoDigitMonth<T> // brand
                : Unbrand<T>
            : As<
                ExtractMonth<Unbrand<T>, B>,
    TwoDigitMonth | Error
            >;

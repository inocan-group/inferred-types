import type {
    As,
    Err,
    FourDigitYear,
    IsAny,
    IsBranded,
    IsFourDigitYear,
    IsGreaterThan,
    IsInteger,
    IsNegativeNumber,
    IsTrue,
    PadStart,
    Unbrand
} from "inferred-types/types";

type Convert<
    T,
    B extends boolean = false
> = T extends string
    ? IsBranded<T> extends true
        ? Convert<Unbrand<T>, B>
        : IsFourDigitYear<T> extends true
            ? IsTrue<B> extends true
                ? FourDigitYear<As<T, `${number}`>>
                : T
            : T extends `${number}`
                ? IsFourDigitYear<PadStart<T, "0", 4>> extends true
                    ? IsTrue<B> extends true
                        ? FourDigitYear<As<PadStart<T, "0", 4>, `${number}`>>
                        : PadStart<T, "0", 4>
                    : Err<"year-invalid/type">
                : Err<"year-invalid/type">
    : T extends number
        ? number extends T
            ? IsTrue<B> extends true
                ? FourDigitYear<"branded"> | Error
                : FourDigitYear | Error
            : IsInteger<T> extends false
                ? Err<
                    `year-invalid/float`,
                    `The generic passed into AsFourDigitYear<T> was a number but not an integer!`,
                    { T: T }
                >
                : IsGreaterThan<T, 9999> extends true
                    ? Err<
                        `year-invalid/too-large`,
                        `The generic passed into AsFourDigitYear<T> was an integer number but it was larger than 9999 so it will not fit into the ISO FourDigitYear format!`,
                        { T: T }
                    >
                    : IsNegativeNumber<T> extends true
                        ? Err<
                            `year-invalid/negative`,
                            `The generic passed into AsFourDigitYear<T> was a NEGATIVE number. This is not allowed!`,
                            { T: T }
                        >
                        : IsTrue<B> extends true
                            ? FourDigitYear<As<PadStart<T, "0", 4>, `${number}`>>
                            : As<PadStart<T, "0", 4>, FourDigitYear>
        : Err<
            `year-invalid/wrong-type`,
            `The type passed in as T to AsFourDigitYear<T> was an invalid type! T must be a number or a string literal that can be converted into a number`,
            { T: T }
        >;

/**
 * **AsFourDigitYear**`<T,[B]>`
 *
 * A type conversion utility which tries to convert `T` into a valid `FourDigitYear` type.
 *
 * - by default the conversion is done but the type returned is _not_ a branded type
 * - to switch this behavior then pass in `true` to the generic `B`
 *
 * If there is no way to convert `T` to a `FourDigitYear` then an Error will be returned.
 */
export type AsFourDigitYear<
    T,
    B extends boolean = false
> = [IsAny<T>] extends [true]
    ? IsTrue<B> extends true
        ? FourDigitYear<"branded"> | Error
        : FourDigitYear | Error

    : As<
        Convert<T, B>,
        IsTrue<B> extends true
            ? FourDigitYear<"branded"> | Error
            : FourDigitYear | Error
    >;

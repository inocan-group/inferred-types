import type {
    As,
    Err,
    FourDigitYear,
    IsAny,
    IsBranded,
    IsTrue,
    PadStart,
    Unbrand
} from "inferred-types/types";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type IsDigits<T extends string> = T extends ""
    ? false
    : T extends `${Digit}${infer Rest}`
        ? Rest extends ""
            ? true
            : IsDigits<Rest>
        : false;

type IsFourDigits<T extends string> = T extends `${Digit}${Digit}${Digit}${Digit}`
    ? true
    : false;

type BrandYear<T extends string, B extends boolean> = IsTrue<B> extends true
    ? FourDigitYear<As<T, `${number}`>>
    : T;

type ConvertNumericString<
    T extends string,
    B extends boolean,
    TNumberInput extends boolean
> = T extends `-${string}`
    ? Err<
        `year-invalid/negative`,
        `The generic passed into AsFourDigitYear<T> was a NEGATIVE number. This is not allowed!`,
        { T: T }
    >
    : T extends `${string}.${string}`
        ? TNumberInput extends true
            ? Err<
                `year-invalid/float`,
                `The generic passed into AsFourDigitYear<T> was a number but not an integer!`,
                { T: T }
            >
            : Err<"year-invalid/type">
        : IsDigits<T> extends true
            ? PadStart<T, "0", 4> extends infer Padded extends string
                ? IsFourDigits<Padded> extends true
                    ? BrandYear<Padded, B>
                    : TNumberInput extends true
                        ? Err<
                            `year-invalid/too-large`,
                            `The generic passed into AsFourDigitYear<T> was an integer number but it was larger than 9999 so it will not fit into the ISO FourDigitYear format!`,
                            { T: T }
                        >
                        : Err<"year-invalid/type">
                : Err<"year-invalid/type">
            : Err<"year-invalid/type">;

type Convert<
    T,
    B extends boolean = false
> = T extends string
    ? IsBranded<T> extends true
        ? Convert<Unbrand<T>, B>
        : ConvertNumericString<T, B, false>
    : T extends number
        ? number extends T
            ? IsTrue<B> extends true
                ? FourDigitYear<"branded"> | Error
                : FourDigitYear | Error
            : ConvertNumericString<`${T}`, B, true>
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

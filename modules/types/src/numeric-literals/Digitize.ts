import type {
    Chars,
    Digit,
    IsEqual,
    NumberLike,
    NumericChar,
    NumericSign,
    Or,
    ToNumericArray,
} from "inferred-types/types";

type Pos<T extends NumberLike, N extends `${number}`> = [
    "+",
    T extends string ? Chars<N> : ToNumericArray<Chars<N>>,
];

type Neg<T extends NumberLike, N extends `${number}`> = [
    "-",
    T extends string ? Chars<N> : ToNumericArray<Chars<N>>,
];

/**
 * **Digitize**`<T>`
 *
 * Takes a literal value of a number -- either a numeric literal or a string literal
 * is accepted -- and converts into a tuple: `[ NumericSign, Digits[] ]`
 * ```ts
 * // ["+", readonly [1,2,3] ]
 * type N = Digitize<123>;
 * // ["-", readonly ["1","2","3"] ]
 * type S = Digitize<"-123">;
 * ```
 */
export type Digitize<
    T extends NumberLike,
> = Or<[IsEqual<T, number>, IsEqual<T, `${number}`>]> extends true
    ? [ sign: NumericSign, digits: T extends string ? NumericChar[] : Digit[] ]
    : `${T}` extends `-${infer Rest extends `${number}`}`
        ? Neg<T, Rest>
        : `${T}` extends `${"+" | ""}${infer Rest extends `${number}`}`
            ? Pos<T, Rest>
            : never;

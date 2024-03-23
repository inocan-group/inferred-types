import { 
    IfNotLiteral, 
    IsNegativeNumber, 
    NumericChar, 
    ToString, 
    Abs, 
    Digital, 
    DigitalLiteral, 
    AfterFirst,
    AsNumber,
    First
} from "src/types/index";

type HasMoreThanOneDigit<T extends `${number}`> = T extends `${NumericChar}${NumericChar}${string}`
  ? true
  : false;

type MostSignificantDigit<T extends `${number}`> = HasMoreThanOneDigit<T> extends true
  ? T extends `${infer Digit}${NumericChar}${string}`
    ? Digit & NumericChar
    : never
  : T & NumericChar;

type RemainingDigits<T extends `${number}`> = T extends `${NumericChar}${number}`
  ? T extends `${NumericChar}${infer Rest}`
    ? Rest
    : never
  : T;

type Sign<T extends `${number}` | number> = IsNegativeNumber<T> extends true
  ? "-" 
  : "+";

type _Digitize<
  TNumber extends `${number}`,
  TResults extends readonly NumericChar[] = []
> = HasMoreThanOneDigit<TNumber> extends true
  ? _Digitize<
      RemainingDigits<TNumber>,
      [...TResults, MostSignificantDigit<TNumber>]
    >
  : [...TResults, MostSignificantDigit<TNumber>];

type AsNumericElements<
  TIn extends readonly `${number}`[],
  TOut extends readonly number[] = []
> = [] extends TIn
? TOut
: AsNumericElements<
    AfterFirst<TIn>,
    [...TOut, AsNumber<First<TIn>>]
  >;

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
  T extends `${number}` | number
> = IfNotLiteral<
  T,
  never,
  T extends `${number}`
    ? [ 
      Sign<T>, 
      Readonly<_Digitize<ToString<Abs<T>>>> 
    ] & DigitalLiteral
    : T extends number
      ? [ 
          Sign<T>,
          _Digitize<ToString<Abs<T>>> extends readonly `${number}`[]
          ? Readonly<AsNumericElements<_Digitize<ToString<Abs<T>>>>>
          : never
        ] & Digital
      : never
>;

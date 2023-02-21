import { IfLiteral } from "src/types/boolean-logic";
import { ErrorCondition } from "src/types/errors";
import { NumericChar } from "src/types/string-literals";
import { ToString } from "src/types/type-conversion";
import { ToNumericArray } from "src/types/numeric-literals";

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

type _Digitize<
  TNumber extends `${number}`,
  TResults extends readonly NumericChar[] = []
> = HasMoreThanOneDigit<TNumber> extends true
  ? _Digitize<
      RemainingDigits<TNumber>,
      [...TResults, MostSignificantDigit<TNumber>]
    >
  : [...TResults, MostSignificantDigit<TNumber>];

/**
 * **Digitize**`<T>`
 * 
 * Takes a literal value of a number -- either a numeric literal or a string literal
 * is accepted -- and converts into an array of digits.
 * ```ts
 * // readonly [1,2,3]
 * type N = Digitize<123>;
 * // readonly ["1","2","3"]
 * type S = Digitize<"123">;
 * ```
 * 
 * - if a non-literal value is passed in an `ErrorCondition<"invalid-non-literal">`
 * will be returned as type.
 */
export type Digitize<T extends `${number}` | number> = IfLiteral<
  T,
  T extends number
    ? ToNumericArray<_Digitize<ToString<T>>>
    : T extends `${number}` ? Readonly<_Digitize<T>> : never,
  ErrorCondition<"invalid-non-literal", "Digitize<T> requires that T be a literal type but the value passed in was a wide number type", "Digitize<T>">
>;


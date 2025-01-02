import type {
  EveryLength,
  IsWideString,
  Split,
} from "inferred-types/types";

/** the shae for an American Express long number */
export type AmericanExpress = `${number} ${number} ${number}`;

/** the shape for a VISA/Mastercard long number */
export type VisaMastercard = `${number} ${number} ${number} ${number}`;

/**
 * Represents the string literal type for either a Mastercard/VISA
 * format or an American Express card.
 *
 * **Related:**
 * - `IsVisaMastercard`, `IsAmericanExpress`, `IsCreditCard`
 * - `isVisaMastercard()`, `isAmericanExpress()`, `isCreditCard()`
 */
export type CreditCard = VisaMastercard | AmericanExpress;

/**
 * **IsVisaMastercard**`<T>`
 *
 * Boolean operator determining if `T` is a long number for
 * a VISA/Mastercard.
 */
export type IsVisaMastercard<T> = T extends string
  ? IsWideString<T> extends true
    ? boolean
    : Split<T, " "> extends [`${number}`, `${number}`, `${number}`, `${number}`]
      ? EveryLength<Split<T, " ">, 4> extends true
        ? true
        : false
      : false
  : false;

/**
 * **IsAmericanExpress**`<T>`
 *
 * Boolean operator determining if `T` is a long number for
 * a VISA/Mastercard.
 */
export type IsAmericanExpress<T> = T extends string
  ? IsWideString<T> extends true
    ? boolean
    : Split<T, " "> extends [`${number}`, `${number}`, `${number}`]
      ? Split<T, " ">[0]["length"] extends 4
        ? Split<T, " ">[1]["length"] extends 6
          ? Split<T, " ">[2]["length"] extends 5
            ? true
            : false
          : false
        : false
      : false
  : false;

/**
 * **IsCreditCard**`<T>`
 *
 * Boolean operator determining if `T` is a "Credit Card" _long
 * number_. This tests for the American Express and VISA/Mastercard
 * numeric sequences.
 */
export type IsCreditCard<T> = IsVisaMastercard<T> extends true
  ? true
  : IsAmericanExpress<T> extends true
    ? true
    : false;

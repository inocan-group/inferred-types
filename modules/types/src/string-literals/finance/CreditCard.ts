import type {
  EveryLength,
  IsWideString,
  Split,
} from "inferred-types/types";

/** the shae for an American Express long number */
export type AmericanExpress = `${"34" | "37"}${number} ${number} ${number}`;

/** the shape of Visa long numbers */
export type Visa = `4${number} ${number} ${number} ${number}`;

export type Mastercard = `${"51" | "55"}${number} ${number} ${number} ${number}`
  | `2${"2" | "3" | "4" | "5" | "6" | "7"}${number} ${number} ${number} ${number}`;

export type Discover = `${"6011" | "6221"} ${number} ${number} ${number}` | `64${"4" | "5" | "6" | "7" | "8" | "9"}${number} ${number} ${number} ${number}` | `65${number} ${number} ${number} ${number}`;

export type Jcb = `35${number} ${number} ${number} ${number}`
  | `2131 ${number} ${number} ${number}`
  | `1800 ${number} ${number} ${number}`;

/**
 * The shape of a DinersClub card (4d 6d 4d)
 */
export type DinersClub = `30${"0" | "1" | "2" | "3" | "4" | "5"} ${number} ${number}`
  | `${"36" | "38"}${number} ${number} ${number}`;

export type Maestro = `5018${string}`
  | `5020${string}`
  | `5038${string}`
  | `6304${string}`;

export type Solo = `6334${string}` | `6767${string}`;

/** the shape for a VISA/Mastercard long number */
export type VisaMastercard = Visa | Mastercard;

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

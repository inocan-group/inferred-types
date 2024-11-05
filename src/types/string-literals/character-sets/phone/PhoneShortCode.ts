import {
  IsGreaterThan,
  IsStringLiteral,
  NumericChar,
  Throw
} from "inferred-types/dist/types/index";

/**
 * **PhoneShortCode**`<[T]>`
 *
 * A [phone short code](https://en.wikipedia.org/wiki/Short_code) is a short numeric
 * phone number typically used for SMS/MMS purposes but can be call based too.
 *
 * There are regional variances but typically are always _less_ digits than a regional
 * phone number of 7 digits.
 *
 * This utility -- when used without a generic `T` -- will just give a basic shape
 * for the short code but not really validate it.
 *
 * If you want validation, pass it the value you're testing in as `T`. If `T` is a
 * valid short code then it will be proxied through "as is" but if it is not, it
 * will be converted to an `ErrorCondition<"invalid-short-code">`
 */
export type PhoneShortCode<
  T extends string | null = null
> = T extends null
? `${NumericChar}${number}${NumericChar}`
: T extends string
  ? IsStringLiteral<T> extends true
    ? T extends `${number}`
      ? IsGreaterThan<T["length"], 6> extends true
        ? Throw<"invalid-short-code", `Short codes must be less than 7 digits [${T["length"]}]`>
        : T
      : Throw<"invalid-short-code", `Short codes may vary from region to region but they must always contain only numbers: ${T}!`>
    : string
: never;


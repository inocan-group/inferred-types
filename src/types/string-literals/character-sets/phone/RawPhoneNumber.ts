import {
  And,
  Contains,
  ErrorCondition,
  If,
  IsEqual,
  IsGreaterThan,
  IsLessThan,
  IsStringLiteral,
  NumericChar,
  OnPass,
  Optional,
  Or,
  StartsWith,
  StripChars,
  StrLen,
  Unset
} from "inferred-types/dist/types/index";


type _RightLength<T extends string > = If<
  StartsWith<T, "+">,
  If<
    Contains<T, "1-">, // using 1- for country code nomenclature
    If<StrLen<T> extends 16 ? true : false, T, ErrorCondition<"invalid-raw-phone-number", `Wrong number of characters for international number: ${T}`>>,
    If<StrLen<T> extends 15 ? true : false, T, ErrorCondition<"invalid-raw-phone-number", `Wrong number of characters for international number: ${T}`>>
  >,
  If<
    StartsWith<T,"00">,
    If<
      Contains<T, "1-">, // using 1- for country code nomenclature
      If<StrLen<T> extends 15 ? true : false, T, ErrorCondition<"invalid-raw-phone-number", `Wrong number of characters for international number: ${T}`>>,
      If<StrLen<T> extends 14 ? true : false, T, ErrorCondition<"invalid-raw-phone-number", `Wrong number of characters for international number: ${T}`>>
    >,
    If<
      Or<[ IsEqual<StrLen<T>, 10>, IsEqual<StrLen<T>, 12> ]>,
      T,
      If<
        And<[ IsGreaterThan<StrLen<T>, 2>, IsLessThan<StrLen<T>, 8>]>,
        T,
        ErrorCondition<"invalid-raw-phone-number">
      >
    >
  >
>;


type _RightChars<T extends string> = StripChars<T, NumericChar | "+" | "-"> extends ""
? T
: ErrorCondition<
    "invalid-raw-phone-number",
    `The only valid characters in a raw phone number is numeric characters with the rare exception of a "+" or "-" when used in the right manner`
  >;

/**
 * **RawPhoneNumber**`<[T]>`
 *
 * This is the most compact form of phone number storage as it has no delimiters
 * but still can contain a number representing an international,
 * country or regional phone number and even a `PhoneShortCode`.
 *
 * **Generic Use**
 *
 * - without using the generic, you'll get a very basic shape that can be used as in input
 * type but it will by no means ensure this _is_ a RawPhone number
 * - to get real validation that a type is a `RawPhoneNumber` pass it in as `T`
 * - valid values are:
 *    - numeric only characters with the exception of:
 *      - possible start of `+`
 *      - possible inclusion of `1-${number}` in country code area
 *    - length of 3-7, 10, 12 digits
 *    - 14 digits if it leads with `00` or `+`
 */
export type RawPhoneNumber<
  T extends string | Unset = Unset
> = T extends Unset
? `${Optional<"+">}${number}${NumericChar}${NumericChar}`
: T extends string
? IsStringLiteral<T> extends true
  ? OnPass<
      [
        _RightChars<T>,
        _RightLength<T>,
      ],
      T
    >
  : T | ErrorCondition<"invalid-raw-phone-number">
: never; //

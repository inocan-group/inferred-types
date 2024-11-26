import {
  LocalPhoneNumber,
  OnPass,
  PhoneNumberDelimiter,
  InternationalPhoneNumber,
  CountryPhoneNumber,
  IsStringLiteral,
  IsNumericLiteral,
  As,
  ErrorCondition
} from "inferred-types/types";

// /** T or ErrorCondition */
// type _AppropriateNumerics<T extends string> =
// HasPhoneCountryCode<T> extends true
// ? RetainChars<RemovePhoneCountryCode<T>, NumericChar> extends readonly string[]
//   ? IsLessThan<
//     RetainChars<RemovePhoneCountryCode<T>, NumericChar>["length"],
//     10
//   > extends true
//     ? Throw<"invalid-phone-number", `Invalid international phone number; international numbers require at least 10 numeric digits beyond the country code: ${T}`, `PhoneNumber`>
//     : T
// : HasCharacters<Trim<T>, PhoneNumberDelimiter> extends true
//     ? Not<Or<[
//         Extends<StrLen<RetainChars<RemovePhoneCountryCode<T>, NumericChar>>, 10>,
//         Extends<StrLen<RetainChars<RemovePhoneCountryCode<T>, NumericChar>>, 7>
//       ]>> extends true
//       ? Throw<"invalid-phone-number", `Phone numbers which have " ", "-", or "." delimiters can not be short codes and therefore must have a length of 7 or 10 digits not ${RetainChars<RemovePhoneCountryCode<T>, NumericChar>["length"]}!`>
//       : T
// : Trim<T> extends ""
//   ? Throw<"invalid-phone-number", "No numeric characters found!">
//   : never
// : T;

// /** T or ErrorCondition */
// type _ValidChars<T extends string> = StripChars<
//   T,
//   IsGreaterThan<
//     StrLen<T>,
//     6
//   > extends true
//     ? NumericChar | "(" | ")" | Whitespace | "-" | "."
//     : NumericChar
// > extends ""
//   ? true
//   : Throw<
//       "invalid-phone-number",
//       IsGreaterThan<
//         StrLen<T>,
//         6
//       > extends true
//         ? `The number '${Trim<T>}' is invalid because -- excluding any country code references -- the only valid characters in a phone number are numeric characters and '-', '.', and parenthesis but other characters were found: [ ${StripChars<Trim<T>, NumericChar | "-" | ".">} ]`
//         : `The phone number passed in has less than 7 numeric digits which means that it is either a short code or this is an invalid number ... short codes can only accept numeric digits though and we found more than that: ${Trim<T>}`
//     >;

// type _InvalidCountryCode<T extends string> = And<[
//           // user specified a country code
//           HasPhoneCountryCode<T, false>,
//           // but it's not a valid code
//           Not<HasPhoneCountryCode<T, true>>,
//         ]> extends true
//         ? Throw<"invalid-phone-number", `This looked like an international number but the country code ${GetPhoneCountryCode<T>} is not a valid country code!`>
//         : true;


type Process<
  T extends string,
  _TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = OnPass<
      [
        // _ValidChars<RemovePhoneCountryCode<T>>,
        // _InvalidCountryCode<T>,
        // _AppropriateNumerics<T>
      ],
      T
    >;



/**
 * **PhoneNumber**`<[T]>`
 *
 * Without use of the generic `T`, provides a basic shape for phone
 * numbers which should keep people on good behavior when
 * accepting phone numbers.
 *
 * When passing a string into `T`, this utility will do a lot more
 * validity checking on the value.
 *
 * - Only valid characters (numeric, whitespace, `+`, `-`, `.`, and parenthesis)
 * - all _leading_ and _trailing_ whitespace removed for remaining comparisons
 * - at least 7 numeric characters
 *    - 8 if `+` character used as leading character (after whitespace)
 *    - 10 if `00` are leading characters
 * - leading character (after whitespace) must be numeric, `(` or `+`
 */
export type PhoneNumber<
  T extends number | string | null = null,
  TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = T extends null
? LocalPhoneNumber<TDelimiter>
| CountryPhoneNumber<TDelimiter>
| InternationalPhoneNumber<TDelimiter>
: IsStringLiteral<T> extends true
    ? Process<As<T, string>,TDelimiter>
    : IsNumericLiteral<T> extends true
      ? Process<`${As<T, number>}`, TDelimiter>
      : T extends string
      ? string | ErrorCondition<"invalid-phone-number">
      : T extends number
      ? number | ErrorCondition<"invalid-phone-number">
      : never;

import { PHONE_COUNTRY_CODES, PHONE_FORMAT } from "src/constants/index"
import {
  AsString,
  FirstOfEach,
  IsLessThan,
  IsStringLiteral,
  Length,
  NumericChar,
  RetainChars,
  StartsWith,
  StripChars,
  Trim,
  TrimLeft,
  TupleToUnion,
  Whitespace,
  Mutable,
  HasPhoneCountryCode,
  Optional,
  RetainUntil,
  Not,
  And,
  Throw,
  IsGreaterThan,
  HasCharacters,
  Extends,
  Or
} from "src/types/index"

/**
 * delimiter characters commonly used to separate digits in phone numbers
 */
export type PhoneNumberDelimiter = " " | "-" | ".";

/**
 * **PhoneFormat**
 *
 * A union type of _formats_ used for telephone numbers
 */
export type PhoneFormat = TupleToUnion<
  typeof PHONE_FORMAT
>;

/**
 * **PhoneCountryCode**
 *
 * The official list of _phone_ country codes
 *
 * **Related:** `DialCountryCode`
 */
export type PhoneCountryCode = FirstOfEach<
  Mutable<typeof PHONE_COUNTRY_CODES>
>;

/**
 * **DialCountryCode**
 *
 * A simplified representation of `PhoneCountryCode` so as to not make other
 * phone patterns too complex.
 */
export type DialCountryCode = `${"+" | "00"}${ `1-${number}` | `${Exclude<NumericChar, "0">}`}${Optional<`${number}`>}`;

/**
 * **LocalPhoneNumber**`<[TDelimiter]>`
 *
 * Provides a shape for phone numbers local a region of country that do
 * not have a _country code_ designation nor what is referred to as the
 * "area code" in the USA.
 *
 * **Related:** `CountryPhoneNumber`, `InternationalPhoneNumber`, `PhoneNumber`
 */
export type LocalPhoneNumber<
TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = `${NumericChar}${number}${TDelimiter}${number}`;

/**
 * **PhoneAreaCode**
 */
export type PhoneAreaCode = `(${number})` | `${NumericChar}${number}`;


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
      ? IsGreaterThan<Length<T>, 6> extends true
        ? Throw<"invalid-short-code", `Short codes must be less than 7 digits [${Length<T>}]`>
        : T
      : Throw<"invalid-short-code", `Short codes may vary from region to region but they must always contain only numbers: ${T}!`>
    : string
: never;

/**
 * **CountryPhoneNumber**`<[TDelimiter]>`
 *
 * Provides a shape phone number meant for use within a country. It includes
 * the local number plus what would be referred to as the "area code" in the
 * USA.
 *
 * **Related:** `InternationalPhoneNumber`, `LocalPhoneNumber`, `PhoneNumber`
 */
export type CountryPhoneNumber<
  TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = `${PhoneAreaCode}${TDelimiter}${LocalPhoneNumber<TDelimiter>}`

/**
 * **InternationalPhoneNumber**`<[TDelimiter]>`
 *
 * A phone number which explicitly leads by expressing the _country_ that the number belongs to.
 *
 * - uses `+` or `00` prefix to mark as a country code
 *
 * **Related:** `CountryPhoneNumber`, `LocalPhoneNumber`, `PhoneNumber`
 */
export type InternationalPhoneNumber<
  TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = `${DialCountryCode}${TDelimiter}${CountryPhoneNumber<TDelimiter>}`;


type _NumChars<
  T extends string
> = Length<RetainChars<T, NumericChar>>;

type _ExpectedNum<T extends string> = StartsWith<TrimLeft<T>, "+"> extends true
? 8
: StartsWith<TrimLeft<T>, "00"> extends true
? 10
: 7;

type _StartsWith<T extends string> = StartsWith<
  TrimLeft<T>,
  NumericChar
> extends true
  ? true
  : StartsWith<TrimLeft<T>, "+"> extends true
  ? true
  : StartsWith<TrimLeft<T>, "00"> extends true
  ? true
  : false;

/** T or ErrorCondition */
type _AppropriateNumerics<T extends string> =
HasPhoneCountryCode<T> extends true
? IsLessThan<
    Length<RetainChars<RemovePhoneCountryCode<T>, NumericChar>>,
    10
  > extends true
    ? Throw<"invalid-phone-number", `Invalid international phone number; international numbers require at least 10 numeric digits beyond the country code: ${T}`, `PhoneNumber`>
    : T
: HasCharacters<Trim<T>, PhoneNumberDelimiter> extends true
    ? Not<Or<[
        Extends<Length<RetainChars<RemovePhoneCountryCode<T>, NumericChar>>, 10>,
        Extends<Length<RetainChars<RemovePhoneCountryCode<T>, NumericChar>>, 7>
      ]>> extends true
      ? Throw<"invalid-phone-number", `Phone numbers which have " ", "-", or "." delimiters can not be short codes and therefore must have a length of 7 or 10 digits not ${Length<RetainChars<RemovePhoneCountryCode<T>, NumericChar>>}!`>
      : T
: Trim<T> extends ""
    ? Throw<"invalid-phone-number", "No numeric characters found!">
: T;

type _ValidChars<T extends string> = StripChars<
  T,
  IsGreaterThan<
    Length<T>,
    6
  > extends true
    ? NumericChar | "(" | ")" | Whitespace | "-" | "."
    : NumericChar
> extends ""
  ? true
  : Throw<
      "invalid-phone-number",
      IsGreaterThan<
        Length<T>,
        6
      > extends true
        ? `Excluding any country code references, the only valid characters in a phone number are numeric characters and "-",".", and parenthesis but other characters were found: ${Trim<T>}`
        : `The phone number passed in has less than 7 numeric digits which means that it is either a short code or this is an invalid number ... short codes can only accept numeric digits though and we found more than that: ${Trim<T>}`
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
  T extends string | null = null,
  TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = T extends null
? LocalPhoneNumber<TDelimiter>
  | CountryPhoneNumber<TDelimiter>
  | InternationalPhoneNumber<TDelimiter>
: T extends string
  ? IsStringLiteral<T> extends true
    ? _ValidChars<RemovePhoneCountryCode<T>> extends true
      ? And<[
          // user specified a country code
          HasPhoneCountryCode<T, false>,
          // but it's not a valid code
          Not<HasPhoneCountryCode<T, true>>,
        ]> extends true
        ? Throw<"invalid-phone-number", `This looked like an international number but the country code ${GetPhoneCountryCode<T>} is not a valid country code!`>
        : _AppropriateNumerics<T>
: never
: never
: never;


/**
 * GetPhoneCountryCode`<T>`
 *
 * Attempts to find a country code signature in a phone number.
 *
 * - it returns the country code without the leading `+` or `00` prefix
 * - if not found it returns an empty string (`""`)
 * - if `T` is a _wide_ string string then this will return `string` back
 */
export type GetPhoneCountryCode<T> = T extends string
? [IsStringLiteral<T>] extends [true]
    ? StartsWith<Trim<T>, "+" | "00"> extends true
      ? [Trim<T>] extends [`${"+" | "00"}${infer CC}${PhoneNumberDelimiter}${string}`]
        ? RetainUntil<CC, " ">
        : ""
      : ""
    : string
: never;

/**
 * **RemoveCountryCode**`<T>`
 *
 * Removes the country code -- where present -- to reveal
 * just a country-based number.
 */
export type RemovePhoneCountryCode<T> = T extends string
? IsStringLiteral<T> extends true
  ? GetPhoneCountryCode<Trim<T>> extends ""
    ? T
    : Trim<T> extends `+${GetPhoneCountryCode<Trim<T>>}${PhoneNumberDelimiter}${infer Rest}`
      ? Rest
      : T
: string
: never;

export type PhoneNumberType = "international" | "country" | "regional" | "short-code";

/**
 * **GetPhoneNumberType**`<T>`
 *
 * Indicates whether the phone number is "international", "country", or "regional"
 * based on the shape and number of digits
 */
export type GetPhoneNumberType<T> = T extends string
? IsStringLiteral<T> extends true
  ? HasPhoneCountryCode<T,false> extends true
    ? "international"
    : IsLessThan<
        Length<
          RetainChars<Trim<AsString<T>>,
          NumericChar
        >>,
        8
      > extends true
        ? Length<
            RetainChars<Trim<AsString<T>>,
            NumericChar
          >> extends 7
          ? "regional"
          : "short-code"
        : "country"
: string
: never;


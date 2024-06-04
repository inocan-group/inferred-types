import { PHONE_COUNTRY_CODES, PHONE_FORMAT } from "src/constants/index"
import {
  As,
  AsString,
  FirstOfEach,
  IsLessThan,
  IsStringLiteral,
  Length,
  NumericChar,
  Optional,
  OptionalSpace,
  RetainChars,
  RetainWhile,
  StartsWith,
  StripChars,
  StripLeading,
  StripWhile,
  Trim,
  TrimLeft,
  TupleToUnion,
  Whitespace,
  Mutable
} from "src/types/index"


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

type OneDash = `1-` | "";

/**
 * **DialCountryCode**
 *
 * A fairly simple type for how people dial country codes
 * when dialing long distance.
 *
 * **Related:** `PhoneCountryCode`, `PhoneNumber`
 */
export type DialCountryCode = `+${OneDash}${NumericChar}${number}${" " | "-" | ""}` | `00${OneDash}${NumericChar}${number}${" " | "-" | ""} `;


export type DialAreaCode = `(${number})${OptionalSpace}` | `${number}${Optional<" " | "-" | ".">}`


/**
 * **DialNoAreaCode**
 *
 * Provides a shape for phone numbers with an area code but _not_
 * a country code.
 *
 * **Related:** `DialWIthAreaCode`, `DialCountryCode`, `PhoneNumber`
 */
export type DialNoAreaCode = `${NumericChar}${number}${" "|"-"|"."}${number}`;

/**
 * **DialWithAreaCode**
 *
 * Provides a shape for phone numbers with an area code but _not_
 * a country code.
 *
 * **Related:** `PhoneNumber`, `DialCountryCode`, `PhoneCountryCodes`
 */
export type DialWithAreaCode = `${DialAreaCode}${DialNoAreaCode}`;

export type DialWithCountryCode = `${DialCountryCode}${DialWithAreaCode}`

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

type _ValidChars<T extends string> = StripChars<
  T,
  NumericChar | "(" | ")" | Whitespace | "-" | "."
> extends ""
  ? true
  : false;

/**
 * **PhoneNumber**`<[T]>`
 *
 * Without use of the generic `T`, provides a basic shape for phone
 * numbers which should keep people on good behavior when
 * accepting phone numbers.
 *
 * When passing a string into `T`, this utility will do more
 * comprehensive checking on the validity of the type being a
 * valid phone number (which corresponds to `isPhoneNumber()`):
 *
 * - Only valid characters (numeric, whitespace, `+`, `-`, `.`, and parenthesis)
 * - at least 7 numeric characters
 *    - 8 if `+` character used as leading character (after whitespace)
 *    - 10 if `00` are leading characters
 * - leading character (after whitespace) must be numeric, `(` or `+`
 *
 * **Note:** use _without_ the generic can at times be more limiting
 * and sometimes less; it really comes down to type performance concerns
 * intersected with fidelity.
 */
export type PhoneNumber<
  T extends string | null = null
> = T extends null
? `${DialWithCountryCode | DialWithAreaCode | DialNoAreaCode}`
: IsStringLiteral<T> extends true
  ? IsLessThan<_NumChars<AsString<T>>, _ExpectedNum<AsString<T>>> extends true
    ? never
    : _StartsWith<AsString<T>> extends true
      ? _ValidChars<AsString<T>> extends true
        ? T
        : never
      : never
  : never;

type _CountryCode<T extends string> = T extends `+${string}`
? RetainWhile<StripLeading<T,"+">,NumericChar> extends string
  ? Trim<RetainWhile<StripLeading<T,"+">,NumericChar>>
  : never
: T extends `00${string}`
? RetainWhile<StripLeading<T,"00">,NumericChar> extends string
  ? Trim<RetainWhile<StripLeading<T,"00">,NumericChar>>
  : never
: "";

type _RemoveCountryCode<T extends string> =
T extends `+${string}`
? StripWhile<StripLeading<T,"+">,NumericChar> extends string
  ? Trim<StripWhile<StripLeading<T,"+">,NumericChar>>
  : never
: T extends `00${string}`
  ? StripWhile<StripLeading<T,"00">,NumericChar> extends string
    ? Trim<StripWhile<StripLeading<T,"00">,NumericChar>>
    : never
: Trim<T>;

/**
 * GetPhoneCountryCode`<T>`
 *
 * Attempts to find a country code in `T` and returns it
 * where it finds it, otherwise returns `""` if a wide string
 * or a literal string without a country code is passed in.
 *
 * All non-string values return _never_.
 */
export type GetPhoneCountryCode<T> = T extends string
? IsStringLiteral<T> extends true
    ? As<_CountryCode<Trim<AsString<T>>>, "" | `${OneDash}${number}`>
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
  ? As<_RemoveCountryCode<Trim<T>>, DialAreaCode | DialNoAreaCode>
: string
: never;
